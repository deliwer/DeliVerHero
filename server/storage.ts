import { users, heroes, tradeIns, impactStats, referrals, contacts, quotes, 
  socialChallenges, challengeParticipants, socialShares, 
  wellnessPassports, wellnessJourneys, wellnessJourneySteps, 
  aquaShowPerks, luxuryHotelPartners, restaurantPartners, 
  wellnessJourneyParticipants, dubaiChallenges, dubaiRewards, 
  sponsors, corporateAccounts, corporateUsers, bulkQuotes, 
  purchaseOrders, sponsorshipTiers, leadApplications,
  ejariConversations 
} from "@shared/schema";
import { 
  type Hero, type InsertHero, type TradeIn, type InsertTradeIn, 
  type ImpactStats, type Referral, type UpdateHero, type DubaiChallenge, 
  type DubaiReward, type Sponsor, type InsertSponsor, type SponsorshipTier, 
  type User, type InsertUser, type Contact, type InsertContact, 
  type Quote, type InsertQuote, type Order, type InsertOrder, 
  type Customer, type InsertCustomer, type LoyaltyMembership, 
  type InsertLoyaltyMembership, type DigitalVoucher, type InsertDigitalVoucher, 
  type TombolaPrize, type InsertTombolaPrize, type TombolaSpin, 
  type InsertTombolaSpin, type TombolaConfig, type CouponTemplate, 
  type InsertCouponTemplate, type IssuedCoupon, type InsertIssuedCoupon, 
  type HeroSpinCount, type RedeemCoupon, type PlanetMission, 
  type InsertPlanetMission, type HeroMissionProgress, 
  type InsertHeroMissionProgress, type PlanetPointsTransaction, 
  type MetaverseAvatar, type InsertMetaverseAvatar, type AchievementBadge, 
  type InsertAchievementBadge, type HeroBadge, type InsertHeroBadge, 
  type MetaverseReward, type InsertMetaverseReward, type RewardRedemption, 
  type InsertRewardRedemption, type DailyQuest, type InsertDailyQuest, 
  type WellnessPassport, type InsertWellnessPassport, type WellnessJourney, 
  type InsertWellnessJourney, type WellnessJourneyStep, 
  type InsertWellnessJourneyStep, type AquaShowPerk, type InsertAquaShowPerk, 
  type LuxuryHotelPartner, type InsertLuxuryHotelPartner, 
  type RestaurantPartner, type InsertRestaurantPartner, 
  type WellnessJourneyParticipant, type InsertWellnessJourneyParticipant, 
  type City, type InsertCity, type Season, type InsertSeason,
  type LeadApplication, type InsertLeadApplication,
  type EjariConversation, type InsertEjariConversation
} from "@shared/schema";

export interface IStorage {
  // Ejari Concierge
  getEjariConversation(phone: string): Promise<EjariConversation | undefined>;
  createEjariConversation(conv: InsertEjariConversation): Promise<EjariConversation>;
  updateEjariConversation(id: string, updates: Partial<EjariConversation>): Promise<EjariConversation | undefined>;
  
  // Lead Applications
  createLeadApplication(lead: InsertLeadApplication): Promise<LeadApplication>;
  getLeadApplications(): Promise<LeadApplication[]>;
  updateLeadRequirements(id: string, requirements: string, whatsappResponses: any[]): Promise<LeadApplication | undefined>;

  // ... rest of the interface ...
}

export class MemStorage implements IStorage {
  private ejariConversations: Map<string, EjariConversation>;
  // ... other maps ...

  constructor() {
    this.ejariConversations = new Map();
    // ...
  }

  async getEjariConversation(phone: string): Promise<EjariConversation | undefined> {
    return Array.from(this.ejariConversations.values()).find(c => c.phone === phone);
  }

  async createEjariConversation(conv: InsertEjariConversation): Promise<EjariConversation> {
    const id = Math.random().toString(36).substr(2, 9);
    const newConv: EjariConversation = { 
      ...conv, 
      id, 
      platform: conv.platform || "whatsapp",
      moveInTiming: conv.moveInTiming || null,
      area: conv.area || null,
      propertyType: conv.propertyType || null,
      waterChecked: conv.waterChecked || null,
      cleaningNeeded: conv.cleaningNeeded || null,
      fixesNeeded: conv.fixesNeeded || null,
      status: conv.status || "QUALIFYING",
      lastMessageSentAt: new Date(),
      reminderSent: false,
      createdAt: new Date(), 
      updatedAt: new Date() 
    };
    this.ejariConversations.set(id, newConv);
    return newConv;
  }

  async updateEjariConversation(id: string, updates: Partial<EjariConversation>): Promise<EjariConversation | undefined> {
    const conv = this.ejariConversations.get(id);
    if (!conv) return undefined;
    const updated = { ...conv, ...updates, updatedAt: new Date() };
    this.ejariConversations.set(id, updated);
    return updated;
  }

  // ... implementation of other methods ...
}

export const storage = new MemStorage();
