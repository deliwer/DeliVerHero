import { type Hero, type InsertHero, type TradeIn, type InsertTradeIn, type ImpactStats, type Referral, type UpdateHero, type DubaiChallenge, type DubaiReward, type Sponsor, type InsertSponsor, type SponsorshipTier, type SponsoredMission, type InsertSponsoredMission, type MissionSponsorship, type InsertMissionSponsorship, type User, type InsertUser, type Contact, type InsertContact, type Quote, type InsertQuote, type CorporateLead, type InsertCorporateLead, type EmailCampaign, type InsertEmailCampaign, type EmailSubscriber, type InsertEmailSubscriber } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // Contact management
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;

  // Quote management
  createQuote(quote: InsertQuote): Promise<Quote>;
  getQuote(id: string): Promise<Quote | undefined>;
  getQuotesByUser(userId: string): Promise<Quote[]>;
  updateQuoteStatus(id: string, status: string): Promise<Quote | undefined>;

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

  // Sponsor operations
  createSponsor(sponsor: InsertSponsor): Promise<Sponsor>;
  getSponsor(id: string): Promise<Sponsor | undefined>;
  getSponsorByEmail(email: string): Promise<Sponsor | undefined>;
  getAllSponsors(): Promise<Sponsor[]>;
  verifySponsor(id: string): Promise<Sponsor | undefined>;

  // Sponsorship tier operations
  getSponsorshipTiers(): Promise<SponsorshipTier[]>;
  getSponsorshipTier(id: string): Promise<SponsorshipTier | undefined>;

  // Sponsored mission operations
  createSponsoredMission(mission: InsertSponsoredMission): Promise<SponsoredMission>;
  getSponsoredMissions(): Promise<SponsoredMission[]>;
  getSponsoredMission(id: string): Promise<SponsoredMission | undefined>;
  updateSponsoredMissionFunding(id: string, amount: number): Promise<SponsoredMission | undefined>;
  joinSponsoredMission(missionId: string, heroId: string): Promise<boolean>;

  // Mission sponsorship operations
  createMissionSponsorship(sponsorship: InsertMissionSponsorship): Promise<MissionSponsorship>;
  getMissionSponsorships(missionId: string): Promise<MissionSponsorship[]>;
  confirmMissionSponsorship(id: string): Promise<MissionSponsorship | undefined>;

  // Corporate Lead Management
  createCorporateLead(lead: InsertCorporateLead): Promise<CorporateLead>;
  getCorporateLeads(filters?: { status?: string; industry?: string; priority?: string }): Promise<CorporateLead[]>;
  getCorporateLead(id: string): Promise<CorporateLead | undefined>;
  updateCorporateLead(id: string, updates: Partial<CorporateLead>): Promise<CorporateLead | undefined>;

  // Email Campaign Management
  createEmailCampaign(campaign: InsertEmailCampaign): Promise<EmailCampaign>;
  getEmailCampaigns(): Promise<EmailCampaign[]>;
  getEmailCampaign(id: string): Promise<EmailCampaign | undefined>;
  updateEmailCampaign(id: string, updates: Partial<EmailCampaign>): Promise<EmailCampaign | undefined>;

  // Email Subscriber Management
  createEmailSubscriber(subscriber: InsertEmailSubscriber): Promise<EmailSubscriber>;
  getEmailSubscribers(filters?: { subscriberType?: string; industry?: string }): Promise<EmailSubscriber[]>;
  getEmailSubscriber(id: string): Promise<EmailSubscriber | undefined>;

  // Utility
  calculateTradeValue(phoneModel: string, condition: string): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private quotes: Map<string, Quote>;
  private heroes: Map<string, Hero>;
  private tradeIns: Map<string, TradeIn>;
  private impactStats: ImpactStats;
  private referrals: Map<string, Referral>;
  private dubaiChallenges: Map<string, DubaiChallenge>;
  private dubaiRewards: Map<string, DubaiReward>;
  private sponsors: Map<string, Sponsor>;
  private sponsorshipTiers: Map<string, SponsorshipTier>;
  private sponsoredMissions: Map<string, SponsoredMission>;
  private missionSponsorships: Map<string, MissionSponsorship>;
  private corporateLeads: Map<string, CorporateLead>;
  private emailCampaigns: Map<string, EmailCampaign>;
  private emailSubscribers: Map<string, EmailSubscriber>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.quotes = new Map();
    this.heroes = new Map();
    this.tradeIns = new Map();
    this.referrals = new Map();
    this.dubaiChallenges = new Map();
    this.dubaiRewards = new Map();
    this.sponsors = new Map();
    this.sponsorshipTiers = new Map();
    this.sponsoredMissions = new Map();
    this.missionSponsorships = new Map();
    this.corporateLeads = new Map();
    this.emailCampaigns = new Map();
    this.emailSubscribers = new Map();
    
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
    this.seedSponsorshipData();
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
      },
      {
        id: "challenge-3",
        title: "Dubai Creek Harbour Plastic-Free Mission",
        description: "Transform Dubai Creek Harbour into a plastic-free zone with AquaCafe installations and community cleanup drives",
        category: "water",
        targetZone: "Dubai Creek Harbour",
        pointsReward: 1000,
        rewardItem: "AED 100 voucher + Creek Hero badge + FREE lunch",
        timeLimit: 60,
        participantLimit: 200,
        currentParticipants: 45,
        isActive: true,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
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

  private seedSponsorshipData() {
    // Seed sponsorship tiers
    const tiers: SponsorshipTier[] = [
      {
        id: "tier-bronze",
        name: "Bronze Sponsor",
        minAmount: 50000, // AED 500
        maxAmount: 199900, // AED 1,999
        benefits: ["Logo on mission page", "Monthly impact report", "Community recognition"],
        badgeColor: "#CD7F32",
        priority: 1,
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "tier-silver", 
        name: "Silver Sponsor",
        minAmount: 200000, // AED 2,000
        maxAmount: 499900, // AED 4,999
        benefits: ["Featured logo placement", "Weekly impact reports", "Sponsor spotlight", "Direct hero engagement"],
        badgeColor: "#C0C0C0",
        priority: 2,
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "tier-gold",
        name: "Gold Sponsor",
        minAmount: 500000, // AED 5,000
        maxAmount: 999900, // AED 9,999
        benefits: ["Premium logo placement", "Real-time dashboard access", "Monthly sponsor meetup", "Media coverage", "Custom impact metrics"],
        badgeColor: "#FFD700",
        priority: 3,
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "tier-platinum",
        name: "Platinum Sponsor",
        minAmount: 1000000, // AED 10,000+
        maxAmount: null,
        benefits: ["Exclusive branding opportunity", "Dedicated success manager", "Quarterly strategy sessions", "VIP event access", "Co-marketing opportunities", "Custom mission creation"],
        badgeColor: "#E5E4E2",
        priority: 4,
        isActive: true,
        createdAt: new Date(),
      }
    ];

    // Seed some initial sponsors
    const sponsors: Sponsor[] = [
      {
        id: "sponsor-1",
        name: "Emirates Wildlife Society",
        email: "partnerships@ews-wwf.ae",
        organizationType: "ngo",
        description: "Leading conservation organization dedicated to protecting Dubai's natural heritage and promoting sustainable practices.",
        logoUrl: null,
        website: "https://www.ews-wwf.ae",
        contactPerson: "Dr. Laila Mostafa Abdullatif",
        phone: "+971-4-315-2777",
        isVerified: true,
        totalFunded: 2500000, // AED 25,000
        missionsSponsored: 5,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date(),
      },
      {
        id: "sponsor-2",
        name: "Dubai Municipality",
        email: "sustainability@dm.gov.ae",
        organizationType: "government",
        description: "Dubai's municipal authority committed to creating a sustainable and environmentally friendly city.",
        logoUrl: null,
        website: "https://www.dm.gov.ae",
        contactPerson: "Eng. Dawood Abdul Rahman Al Hajri",
        phone: "+971-4-221-5555",
        isVerified: true,
        totalFunded: 5000000, // AED 50,000
        missionsSponsored: 12,
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date(),
      },
      {
        id: "sponsor-3",
        name: "Emirates Green Development Corp",
        email: "impact@emiratesgreen.ae",
        organizationType: "corporate",
        description: "Pioneering sustainable development initiatives across the UAE with focus on environmental innovation.",
        logoUrl: null,
        website: "https://www.emiratesgreen.ae",
        contactPerson: "Fatima Al Zahra",
        phone: "+971-4-123-4567",
        isVerified: true,
        totalFunded: 1500000, // AED 15,000
        missionsSponsored: 3,
        createdAt: new Date("2024-03-01"),
        updatedAt: new Date(),
      }
    ];

    // Seed sponsored missions
    const missions: SponsoredMission[] = [
      {
        id: "mission-1",
        title: "Dubai Creek Harbor Plastic-Free Initiative",
        description: "Transform Dubai Creek Harbor into a completely plastic-free zone by installing AquaCafe stations and organizing community cleanup drives.",
        category: "water",
        targetZone: "Dubai Creek Harbor",
        fundingGoal: 1000000, // AED 10,000
        currentFunding: 750000, // AED 7,500 (75% funded)
        participantLimit: 500,
        currentParticipants: 287,
        pointsReward: 1000,
        environmentalGoal: "Eliminate 50,000 plastic bottles from Dubai Creek Harbor",
        timeLimit: 90,
        status: "active",
        isActive: true,
        createdAt: new Date("2024-07-01"),
        startsAt: new Date("2024-08-01"),
        expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      },
      {
        id: "mission-2",
        title: "Business Bay Solar Heroes Challenge",
        description: "Promote renewable energy adoption in Business Bay by helping residents install solar panels and smart energy management systems.",
        category: "energy",
        targetZone: "Business Bay",
        fundingGoal: 2000000, // AED 20,000
        currentFunding: 500000, // AED 5,000 (25% funded)
        participantLimit: 200,
        currentParticipants: 45,
        pointsReward: 1500,
        environmentalGoal: "Reduce CO2 emissions by 10 tons through solar installations",
        timeLimit: 120,
        status: "funding",
        isActive: true,
        createdAt: new Date("2024-07-15"),
        startsAt: new Date("2024-09-01"),
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
      {
        id: "mission-3",
        title: "Dubai Marina Biodiversity Restoration",
        description: "Restore marine biodiversity in Dubai Marina by creating artificial reefs and organizing underwater cleanup missions.",
        category: "biodiversity",
        targetZone: "Dubai Marina",
        fundingGoal: 3000000, // AED 30,000
        currentFunding: 300000, // AED 3,000 (10% funded)
        participantLimit: 100,
        currentParticipants: 12,
        pointsReward: 2000,
        environmentalGoal: "Restore 5 coral reef sites and remove 2 tons of underwater debris",
        timeLimit: 180,
        status: "funding",
        isActive: true,
        createdAt: new Date("2024-08-01"),
        startsAt: new Date("2024-10-01"),
        expiresAt: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000),
      }
    ];

    tiers.forEach(tier => this.sponsorshipTiers.set(tier.id, tier));
    sponsors.forEach(sponsor => this.sponsors.set(sponsor.id, sponsor));
    missions.forEach(mission => this.sponsoredMissions.set(mission.id, mission));
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(userData: InsertUser): Promise<User> {
    const user: User = {
      id: randomUUID(),
      username: userData.username,
      password: userData.password,
      email: userData.email || null,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      phone: userData.phone || null,
      address: userData.address || null,
      city: userData.city || "Dubai",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Contact operations
  async createContact(contactData: InsertContact): Promise<Contact> {
    const contact: Contact = {
      id: randomUUID(),
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone || null,
      company: contactData.company || null,
      subject: contactData.subject,
      message: contactData.message,
      status: "new",
      createdAt: new Date(),
    };
    this.contacts.set(contact.id, contact);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  // Quote operations  
  async createQuote(quoteData: InsertQuote): Promise<Quote> {
    const quote: Quote = {
      id: randomUUID(),
      userId: quoteData.userId || null,
      phoneModel: quoteData.phoneModel,
      phoneCondition: quoteData.phoneCondition,
      estimatedValue: quoteData.estimatedValue,
      actualValue: null,
      status: "pending",
      notes: quoteData.notes || null,
      expiresAt: quoteData.expiresAt,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.quotes.set(quote.id, quote);
    return quote;
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async getQuotesByUser(userId: string): Promise<Quote[]> {
    return Array.from(this.quotes.values()).filter(quote => quote.userId === userId);
  }

  async updateQuoteStatus(id: string, status: string): Promise<Quote | undefined> {
    const quote = this.quotes.get(id);
    if (!quote) return undefined;
    
    const updatedQuote = { ...quote, status, updatedAt: new Date() };
    this.quotes.set(id, updatedQuote);
    return updatedQuote;
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

  // Sponsor operations
  async createSponsor(insertSponsor: InsertSponsor): Promise<Sponsor> {
    const id = randomUUID();
    const sponsor: Sponsor = {
      id,
      ...insertSponsor,
      logoUrl: insertSponsor.logoUrl || null,
      website: insertSponsor.website || null,
      phone: insertSponsor.phone || null,
      isVerified: false,
      totalFunded: 0,
      missionsSponsored: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.sponsors.set(id, sponsor);
    return sponsor;
  }

  async getSponsor(id: string): Promise<Sponsor | undefined> {
    return this.sponsors.get(id);
  }

  async getSponsorByEmail(email: string): Promise<Sponsor | undefined> {
    return Array.from(this.sponsors.values()).find(sponsor => sponsor.email === email);
  }

  async getAllSponsors(): Promise<Sponsor[]> {
    return Array.from(this.sponsors.values());
  }

  async verifySponsor(id: string): Promise<Sponsor | undefined> {
    const sponsor = this.sponsors.get(id);
    if (!sponsor) return undefined;

    const updatedSponsor: Sponsor = {
      ...sponsor,
      isVerified: true,
      updatedAt: new Date(),
    };

    this.sponsors.set(id, updatedSponsor);
    return updatedSponsor;
  }

  // Sponsorship tier operations
  async getSponsorshipTiers(): Promise<SponsorshipTier[]> {
    return Array.from(this.sponsorshipTiers.values()).filter(tier => tier.isActive);
  }

  async getSponsorshipTier(id: string): Promise<SponsorshipTier | undefined> {
    return this.sponsorshipTiers.get(id);
  }

  // Sponsored mission operations
  async createSponsoredMission(insertMission: InsertSponsoredMission): Promise<SponsoredMission> {
    const id = randomUUID();
    const mission: SponsoredMission = {
      id,
      ...insertMission,
      targetZone: insertMission.targetZone || null,
      participantLimit: insertMission.participantLimit || null,
      timeLimit: insertMission.timeLimit || null,
      startsAt: insertMission.startsAt || null,
      expiresAt: insertMission.expiresAt || null,
      currentFunding: 0,
      currentParticipants: 0,
      status: "funding",
      isActive: true,
      createdAt: new Date(),
    };
    
    this.sponsoredMissions.set(id, mission);
    return mission;
  }

  async getSponsoredMissions(): Promise<SponsoredMission[]> {
    return Array.from(this.sponsoredMissions.values()).filter(mission => mission.isActive);
  }

  async getSponsoredMission(id: string): Promise<SponsoredMission | undefined> {
    return this.sponsoredMissions.get(id);
  }

  async updateSponsoredMissionFunding(id: string, amount: number): Promise<SponsoredMission | undefined> {
    const mission = this.sponsoredMissions.get(id);
    if (!mission) return undefined;

    const updatedMission: SponsoredMission = {
      ...mission,
      currentFunding: mission.currentFunding + amount,
      status: mission.currentFunding + amount >= mission.fundingGoal ? "active" : mission.status,
    };

    this.sponsoredMissions.set(id, updatedMission);
    return updatedMission;
  }

  async joinSponsoredMission(missionId: string, heroId: string): Promise<boolean> {
    const mission = this.sponsoredMissions.get(missionId);
    const hero = this.heroes.get(heroId);
    
    if (!mission || !hero || mission.status !== "active") {
      return false;
    }

    if (mission.participantLimit && mission.currentParticipants >= mission.participantLimit) {
      return false;
    }

    const updatedMission = {
      ...mission,
      currentParticipants: mission.currentParticipants + 1
    };
    this.sponsoredMissions.set(missionId, updatedMission);

    const challengesCompleted = Array.isArray(hero.challengesCompleted) ? hero.challengesCompleted : [];
    const updatedHero = {
      ...hero,
      challengesCompleted: [...challengesCompleted, missionId],
      points: hero.points + mission.pointsReward,
      updatedAt: new Date()
    };
    this.heroes.set(heroId, updatedHero);

    return true;
  }

  // Mission sponsorship operations
  async createMissionSponsorship(insertSponsorship: InsertMissionSponsorship): Promise<MissionSponsorship> {
    const id = randomUUID();
    const sponsorship: MissionSponsorship = {
      id,
      ...insertSponsorship,
      message: insertSponsorship.message || null,
      isAnonymous: insertSponsorship.isAnonymous || false,
      status: "pending",
      createdAt: new Date(),
    };
    
    this.missionSponsorships.set(id, sponsorship);
    return sponsorship;
  }

  async getMissionSponsorships(missionId: string): Promise<MissionSponsorship[]> {
    return Array.from(this.missionSponsorships.values())
      .filter(sponsorship => sponsorship.missionId === missionId);
  }

  async confirmMissionSponsorship(id: string): Promise<MissionSponsorship | undefined> {
    const sponsorship = this.missionSponsorships.get(id);
    if (!sponsorship) return undefined;

    const updatedSponsorship: MissionSponsorship = {
      ...sponsorship,
      status: "confirmed",
    };

    this.missionSponsorships.set(id, updatedSponsorship);

    // Update mission funding
    await this.updateSponsoredMissionFunding(sponsorship.missionId, sponsorship.amount);

    // Update sponsor stats
    const sponsor = this.sponsors.get(sponsorship.sponsorId);
    if (sponsor) {
      const updatedSponsor: Sponsor = {
        ...sponsor,
        totalFunded: sponsor.totalFunded + sponsorship.amount,
        missionsSponsored: sponsor.missionsSponsored + 1,
        updatedAt: new Date(),
      };
      this.sponsors.set(sponsorship.sponsorId, updatedSponsor);
    }

    return updatedSponsorship;
  }

  // Corporate Lead Management
  async createCorporateLead(insertLead: InsertCorporateLead): Promise<CorporateLead> {
    const id = randomUUID();
    const lead: CorporateLead = {
      id,
      ...insertLead,
      phone: insertLead.phone || null,
      deviceCount: insertLead.deviceCount || null,
      message: insertLead.message || null,
      source: insertLead.source || "cobone_landing",
      status: "new",
      priority: "medium",
      estimatedValue: null,
      assignedTo: null,
      lastContactAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.corporateLeads.set(id, lead);
    return lead;
  }

  async getCorporateLeads(filters?: { status?: string; industry?: string; priority?: string }): Promise<CorporateLead[]> {
    let leads = Array.from(this.corporateLeads.values());
    
    if (filters?.status) {
      leads = leads.filter(lead => lead.status === filters.status);
    }
    if (filters?.industry) {
      leads = leads.filter(lead => lead.industry === filters.industry);
    }
    if (filters?.priority) {
      leads = leads.filter(lead => lead.priority === filters.priority);
    }
    
    return leads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getCorporateLead(id: string): Promise<CorporateLead | undefined> {
    return this.corporateLeads.get(id);
  }

  async updateCorporateLead(id: string, updates: Partial<CorporateLead>): Promise<CorporateLead | undefined> {
    const lead = this.corporateLeads.get(id);
    if (!lead) return undefined;

    const updatedLead: CorporateLead = {
      ...lead,
      ...updates,
      updatedAt: new Date(),
    };

    this.corporateLeads.set(id, updatedLead);
    return updatedLead;
  }

  // Email Campaign Management
  async createEmailCampaign(insertCampaign: InsertEmailCampaign): Promise<EmailCampaign> {
    const id = randomUUID();
    const campaign: EmailCampaign = {
      id,
      ...insertCampaign,
      industry: insertCampaign.industry || null,
      status: "draft",
      scheduledAt: insertCampaign.scheduledAt || null,
      sentAt: null,
      totalRecipients: 0,
      emailsSent: 0,
      opensCount: 0,
      clicksCount: 0,
      unsubscribes: 0,
      bounces: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.emailCampaigns.set(id, campaign);
    return campaign;
  }

  async getEmailCampaigns(): Promise<EmailCampaign[]> {
    return Array.from(this.emailCampaigns.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getEmailCampaign(id: string): Promise<EmailCampaign | undefined> {
    return this.emailCampaigns.get(id);
  }

  async updateEmailCampaign(id: string, updates: Partial<EmailCampaign>): Promise<EmailCampaign | undefined> {
    const campaign = this.emailCampaigns.get(id);
    if (!campaign) return undefined;

    const updatedCampaign: EmailCampaign = {
      ...campaign,
      ...updates,
      updatedAt: new Date(),
    };

    this.emailCampaigns.set(id, updatedCampaign);
    return updatedCampaign;
  }

  // Email Subscriber Management
  async createEmailSubscriber(insertSubscriber: InsertEmailSubscriber): Promise<EmailSubscriber> {
    const id = randomUUID();
    const subscriber: EmailSubscriber = {
      id,
      ...insertSubscriber,
      firstName: insertSubscriber.firstName || null,
      lastName: insertSubscriber.lastName || null,
      companyName: insertSubscriber.companyName || null,
      industry: insertSubscriber.industry || null,
      subscriberType: insertSubscriber.subscriberType || "corporate",
      isActive: true,
      source: insertSubscriber.source || "website",
      tags: insertSubscriber.tags || [],
      preferences: {},
      lastEmailAt: null,
      subscribedAt: new Date(),
      unsubscribedAt: null,
    };
    
    this.emailSubscribers.set(id, subscriber);
    return subscriber;
  }

  async getEmailSubscribers(filters?: { subscriberType?: string; industry?: string }): Promise<EmailSubscriber[]> {
    let subscribers = Array.from(this.emailSubscribers.values())
      .filter(sub => sub.isActive);
    
    if (filters?.subscriberType) {
      subscribers = subscribers.filter(sub => sub.subscriberType === filters.subscriberType);
    }
    if (filters?.industry) {
      subscribers = subscribers.filter(sub => sub.industry === filters.industry);
    }
    
    return subscribers;
  }

  async getEmailSubscriber(id: string): Promise<EmailSubscriber | undefined> {
    return this.emailSubscribers.get(id);
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
