import { type Hero, type InsertHero, type TradeIn, type InsertTradeIn, type ImpactStats, type Referral, type UpdateHero, type DubaiChallenge, type DubaiReward, type Sponsor, type InsertSponsor, type SponsorshipTier, type SponsoredMission, type InsertSponsoredMission, type MissionSponsorship, type InsertMissionSponsorship, type User, type InsertUser, type Contact, type InsertContact, type Quote, type InsertQuote, type CorporateLead, type InsertCorporateLead, type EmailCampaign, type InsertEmailCampaign, type EmailSubscriber, type InsertEmailSubscriber, type Order, type InsertOrder, type Customer, type InsertCustomer, type TombolaPrize, type InsertTombolaPrize, type TombolaSpin, type InsertTombolaSpin, type TombolaConfig, type CouponTemplate, type InsertCouponTemplate, type IssuedCoupon, type InsertIssuedCoupon, type HeroSpinCount, type RedeemCoupon, type PlanetMission, type InsertPlanetMission, type HeroMissionProgress, type InsertHeroMissionProgress, type PlanetPointsTransaction, type InsertPlanetPointsLedger, type MetaverseAvatar, type InsertMetaverseAvatar, type AchievementBadge, type InsertAchievementBadge, type HeroBadge, type InsertHeroBadge, type MetaverseReward, type InsertMetaverseReward, type RewardRedemption, type InsertRewardRedemption, type DailyQuest, type InsertDailyQuest, type AcceptMission, type UpdateMissionProgress, type CompleteMission, type RedeemReward, type UpdateAvatar, type WellnessPassport, type InsertWellnessPassport, type WellnessJourney, type InsertWellnessJourney, type WellnessJourneyStep, type InsertWellnessJourneyStep, type AquaShowPerk, type InsertAquaShowPerk, type LuxuryHotelPartner, type InsertLuxuryHotelPartner, type RestaurantPartner, type InsertRestaurantPartner, type WellnessJourneyParticipant, type InsertWellnessJourneyParticipant, type City, type InsertCity, type Season, type InsertSeason, type ActivitySubmission, type InsertActivitySubmission, type VerificationEvent, type InsertVerificationEvent, type GlobalPartner, type InsertGlobalPartner, type AiMissionTemplate, type InsertAiMissionTemplate, type EnvironmentState, type InsertEnvironmentState, type LeaderboardSnapshot, type InsertLeaderboardSnapshot, type B2bBuyer, type InsertB2bBuyer, type InventorySource, type InsertInventorySource, type InventoryUpload, type InsertInventoryUpload, type WholesaleInventory, type InsertWholesaleInventory } from "@shared/schema";
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

  // Order Management
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrdersByCustomer(customerId: string): Promise<Order[]>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;

  // Customer Management
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  getCustomer(id: string): Promise<Customer | undefined>;
  getCustomerByEmail(email: string): Promise<Customer | undefined>;
  updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer | undefined>;

  // Tombola Gamification System
  getTombolaConfig(): Promise<TombolaConfig>;
  updateTombolaConfig(config: Partial<TombolaConfig>): Promise<TombolaConfig>;
  getTombolaPrizes(): Promise<TombolaPrize[]>;
  getTombolaPrize(id: string): Promise<TombolaPrize | undefined>;
  createTombolaPrize(prize: InsertTombolaPrize): Promise<TombolaPrize>;
  updateTombolaPrize(id: string, updates: Partial<TombolaPrize>): Promise<TombolaPrize | undefined>;
  
  // Tombola Spins
  spinTombola(heroId: string, spinType?: string): Promise<{ spin: TombolaSpin; prize?: TombolaPrize; coupon?: IssuedCoupon }>;
  getTombolaHistory(heroId: string): Promise<TombolaSpin[]>;
  getHeroSpinCount(heroId: string): Promise<HeroSpinCount>;
  updateHeroSpinCount(heroId: string, updates: Partial<HeroSpinCount>): Promise<HeroSpinCount>;
  canSpin(heroId: string): Promise<{ canSpin: boolean; reason?: string; spinsLeft?: number }>;

  // Digital Coupons
  getCouponTemplates(): Promise<CouponTemplate[]>;
  getCouponTemplate(id: string): Promise<CouponTemplate | undefined>;
  createCouponTemplate(template: InsertCouponTemplate): Promise<CouponTemplate>;
  getIssuedCoupons(heroId: string): Promise<IssuedCoupon[]>;
  getIssuedCoupon(id: string): Promise<IssuedCoupon | undefined>;
  createIssuedCoupon(issuedCoupon: InsertIssuedCoupon): Promise<IssuedCoupon>;
  redeemCoupon(redemption: RedeemCoupon): Promise<IssuedCoupon | undefined>;

  // METAVERSE GAMING SYSTEM - Ultimate Planet Missions
  // Planet Mission operations
  getPlanetMissions(): Promise<PlanetMission[]>;
  getPlanetMission(code: string): Promise<PlanetMission | undefined>;
  createPlanetMission(mission: InsertPlanetMission): Promise<PlanetMission>;
  
  // Hero Mission Progress operations
  getHeroMissionProgress(heroId: string): Promise<HeroMissionProgress[]>;
  getMissionProgress(heroId: string, missionCode: string): Promise<HeroMissionProgress | undefined>;
  acceptMission(heroId: string, data: AcceptMission): Promise<HeroMissionProgress>;
  updateMissionProgress(heroId: string, missionInstanceId: string, data: UpdateMissionProgress): Promise<HeroMissionProgress | undefined>;
  completeMission(heroId: string, missionInstanceId: string, data: CompleteMission): Promise<{ progress: HeroMissionProgress; pointsAwarded: number; xpAwarded: number; badgesUnlocked: string[] }>;
  
  // Planet Points operations
  getPlanetPointsBalance(heroId: string): Promise<number>;
  getPlanetPointsLedger(heroId: string, limit?: number): Promise<PlanetPointsTransaction[]>;
  awardPlanetPoints(heroId: string, points: number, source: string, refType: string, refId: string, description: string): Promise<PlanetPointsTransaction>;
  spendPlanetPoints(heroId: string, points: number, source: string, refType: string, refId: string, description: string): Promise<PlanetPointsTransaction>;
  
  // Metaverse Avatar operations
  getMetaverseAvatar(heroId: string): Promise<MetaverseAvatar | undefined>;
  createMetaverseAvatar(data: InsertMetaverseAvatar): Promise<MetaverseAvatar>;
  updateMetaverseAvatar(heroId: string, data: UpdateAvatar): Promise<MetaverseAvatar | undefined>;
  awardXP(heroId: string, xp: number): Promise<{ avatar: MetaverseAvatar; leveledUp: boolean; newRank?: string }>;
  
  // Achievement Badge operations
  getAchievementBadges(): Promise<AchievementBadge[]>;
  getAchievementBadge(code: string): Promise<AchievementBadge | undefined>;
  createAchievementBadge(badge: InsertAchievementBadge): Promise<AchievementBadge>;
  
  // Hero Badge operations
  getHeroBadges(heroId: string): Promise<HeroBadge[]>;
  unlockBadge(heroId: string, badgeCode: string): Promise<{ badge: HeroBadge; isNew: boolean }>;
  equipBadge(heroId: string, badgeCode: string): Promise<boolean>;
  
  // Metaverse Rewards operations
  getMetaverseRewards(category?: string): Promise<MetaverseReward[]>;
  getMetaverseReward(id: string): Promise<MetaverseReward | undefined>;
  createMetaverseReward(reward: InsertMetaverseReward): Promise<MetaverseReward>;
  
  // Reward Redemption operations
  redeemMetaverseReward(heroId: string, data: RedeemReward): Promise<RewardRedemption>;
  getRewardRedemptions(heroId: string): Promise<RewardRedemption[]>;
  updateRedemptionStatus(id: string, status: string): Promise<RewardRedemption | undefined>;
  
  // Daily Quest operations
  getDailyQuests(heroId: string): Promise<DailyQuest[]>;
  createDailyQuest(quest: InsertDailyQuest): Promise<DailyQuest>;
  completeDailyQuest(questId: string): Promise<DailyQuest | undefined>;
  generateDailyQuests(heroId: string): Promise<DailyQuest[]>;
  
  // Wellness Passport operations
  createWellnessPassport(passport: InsertWellnessPassport): Promise<WellnessPassport>;
  getWellnessPassport(id: string): Promise<WellnessPassport | undefined>;
  getWellnessPassportByPhone(phone: string): Promise<WellnessPassport | undefined>;
  recordShare(passportId: string): Promise<WellnessPassport | undefined>;
  progressStep(passportId: string, step: number): Promise<WellnessPassport | undefined>;
  redeemPassport(passportId: string): Promise<WellnessPassport | undefined>;

  // Comprehensive Dubai Wellness Journey operations
  createWellnessJourney(journey: InsertWellnessJourney): Promise<WellnessJourney>;
  getWellnessJourney(id: string): Promise<WellnessJourney | undefined>;
  getWellnessJourneysByHero(heroId: string): Promise<WellnessJourney[]>;
  updateWellnessJourneyProgress(id: string, progress: number): Promise<WellnessJourney | undefined>;
  completeWellnessJourneyStep(journeyId: string, stepNumber: number): Promise<WellnessJourney | undefined>;
  
  // Wellness Journey Steps operations
  createWellnessJourneyStep(step: InsertWellnessJourneyStep): Promise<WellnessJourneyStep>;
  getWellnessJourneySteps(journeyId: string): Promise<WellnessJourneyStep[]>;
  getWellnessJourneyStep(id: string): Promise<WellnessJourneyStep | undefined>;
  completeJourneyStep(stepId: string): Promise<WellnessJourneyStep | undefined>;
  
  // Aqua Show Perks operations
  getAquaShowPerks(): Promise<AquaShowPerk[]>;
  getAquaShowPerk(id: string): Promise<AquaShowPerk | undefined>;
  createAquaShowPerk(perk: InsertAquaShowPerk): Promise<AquaShowPerk>;
  claimAquaShowPerk(perkId: string, heroId: string): Promise<boolean>;
  
  // Luxury Hotel Partners operations
  getLuxuryHotelPartners(): Promise<LuxuryHotelPartner[]>;
  getLuxuryHotelPartner(id: string): Promise<LuxuryHotelPartner | undefined>;
  createLuxuryHotelPartner(partner: InsertLuxuryHotelPartner): Promise<LuxuryHotelPartner>;
  updateHotelPartner(id: string, updates: Partial<LuxuryHotelPartner>): Promise<LuxuryHotelPartner | undefined>;
  
  // Restaurant Partners operations
  getRestaurantPartners(): Promise<RestaurantPartner[]>;
  getRestaurantPartner(id: string): Promise<RestaurantPartner | undefined>;
  getRestaurantPartnerByRestaurantId(restaurantId: string): Promise<RestaurantPartner | undefined>;
  createRestaurantPartner(partner: InsertRestaurantPartner): Promise<RestaurantPartner>;
  updateRestaurantPartner(id: string, updates: Partial<RestaurantPartner>): Promise<RestaurantPartner | undefined>;
  
  // Wellness Journey Participants operations
  createWellnessJourneyParticipant(participant: InsertWellnessJourneyParticipant): Promise<WellnessJourneyParticipant>;
  getWellnessJourneyParticipant(id: string): Promise<WellnessJourneyParticipant | undefined>;
  getParticipantsByJourney(journeyId: string): Promise<WellnessJourneyParticipant[]>;
  getParticipantsByHero(heroId: string): Promise<WellnessJourneyParticipant[]>;
  updateParticipantProgress(id: string, updates: Partial<WellnessJourneyParticipant>): Promise<WellnessJourneyParticipant | undefined>;
  
  // Utility
  calculateTradeValue(phoneModel: string, condition: string): Promise<number>;

  // ============================================================================
  // GLOBAL SUSTAINABILITY FRAMEWORK METHODS  
  // ============================================================================
  
  // Cities management
  getCities(): Promise<City[]>;
  getCity(id: string): Promise<City | undefined>;
  createCity(city: InsertCity): Promise<City>;
  updateCity(id: string, updates: Partial<City>): Promise<City | undefined>;
  
  // Seasons management
  getSeasons(): Promise<Season[]>;
  getSeason(id: string): Promise<Season | undefined>;
  getSeasonsByCity(cityId: string): Promise<Season[]>;
  getActiveSeasons(): Promise<Season[]>;
  createSeason(season: InsertSeason): Promise<Season>;
  updateSeason(id: string, updates: Partial<Season>): Promise<Season | undefined>;
  
  // Activity submissions (real-world verification)
  getActivitySubmissions(heroId?: string): Promise<ActivitySubmission[]>;
  getActivitySubmission(id: string): Promise<ActivitySubmission | undefined>;
  getSubmissionsByMission(missionCode: string): Promise<ActivitySubmission[]>;
  getSubmissionsByCity(cityId: string): Promise<ActivitySubmission[]>;
  createActivitySubmission(submission: InsertActivitySubmission): Promise<ActivitySubmission>;
  updateActivitySubmission(id: string, updates: Partial<ActivitySubmission>): Promise<ActivitySubmission | undefined>;
  
  // Verification events  
  getVerificationEvents(submissionId?: string): Promise<VerificationEvent[]>;
  createVerificationEvent(event: InsertVerificationEvent): Promise<VerificationEvent>;
  
  // Global partners
  getGlobalPartners(cityId?: string): Promise<GlobalPartner[]>;
  getGlobalPartner(id: string): Promise<GlobalPartner | undefined>;
  getPartnersByType(partnerType: string, cityId?: string): Promise<GlobalPartner[]>;
  createGlobalPartner(partner: InsertGlobalPartner): Promise<GlobalPartner>;
  updateGlobalPartner(id: string, updates: Partial<GlobalPartner>): Promise<GlobalPartner | undefined>;
  
  // AI mission templates
  getAiMissionTemplates(cityId?: string): Promise<AiMissionTemplate[]>;
  getAiMissionTemplate(id: string): Promise<AiMissionTemplate | undefined>;
  getTemplatesByCategory(category: string): Promise<AiMissionTemplate[]>;
  createAiMissionTemplate(template: InsertAiMissionTemplate): Promise<AiMissionTemplate>;
  updateAiMissionTemplate(id: string, updates: Partial<AiMissionTemplate>): Promise<AiMissionTemplate | undefined>;
  
  // Environment states (dynamic metaverse scenes)
  getEnvironmentStates(cityId?: string, seasonId?: string): Promise<EnvironmentState[]>;
  getEnvironmentState(id: string): Promise<EnvironmentState | undefined>;
  getEnvironmentStateByName(environmentName: string, cityId: string): Promise<EnvironmentState | undefined>;
  createEnvironmentState(state: InsertEnvironmentState): Promise<EnvironmentState>;
  updateEnvironmentState(id: string, updates: Partial<EnvironmentState>): Promise<EnvironmentState | undefined>;
  
  // Leaderboard snapshots
  getLeaderboardSnapshots(scope?: string, cityId?: string): Promise<LeaderboardSnapshot[]>;
  getLatestSnapshot(snapshotType: string, scope: string, cityId?: string): Promise<LeaderboardSnapshot | undefined>;
  createLeaderboardSnapshot(snapshot: InsertLeaderboardSnapshot): Promise<LeaderboardSnapshot>;
  
  // Enhanced mission operations with verification
  submitMissionActivity(heroId: string, missionCode: string, submission: InsertActivitySubmission): Promise<{ submission: ActivitySubmission; verified: boolean; pointsAwarded: number; }>;
  verifyActivitySubmission(submissionId: string, verifiedBy: string, result: string, confidence?: number): Promise<ActivitySubmission>;
  generateMissionFromTemplate(templateId: string, variables?: Record<string, any>): Promise<PlanetMission>;
  
  // B2B Wholesale Inventory System
  // Inventory sources
  getInventorySources(): Promise<InventorySource[]>;
  getInventorySource(id: string): Promise<InventorySource | undefined>;
  getInventorySourceByCode(code: string): Promise<InventorySource | undefined>;
  createInventorySource(source: InsertInventorySource): Promise<InventorySource>;
  updateInventorySource(id: string, updates: Partial<InventorySource>): Promise<InventorySource | undefined>;
  
  // Inventory uploads
  getInventoryUploads(sourceId?: string): Promise<InventoryUpload[]>;
  getInventoryUpload(id: string): Promise<InventoryUpload | undefined>;
  createInventoryUpload(upload: InsertInventoryUpload): Promise<InventoryUpload>;
  updateInventoryUpload(id: string, updates: Partial<InventoryUpload>): Promise<InventoryUpload | undefined>;
  
  // Wholesale inventory
  getWholesaleInventory(filters?: { sourceId?: string; brand?: string; model?: string; grade?: string; isAvailable?: boolean }): Promise<WholesaleInventory[]>;
  getWholesaleInventoryItem(id: string): Promise<WholesaleInventory | undefined>;
  createWholesaleInventoryItem(item: InsertWholesaleInventory): Promise<WholesaleInventory>;
  updateWholesaleInventoryItem(id: string, updates: Partial<WholesaleInventory>): Promise<WholesaleInventory | undefined>;
  deleteWholesaleInventoryItem(id: string): Promise<boolean>;
  searchWholesaleInventory(query: string): Promise<WholesaleInventory[]>;
  
  // B2B buyers
  getB2bBuyers(filters?: { verificationStatus?: string; buyerTier?: string }): Promise<B2bBuyer[]>;
  getB2bBuyer(id: string): Promise<B2bBuyer | undefined>;
  getB2bBuyerByEmail(email: string): Promise<B2bBuyer | undefined>;
  createB2bBuyer(buyer: InsertB2bBuyer): Promise<B2bBuyer>;
  updateB2bBuyer(id: string, updates: Partial<B2bBuyer>): Promise<B2bBuyer | undefined>;
  
  // ChainTrack membership tiers
  getChaintrackMembershipTiers(): Promise<ChaintrackMembershipTier[]>;
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
  private orders: Map<string, Order>;
  private customers: Map<string, Customer>;
  
  // Tombola Gamification System
  private tombolaPrizes: Map<string, TombolaPrize>;
  private tombolaSpins: Map<string, TombolaSpin>;
  private tombolaConfig: TombolaConfig;
  private couponTemplates: Map<string, CouponTemplate>;
  private issuedCoupons: Map<string, IssuedCoupon>;
  private heroSpinCounts: Map<string, HeroSpinCount>;

  // METAVERSE GAMING SYSTEM - Ultimate Planet Missions
  private planetMissions: Map<string, PlanetMission>;
  private heroMissionProgress: Map<string, HeroMissionProgress>;
  private planetPointsLedger: Map<string, PlanetPointsTransaction>;
  private metaverseAvatars: Map<string, MetaverseAvatar>;
  private achievementBadges: Map<string, AchievementBadge>;
  private heroBadges: Map<string, HeroBadge>;
  private metaverseRewards: Map<string, MetaverseReward>;
  private rewardRedemptions: Map<string, RewardRedemption>;
  private dailyQuests: Map<string, DailyQuest>;
  private wellnessPassports: Map<string, WellnessPassport>;

  // Comprehensive Dubai Wellness Journey System
  private wellnessJourneys: Map<string, WellnessJourney>;
  private wellnessJourneySteps: Map<string, WellnessJourneyStep>;
  private aquaShowPerks: Map<string, AquaShowPerk>;
  private luxuryHotelPartners: Map<string, LuxuryHotelPartner>;
  private restaurantPartners: Map<string, RestaurantPartner>;
  private wellnessJourneyParticipants: Map<string, WellnessJourneyParticipant>;

  // Global Sustainability Framework
  private cities: Map<string, City>;
  private seasons: Map<string, Season>;
  private activitySubmissions: Map<string, ActivitySubmission>;
  private verificationEvents: Map<string, VerificationEvent>;
  private globalPartners: Map<string, GlobalPartner>;
  private aiMissionTemplates: Map<string, AiMissionTemplate>;
  private environmentStates: Map<string, EnvironmentState>;
  private leaderboardSnapshots: Map<string, LeaderboardSnapshot>;

  // B2B Wholesale Inventory System
  private inventorySources: Map<string, InventorySource>;
  private inventoryUploads: Map<string, InventoryUpload>;
  private wholesaleInventory: Map<string, WholesaleInventory>;
  private b2bBuyers: Map<string, B2bBuyer>;

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
    this.orders = new Map();
    this.customers = new Map();
    
    // Initialize tombola system
    this.tombolaPrizes = new Map();
    this.tombolaSpins = new Map();
    this.couponTemplates = new Map();
    this.issuedCoupons = new Map();
    this.heroSpinCounts = new Map();
    
    // Initialize metaverse gaming system
    this.planetMissions = new Map();
    this.heroMissionProgress = new Map();
    this.planetPointsLedger = new Map();
    this.metaverseAvatars = new Map();
    this.achievementBadges = new Map();
    this.heroBadges = new Map();
    this.metaverseRewards = new Map();
    this.rewardRedemptions = new Map();
    this.dailyQuests = new Map();
    this.wellnessPassports = new Map();

    // Initialize wellness journey system
    this.wellnessJourneys = new Map();
    this.wellnessJourneySteps = new Map();
    this.aquaShowPerks = new Map();
    this.luxuryHotelPartners = new Map();
    this.restaurantPartners = new Map();
    this.wellnessJourneyParticipants = new Map();
    
    // Initialize global sustainability framework
    this.cities = new Map();
    this.seasons = new Map();
    this.activitySubmissions = new Map();
    this.verificationEvents = new Map();
    this.globalPartners = new Map();
    this.aiMissionTemplates = new Map();
    this.environmentStates = new Map();
    this.leaderboardSnapshots = new Map();
    
    // Initialize B2B wholesale inventory system
    this.inventorySources = new Map();
    this.inventoryUploads = new Map();
    this.wholesaleInventory = new Map();
    this.b2bBuyers = new Map();
    
    // Initialize impact stats
    this.impactStats = {
      id: randomUUID(),
      totalBottlesPrevented: 847392,
      totalCo2Saved: 423700, // in grams (423.7 tons)
      totalRewards: 89200000, // AED 892K in fils
      activeHeroes: 12847,
      updatedAt: new Date(),
    };

    // Initialize tombola config
    this.tombolaConfig = {
      id: randomUUID(),
      dailyFreeSpins: 3,
      pityThreshold: 20,
      spinCooldown: 300,
      isActive: true,
      updatedAt: new Date(),
    };

    // Seed some initial heroes for the leaderboard
    this.seedInitialData();
    this.seedDubaiRewardsData();
    this.seedSponsorshipData();
    this.seedTombolaData();
    this.seedMetaverseGamingData();
    this.seedGlobalSustainabilityData();
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
        cityHome: "dubai",
        citiesParticipating: ["dubai"],
        waterStreak: 15,
        energyStreak: 12,
        wasteStreak: 8,
        mobilityStreak: 10,
        loyaltyTier: "ambassador",
        dataSharingConsent: true,
        globalReferralCode: "KHALID-ECO23",
        totalGlobalImpact: 7870,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
        cityHome: "dubai",
        citiesParticipating: ["dubai"],
        waterStreak: 8,
        energyStreak: 10,
        wasteStreak: 6,
        mobilityStreak: 7,
        loyaltyTier: "platinum",
        dataSharingConsent: true,
        globalReferralCode: "AMIRA-TECH20",
        totalGlobalImpact: 7336,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
        cityHome: "dubai",
        citiesParticipating: ["dubai"],
        waterStreak: 6,
        energyStreak: 9,
        wasteStreak: 5,
        mobilityStreak: 8,
        loyaltyTier: "gold",
        dataSharingConsent: true,
        globalReferralCode: "OMAR-GREEN15",
        totalGlobalImpact: 6234,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
        cityHome: "dubai",
        citiesParticipating: ["dubai"],
        waterStreak: 7,
        energyStreak: 8,
        wasteStreak: 6,
        mobilityStreak: 9,
        loyaltyTier: "gold",
        dataSharingConsent: true,
        globalReferralCode: "FATIMA-IMPACT14",
        totalGlobalImpact: 5683,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
        cityHome: "dubai",
        citiesParticipating: ["dubai"],
        waterStreak: 5,
        energyStreak: 7,
        wasteStreak: 4,
        mobilityStreak: 6,
        loyaltyTier: "gold",
        dataSharingConsent: true,
        globalReferralCode: "MOHAMMED-BUILD12",
        totalGlobalImpact: 4962,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
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
      },
      {
        id: "challenge-dubai-marathon",
        title: "Dubai Marathon Planet Heroes Challenge",
        description: "Join the Dubai Marathon as a Planet Hero ambassador - Register, train sustainably, and represent AquaCafe wellness on Sheikh Zayed Road. Earn extra points for sustainable training practices and community engagement.",
        category: "wellness",
        targetZone: "Sheikh Zayed Road",
        pointsReward: 2500,
        rewardItem: "Dubai Marathon Hero T-shirt + AED 200 voucher + Marathon Finisher Badge + Wellness Journey completion",
        timeLimit: 120, // 4 months preparation time
        participantLimit: 100,
        currentParticipants: 18,
        isActive: true,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // Marathon season
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
      },
      {
        id: "reward-marathon-tshirt",
        title: "Dubai Marathon Planet Hero T-Shirt",
        description: "Exclusive branded AquaCafe Planet Hero T-shirt for Dubai Marathon participants - High-performance moisture-wicking fabric with sustainability messaging",
        category: "merchandise",
        partner: "Dubai Sports Council x AquaCafe",
        value: 15000, // AED 150 value
        pointsCost: 800,
        availableQuantity: 200,
        claimedQuantity: 12,
        zoneRestriction: "Sheikh Zayed Road",
        isActive: true,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months validity
      },
      {
        id: "reward-marathon-registration",
        title: "Dubai Marathon Registration Voucher",
        description: "Full registration fee covered for Dubai Marathon participation as a Planet Hero ambassador",
        category: "experience",
        partner: "Dubai Sports Council",
        value: 50000, // AED 500 registration fee
        pointsCost: 3500,
        availableQuantity: 50,
        claimedQuantity: 3,
        zoneRestriction: "Sheikh Zayed Road",
        isActive: true,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
      {
        id: "reward-partner-water-kit",
        title: "Marathon Partner Water Support Kit",
        description: "Partner support package including branded water bottles and hydration stations for marathon athletes",
        category: "service",
        partner: "AquaCafe Community Partners",
        value: 25000, // AED 250 value
        pointsCost: 1800,
        availableQuantity: 20,
        claimedQuantity: 2,
        zoneRestriction: "Sheikh Zayed Road",
        isActive: true,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
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
        isAquaCafeLoyaltyMember: false,
        aquaCafeMembershipDate: null,
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

  // Order Management Methods
  async createOrder(orderData: InsertOrder): Promise<Order> {
    const order: Order = {
      ...orderData,
      id: orderData.id || randomUUID(),
      status: orderData.status || "pending",
      currency: orderData.currency || "aed",
      customerId: orderData.customerId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.orders.set(order.id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByCustomer(customerId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.customerId === customerId);
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, status, updatedAt: new Date() };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Customer Management Methods
  async createCustomer(customerData: InsertCustomer): Promise<Customer> {
    const customer: Customer = {
      ...customerData,
      id: randomUUID(),
      phone: customerData.phone || null,
      firstName: customerData.firstName || null,
      lastName: customerData.lastName || null,
      shopifyCustomerId: customerData.shopifyCustomerId || null,
      stripeCustomerId: customerData.stripeCustomerId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.customers.set(customer.id, customer);
    return customer;
  }

  async getCustomer(id: string): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    return Array.from(this.customers.values()).find(customer => customer.email === email);
  }

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer | undefined> {
    const customer = this.customers.get(id);
    if (!customer) return undefined;
    
    const updatedCustomer = { ...customer, ...updates, updatedAt: new Date() };
    this.customers.set(id, updatedCustomer);
    return updatedCustomer;
  }

  // Tombola Gamification System Methods
  private seedTombolaData() {
    // Seed coupon templates
    const aquaCafeCoupons: CouponTemplate[] = [
      {
        id: "aquacafe-maintenance-50",
        brand: "AquaCafe",
        title: "AED 50 Maintenance Credit",
        description: "Professional maintenance service for your AquaCafe system",
        faceValue: 5000, // in fils
        discountPercent: null,
        minPurchase: null,
        terms: "Valid for AquaCafe maintenance services only. Cannot be combined with other offers.",
        category: "maintenance",
        partnerLogo: null,
        backgroundColor: "#0066CC",
        textColor: "#FFFFFF",
        validityDays: 30,
        usageLimit: 1,
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "aquacafe-upgrade-100",
        brand: "AquaCafe",
        title: "AED 100 System Upgrade",
        description: "Upgrade credit for advanced AquaCafe features",
        faceValue: 10000, // in fils
        discountPercent: null,
        minPurchase: 20000, // minimum AED 200 purchase
        terms: "Valid for system upgrades and accessories. Minimum purchase AED 200 required.",
        category: "upgrades",
        partnerLogo: null,
        backgroundColor: "#00AA44",
        textColor: "#FFFFFF",
        validityDays: 60,
        usageLimit: 1,
        isActive: true,
        createdAt: new Date(),
      }
    ];

    // Seed tombola prizes
    const prizes: TombolaPrize[] = [
      {
        id: "prize-xp-small",
        name: "Small XP Boost",
        description: "Gain 50 experience points",
        type: "xp",
        rarity: "common",
        quantity: null,
        remainingQuantity: null,
        probability: 3000, // 30%
        xpReward: 50,
        pointsReward: 0,
        couponTemplateId: null,
        isActive: true,
        validFrom: new Date(),
        validUntil: null,
        createdAt: new Date(),
      },
      {
        id: "prize-points-medium",
        name: "Points Reward",
        description: "Earn 100 sustainability points",
        type: "points",
        rarity: "common",
        quantity: null,
        remainingQuantity: null,
        probability: 2500, // 25%
        xpReward: 0,
        pointsReward: 100,
        couponTemplateId: null,
        isActive: true,
        validFrom: new Date(),
        validUntil: null,
        createdAt: new Date(),
      },
      {
        id: "prize-coupon-maintenance",
        name: "Maintenance Coupon",
        description: "AED 50 maintenance service credit",
        type: "coupon",
        rarity: "rare",
        quantity: 100,
        remainingQuantity: 100,
        probability: 800, // 8%
        xpReward: 25,
        pointsReward: 50,
        couponTemplateId: "aquacafe-maintenance-50",
        isActive: true,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
      },
      {
        id: "prize-coupon-upgrade",
        name: "System Upgrade Coupon",
        description: "AED 100 credit for AquaCafe upgrades",
        type: "coupon",
        rarity: "epic",
        quantity: 50,
        remainingQuantity: 50,
        probability: 200, // 2%
        xpReward: 100,
        pointsReward: 200,
        couponTemplateId: "aquacafe-upgrade-100",
        isActive: true,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
      },
      {
        id: "prize-laperle-silver",
        name: "La Perle Silver Ticket",
        description: "Experience Dubai's #1 Aqua Show - Silver seating ticket",
        type: "experience",
        rarity: "rare",
        quantity: 20,
        remainingQuantity: 20,
        probability: 500, // 5%
        xpReward: 200,
        pointsReward: 300,
        couponTemplateId: null,
        isActive: true,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months validity
        createdAt: new Date(),
      },
      {
        id: "prize-laperle-gold",
        name: "La Perle Gold Ticket",
        description: "Premium Aqua Show experience - Gold seating with refreshments",
        type: "experience",
        rarity: "epic",
        quantity: 10,
        remainingQuantity: 10,
        probability: 100, // 1%
        xpReward: 500,
        pointsReward: 750,
        couponTemplateId: null,
        isActive: true,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months validity
        createdAt: new Date(),
      },
      {
        id: "prize-laperle-vip",
        name: "La Perle VIP Experience",
        description: "Ultimate Aqua Show experience - VIP seating, backstage tour & dinner",
        type: "experience",
        rarity: "legendary",
        quantity: 2,
        remainingQuantity: 2,
        probability: 50, // 0.5%
        xpReward: 1000,
        pointsReward: 1500,
        couponTemplateId: null,
        isActive: true,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year validity
        createdAt: new Date(),
      }
    ];

    aquaCafeCoupons.forEach(coupon => this.couponTemplates.set(coupon.id, coupon));
    prizes.forEach(prize => this.tombolaPrizes.set(prize.id, prize));
  }

  async getTombolaConfig(): Promise<TombolaConfig> {
    return this.tombolaConfig;
  }

  async updateTombolaConfig(config: Partial<TombolaConfig>): Promise<TombolaConfig> {
    this.tombolaConfig = {
      ...this.tombolaConfig,
      ...config,
      updatedAt: new Date(),
    };
    return this.tombolaConfig;
  }

  async getTombolaPrizes(): Promise<TombolaPrize[]> {
    return Array.from(this.tombolaPrizes.values()).filter(prize => prize.isActive);
  }

  async getTombolaPrize(id: string): Promise<TombolaPrize | undefined> {
    return this.tombolaPrizes.get(id);
  }

  async createTombolaPrize(insertPrize: InsertTombolaPrize): Promise<TombolaPrize> {
    const id = randomUUID();
    const prize: TombolaPrize = {
      id,
      ...insertPrize,
      remainingQuantity: insertPrize.quantity,
      isActive: true,
      createdAt: new Date(),
    };
    
    this.tombolaPrizes.set(id, prize);
    return prize;
  }

  async updateTombolaPrize(id: string, updates: Partial<TombolaPrize>): Promise<TombolaPrize | undefined> {
    const prize = this.tombolaPrizes.get(id);
    if (!prize) return undefined;

    const updatedPrize: TombolaPrize = {
      ...prize,
      ...updates,
    };

    this.tombolaPrizes.set(id, updatedPrize);
    return updatedPrize;
  }

  async getHeroSpinCount(heroId: string): Promise<HeroSpinCount> {
    let spinCount = this.heroSpinCounts.get(heroId);
    
    if (!spinCount) {
      spinCount = {
        id: randomUUID(),
        heroId,
        dailySpinsUsed: 0,
        totalSpins: 0,
        lastSpinDate: null,
        pityCounter: 0,
        lastResetDate: new Date(),
        updatedAt: new Date(),
      };
      this.heroSpinCounts.set(heroId, spinCount);
    }

    // Check if we need to reset daily spins
    const now = new Date();
    const lastReset = new Date(spinCount.lastResetDate);
    
    if (now.getDate() !== lastReset.getDate() || 
        now.getMonth() !== lastReset.getMonth() || 
        now.getFullYear() !== lastReset.getFullYear()) {
      spinCount = {
        ...spinCount,
        dailySpinsUsed: 0,
        lastResetDate: now,
        updatedAt: now,
      };
      this.heroSpinCounts.set(heroId, spinCount);
    }

    return spinCount;
  }

  async updateHeroSpinCount(heroId: string, updates: Partial<HeroSpinCount>): Promise<HeroSpinCount> {
    const spinCount = await this.getHeroSpinCount(heroId);
    const updatedSpinCount: HeroSpinCount = {
      ...spinCount,
      ...updates,
      updatedAt: new Date(),
    };

    this.heroSpinCounts.set(heroId, updatedSpinCount);
    return updatedSpinCount;
  }

  async canSpin(heroId: string): Promise<{ canSpin: boolean; reason?: string; spinsLeft?: number }> {
    const config = await this.getTombolaConfig();
    const spinCount = await this.getHeroSpinCount(heroId);
    
    if (!config.isActive) {
      return { canSpin: false, reason: "Tombola is currently disabled" };
    }

    const spinsLeft = config.dailyFreeSpins - spinCount.dailySpinsUsed;
    
    if (spinsLeft <= 0) {
      return { canSpin: false, reason: "Daily spin limit reached", spinsLeft: 0 };
    }

    // Check cooldown
    if (spinCount.lastSpinDate) {
      const timeSinceLastSpin = Date.now() - spinCount.lastSpinDate.getTime();
      const cooldownRemaining = config.spinCooldown * 1000 - timeSinceLastSpin;
      
      if (cooldownRemaining > 0) {
        return { 
          canSpin: false, 
          reason: `Cooldown active (${Math.ceil(cooldownRemaining / 1000)}s remaining)`,
          spinsLeft 
        };
      }
    }

    return { canSpin: true, spinsLeft };
  }

  async spinTombola(heroId: string, spinType: string = "free"): Promise<{ spin: TombolaSpin; prize?: TombolaPrize; coupon?: IssuedCoupon }> {
    const canSpinResult = await this.canSpin(heroId);
    
    if (!canSpinResult.canSpin) {
      throw new Error(canSpinResult.reason || "Cannot spin");
    }

    const config = await this.getTombolaConfig();
    const spinCount = await this.getHeroSpinCount(heroId);
    const prizes = await this.getTombolaPrizes();

    // Determine winning prize using weighted random selection
    let wonPrize: TombolaPrize | undefined;
    let issuedCoupon: IssuedCoupon | undefined;
    
    // Pity system - guarantee a prize after threshold
    const shouldGuaranteePrize = spinCount.pityCounter >= config.pityThreshold;
    
    if (shouldGuaranteePrize || Math.random() < 0.8) { // 80% chance to win something
      const totalWeight = prizes.reduce((sum, prize) => {
        if (prize.quantity && prize.remainingQuantity !== null && prize.remainingQuantity <= 0) {
          return sum; // Skip out of stock prizes
        }
        return sum + prize.probability;
      }, 0);

      if (totalWeight > 0) {
        let random = Math.floor(Math.random() * totalWeight);
        
        for (const prize of prizes) {
          if (prize.quantity && prize.remainingQuantity !== null && prize.remainingQuantity <= 0) {
            continue;
          }
          
          random -= prize.probability;
          if (random <= 0) {
            wonPrize = prize;
            break;
          }
        }
      }
    }

    // Create the spin record
    const spinId = randomUUID();
    const spin: TombolaSpin = {
      id: spinId,
      heroId,
      resultPrizeId: wonPrize?.id || null,
      issuedCouponId: null,
      spinType,
      xpEarned: wonPrize?.xpReward || 0,
      pointsEarned: wonPrize?.pointsReward || 0,
      createdAt: new Date(),
    };

    // Issue coupon if prize is a coupon
    if (wonPrize?.type === "coupon" && wonPrize.couponTemplateId) {
      const template = this.couponTemplates.get(wonPrize.couponTemplateId);
      if (template) {
        const couponCode = `AC${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        const expiresAt = new Date(Date.now() + template.validityDays * 24 * 60 * 60 * 1000);
        
        issuedCoupon = {
          id: randomUUID(),
          templateId: template.id,
          heroId,
          couponCode,
          status: "active",
          usedCount: 0,
          issuedAt: new Date(),
          expiresAt,
          redeemedAt: null,
          redemptionLocation: null,
        };
        
        this.issuedCoupons.set(issuedCoupon.id, issuedCoupon);
        spin.issuedCouponId = issuedCoupon.id;
      }
    }

    // Update spin counts and hero stats
    await this.updateHeroSpinCount(heroId, {
      dailySpinsUsed: spinCount.dailySpinsUsed + 1,
      totalSpins: spinCount.totalSpins + 1,
      lastSpinDate: new Date(),
      pityCounter: wonPrize ? 0 : spinCount.pityCounter + 1,
    });

    // Update hero points and XP
    if (wonPrize) {
      const hero = this.heroes.get(heroId);
      if (hero) {
        await this.updateHero(heroId, {
          points: hero.points + (wonPrize.pointsReward || 0),
        });
      }

      // Update prize quantity
      if (wonPrize.quantity && wonPrize.remainingQuantity !== null) {
        await this.updateTombolaPrize(wonPrize.id, {
          remainingQuantity: wonPrize.remainingQuantity - 1,
        });
      }
    }

    this.tombolaSpins.set(spinId, spin);
    
    return { spin, prize: wonPrize, coupon: issuedCoupon };
  }

  async getTombolaHistory(heroId: string): Promise<TombolaSpin[]> {
    return Array.from(this.tombolaSpins.values())
      .filter(spin => spin.heroId === heroId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getCouponTemplates(): Promise<CouponTemplate[]> {
    return Array.from(this.couponTemplates.values()).filter(template => template.isActive);
  }

  async getCouponTemplate(id: string): Promise<CouponTemplate | undefined> {
    return this.couponTemplates.get(id);
  }

  async createCouponTemplate(insertTemplate: InsertCouponTemplate): Promise<CouponTemplate> {
    const id = randomUUID();
    const template: CouponTemplate = {
      id,
      ...insertTemplate,
      isActive: true,
      createdAt: new Date(),
    };
    
    this.couponTemplates.set(id, template);
    return template;
  }

  async getIssuedCoupons(heroId: string): Promise<IssuedCoupon[]> {
    return Array.from(this.issuedCoupons.values())
      .filter(coupon => coupon.heroId === heroId && coupon.status !== "expired")
      .sort((a, b) => b.issuedAt.getTime() - a.issuedAt.getTime());
  }

  async getIssuedCoupon(id: string): Promise<IssuedCoupon | undefined> {
    return this.issuedCoupons.get(id);
  }

  async createIssuedCoupon(insertCoupon: InsertIssuedCoupon): Promise<IssuedCoupon> {
    const id = randomUUID();
    const issuedCoupon: IssuedCoupon = {
      id,
      templateId: insertCoupon.templateId,
      heroId: insertCoupon.heroId,
      couponCode: insertCoupon.couponCode,
      status: "active",
      usedCount: 0,
      issuedAt: new Date(),
      expiresAt: insertCoupon.expiresAt,
      redeemedAt: null,
      redemptionLocation: null,
    };

    this.issuedCoupons.set(id, issuedCoupon);
    return issuedCoupon;
  }

  async redeemCoupon(redemption: RedeemCoupon): Promise<IssuedCoupon | undefined> {
    const coupon = Array.from(this.issuedCoupons.values())
      .find(c => c.couponCode === redemption.couponCode && c.heroId === redemption.heroId);
    
    if (!coupon) {
      throw new Error("Coupon not found");
    }

    if (coupon.status !== "active") {
      throw new Error("Coupon is not active");
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      throw new Error("Coupon has expired");
    }

    const template = this.couponTemplates.get(coupon.templateId);
    if (!template) {
      throw new Error("Coupon template not found");
    }

    if (coupon.usedCount >= template.usageLimit) {
      throw new Error("Coupon usage limit exceeded");
    }

    const updatedCoupon: IssuedCoupon = {
      ...coupon,
      status: coupon.usedCount + 1 >= template.usageLimit ? "redeemed" : "active",
      usedCount: coupon.usedCount + 1,
      redeemedAt: new Date(),
      redemptionLocation: redemption.redemptionLocation || null,
    };

    this.issuedCoupons.set(coupon.id, updatedCoupon);
    return updatedCoupon;
  }

  // ============================================================================
  // METAVERSE GAMING SYSTEM - ULTIMATE PLANET MISSIONS
  // ============================================================================

  // PLANET MISSION OPERATIONS
  async getPlanetMissions(): Promise<PlanetMission[]> {
    return Array.from(this.planetMissions.values());
  }

  async getPlanetMission(code: string): Promise<PlanetMission | undefined> {
    return Array.from(this.planetMissions.values()).find(m => m.code === code);
  }

  async createPlanetMission(mission: InsertPlanetMission): Promise<PlanetMission> {
    const newMission: PlanetMission = {
      id: randomUUID(),
      ...mission,
      isActive: true,
      createdAt: new Date(),
    };
    this.planetMissions.set(newMission.id, newMission);
    return newMission;
  }

  // HERO MISSION PROGRESS OPERATIONS  
  async getHeroMissionProgress(heroId: string): Promise<HeroMissionProgress[]> {
    return Array.from(this.heroMissionProgress.values()).filter(p => p.heroId === heroId);
  }

  async getMissionProgress(heroId: string, missionCode: string): Promise<HeroMissionProgress | undefined> {
    return Array.from(this.heroMissionProgress.values())
      .find(p => p.heroId === heroId && p.missionCode === missionCode);
  }

  async acceptMission(heroId: string, data: AcceptMission): Promise<HeroMissionProgress> {
    const mission = await this.getPlanetMission(data.missionCode);
    if (!mission) {
      throw new Error(`Mission ${data.missionCode} not found`);
    }

    const existing = await this.getMissionProgress(heroId, data.missionCode);
    if (existing && existing.status !== 'completed') {
      throw new Error('Mission already in progress');
    }

    const progress: HeroMissionProgress = {
      id: randomUUID(),
      heroId,
      missionCode: data.missionCode,
      tradeInId: null,
      missionInstanceId: randomUUID(),
      status: 'accepted',
      currentStep: 0,
      payload: data.payload || {},
      pointsAwarded: 0,
      xpAwarded: 0,
      completionRate: 0,
      isRewarded: false,
      startedAt: new Date(),
      completedAt: null,
      rewardedAt: null,
      createdAt: new Date(),
    };

    this.heroMissionProgress.set(progress.id, progress);
    return progress;
  }

  async updateMissionProgress(heroId: string, missionInstanceId: string, data: UpdateMissionProgress): Promise<HeroMissionProgress | undefined> {
    const progress = Array.from(this.heroMissionProgress.values())
      .find(p => p.heroId === heroId && p.missionInstanceId === missionInstanceId);
    
    if (!progress) return undefined;

    const updated = {
      ...progress,
      currentStep: data.currentStep,
      payload: { ...progress.payload, ...data.payload },
      completionRate: data.completionRate || progress.completionRate,
      status: data.completionRate === 100 ? 'completed' : 'in_progress' as any,
    };

    this.heroMissionProgress.set(progress.id, updated);
    return updated;
  }

  async completeMission(heroId: string, missionInstanceId: string, data: CompleteMission): Promise<{ progress: HeroMissionProgress; pointsAwarded: number; xpAwarded: number; badgesUnlocked: string[] }> {
    const progress = Array.from(this.heroMissionProgress.values())
      .find(p => p.heroId === heroId && p.missionInstanceId === missionInstanceId);
    
    if (!progress) {
      throw new Error('Mission progress not found');
    }

    if (progress.isRewarded) {
      throw new Error('Mission already rewarded');
    }

    const mission = await this.getPlanetMission(progress.missionCode);
    if (!mission) {
      throw new Error('Mission not found');
    }

    // Calculate rewards
    const pointsAwarded = mission.basePoints * (mission.bonusMultiplier / 100);
    const xpAwarded = mission.xpReward;
    const badgesUnlocked: string[] = [];

    // Award points
    await this.awardPlanetPoints(
      heroId, 
      pointsAwarded, 
      'mission', 
      'mission', 
      progress.id, 
      `Completed mission: ${mission.title}`
    );

    // Award XP  
    const avatarResult = await this.awardXP(heroId, xpAwarded);

    // Check for achievement badges
    if (progress.missionCode === 'iphone_tradein_mission') {
      const unlockResult = await this.unlockBadge(heroId, 'first_mission');
      if (unlockResult.isNew) {
        badgesUnlocked.push('first_mission');
      }
    }

    // Update progress
    const completed = {
      ...progress,
      status: 'completed' as any,
      completionRate: 100,
      pointsAwarded,
      xpAwarded,
      isRewarded: true,
      payload: { ...progress.payload, ...data.finalPayload },
      completedAt: new Date(),
      rewardedAt: new Date(),
    };

    this.heroMissionProgress.set(progress.id, completed);

    return {
      progress: completed,
      pointsAwarded,
      xpAwarded,
      badgesUnlocked,
    };
  }

  // PLANET POINTS OPERATIONS
  async getPlanetPointsBalance(heroId: string): Promise<number> {
    const hero = await this.getHero(heroId);
    return hero?.points || 0;
  }

  async getPlanetPointsLedger(heroId: string, limit?: number): Promise<PlanetPointsTransaction[]> {
    const transactions = Array.from(this.planetPointsLedger.values())
      .filter(t => t.heroId === heroId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return limit ? transactions.slice(0, limit) : transactions;
  }

  async awardPlanetPoints(heroId: string, points: number, source: string, refType: string, refId: string, description: string): Promise<PlanetPointsTransaction> {
    const currentBalance = await this.getPlanetPointsBalance(heroId);
    const newBalance = currentBalance + points;

    // Update hero points (canonical source of truth)
    const hero = await this.getHero(heroId);
    if (hero) {
      await this.updateHero(heroId, { points: newBalance });
    }

    // Create ledger entry for audit trail
    const transaction: PlanetPointsTransaction = {
      id: randomUUID(),
      heroId,
      transactionType: 'earned',
      source,
      refType,
      refId,
      pointsDelta: points,
      balanceBefore: currentBalance,
      balanceAfter: newBalance,
      description,
      createdAt: new Date(),
    };

    this.planetPointsLedger.set(transaction.id, transaction);
    return transaction;
  }

  async spendPlanetPoints(heroId: string, points: number, source: string, refType: string, refId: string, description: string): Promise<PlanetPointsTransaction> {
    const currentBalance = await this.getPlanetPointsBalance(heroId);
    
    if (currentBalance < points) {
      throw new Error('Insufficient planet points');
    }

    const newBalance = currentBalance - points;

    // Update hero points
    const hero = await this.getHero(heroId);
    if (hero) {
      await this.updateHero(heroId, { points: newBalance });
    }

    // Create ledger entry
    const transaction: PlanetPointsTransaction = {
      id: randomUUID(),
      heroId,
      transactionType: 'spent',
      source,
      refType,
      refId,
      pointsDelta: -points,
      balanceBefore: currentBalance,
      balanceAfter: newBalance,
      description,
      createdAt: new Date(),
    };

    this.planetPointsLedger.set(transaction.id, transaction);
    return transaction;
  }

  // METAVERSE AVATAR OPERATIONS
  async getMetaverseAvatar(heroId: string): Promise<MetaverseAvatar | undefined> {
    return Array.from(this.metaverseAvatars.values()).find(a => a.heroId === heroId);
  }

  async createMetaverseAvatar(data: InsertMetaverseAvatar): Promise<MetaverseAvatar> {
    const avatar: MetaverseAvatar = {
      id: randomUUID(),
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      planetRank: 'Eco Rookie',
      specialAbilities: [],
      equippedBadges: [],
      avatarStyle: {},
      totalMissionsCompleted: 0,
      epicMissionsCompleted: 0,
      planetImpactScore: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    this.metaverseAvatars.set(avatar.id, avatar);
    return avatar;
  }

  async updateMetaverseAvatar(heroId: string, data: UpdateAvatar): Promise<MetaverseAvatar | undefined> {
    const avatar = await this.getMetaverseAvatar(heroId);
    if (!avatar) return undefined;

    const updated = {
      ...avatar,
      ...data,
      updatedAt: new Date(),
    };

    this.metaverseAvatars.set(avatar.id, updated);
    return updated;
  }

  async awardXP(heroId: string, xp: number): Promise<{ avatar: MetaverseAvatar; leveledUp: boolean; newRank?: string }> {
    let avatar = await this.getMetaverseAvatar(heroId);
    
    if (!avatar) {
      avatar = await this.createMetaverseAvatar({ 
        heroId, 
        avatarName: 'Planet Guardian',
        avatarStyle: {} 
      });
    }

    const newXP = avatar.xp + xp;
    let newLevel = avatar.level;
    let leveledUp = false;
    let newRank = avatar.planetRank;

    // Level up logic
    while (newXP >= avatar.xpToNextLevel) {
      newLevel++;
      leveledUp = true;
    }

    // Calculate XP to next level
    const xpToNextLevel = newLevel * 100; // Simple progression

    // Update rank based on level
    if (newLevel >= 10 && avatar.planetRank === 'Eco Rookie') {
      newRank = 'Planet Defender';
    } else if (newLevel >= 25 && avatar.planetRank === 'Planet Defender') {
      newRank = 'Earth Champion';
    } else if (newLevel >= 50 && avatar.planetRank === 'Earth Champion') {
      newRank = 'Galaxy Guardian';
    }

    const updatedAvatar = {
      ...avatar,
      xp: newXP,
      level: newLevel,
      xpToNextLevel,
      planetRank: newRank,
      updatedAt: new Date(),
    };

    this.metaverseAvatars.set(avatar.id, updatedAvatar);

    return {
      avatar: updatedAvatar,
      leveledUp,
      newRank: newRank !== avatar.planetRank ? newRank : undefined,
    };
  }

  // ACHIEVEMENT BADGE OPERATIONS
  async getAchievementBadges(): Promise<AchievementBadge[]> {
    return Array.from(this.achievementBadges.values());
  }

  async getAchievementBadge(code: string): Promise<AchievementBadge | undefined> {
    return Array.from(this.achievementBadges.values()).find(b => b.code === code);
  }

  async createAchievementBadge(badge: InsertAchievementBadge): Promise<AchievementBadge> {
    const newBadge: AchievementBadge = {
      id: randomUUID(),
      ...badge,
      isActive: true,
      createdAt: new Date(),
    };
    this.achievementBadges.set(newBadge.id, newBadge);
    return newBadge;
  }

  // HERO BADGE OPERATIONS
  async getHeroBadges(heroId: string): Promise<HeroBadge[]> {
    return Array.from(this.heroBadges.values()).filter(b => b.heroId === heroId);
  }

  async unlockBadge(heroId: string, badgeCode: string): Promise<{ badge: HeroBadge; isNew: boolean }> {
    // Check if already unlocked
    const existing = Array.from(this.heroBadges.values())
      .find(b => b.heroId === heroId && b.badgeCode === badgeCode);
    
    if (existing) {
      return { badge: existing, isNew: false };
    }

    const heroBadge: HeroBadge = {
      id: randomUUID(),
      heroId,
      badgeCode,
      unlockedAt: new Date(),
      isEquipped: false,
      celebrationShown: false,
    };

    this.heroBadges.set(heroBadge.id, heroBadge);
    return { badge: heroBadge, isNew: true };
  }

  async equipBadge(heroId: string, badgeCode: string): Promise<boolean> {
    const heroBadge = Array.from(this.heroBadges.values())
      .find(b => b.heroId === heroId && b.badgeCode === badgeCode);
    
    if (!heroBadge) return false;

    // Unequip all other badges first
    const heroBadges = await this.getHeroBadges(heroId);
    for (const badge of heroBadges) {
      if (badge.isEquipped) {
        this.heroBadges.set(badge.id, { ...badge, isEquipped: false });
      }
    }

    // Equip the selected badge
    this.heroBadges.set(heroBadge.id, { ...heroBadge, isEquipped: true });
    return true;
  }

  // METAVERSE REWARDS OPERATIONS
  async getMetaverseRewards(category?: string): Promise<MetaverseReward[]> {
    const rewards = Array.from(this.metaverseRewards.values())
      .filter(r => r.isActive);
    
    return category ? rewards.filter(r => r.category === category) : rewards;
  }

  async getMetaverseReward(id: string): Promise<MetaverseReward | undefined> {
    return this.metaverseRewards.get(id);
  }

  async createMetaverseReward(reward: InsertMetaverseReward): Promise<MetaverseReward> {
    const newReward: MetaverseReward = {
      id: randomUUID(),
      ...reward,
      claimedCount: 0,
      isActive: true,
      createdAt: new Date(),
    };
    this.metaverseRewards.set(newReward.id, newReward);
    return newReward;
  }

  // REWARD REDEMPTION OPERATIONS
  async redeemMetaverseReward(heroId: string, data: RedeemReward): Promise<RewardRedemption> {
    const reward = await this.getMetaverseReward(data.rewardId);
    if (!reward) {
      throw new Error('Reward not found');
    }

    if (!reward.isActive) {
      throw new Error('Reward is not available');
    }

    if (reward.stockQuantity !== null && reward.claimedCount >= reward.stockQuantity) {
      throw new Error('Reward is out of stock');
    }

    // Spend points
    await this.spendPlanetPoints(
      heroId,
      reward.pointsCost,
      'redeem',
      'reward',
      reward.id,
      `Redeemed ${reward.name}`
    );

    // Create redemption
    const redemption: RewardRedemption = {
      id: randomUUID(),
      heroId,
      rewardId: data.rewardId,
      pointsSpent: reward.pointsCost,
      status: 'pending',
      deliveryAddress: data.deliveryAddress || null,
      trackingInfo: null,
      redemptionCode: `R-${randomUUID().substring(0, 8).toUpperCase()}`,
      redeemedAt: new Date(),
      deliveredAt: null,
    };

    this.rewardRedemptions.set(redemption.id, redemption);

    // Update reward claimed count
    const updatedReward = { ...reward, claimedCount: reward.claimedCount + 1 };
    this.metaverseRewards.set(reward.id, updatedReward);

    return redemption;
  }

  async getRewardRedemptions(heroId: string): Promise<RewardRedemption[]> {
    return Array.from(this.rewardRedemptions.values())
      .filter(r => r.heroId === heroId)
      .sort((a, b) => b.redeemedAt.getTime() - a.redeemedAt.getTime());
  }

  async updateRedemptionStatus(id: string, status: string): Promise<RewardRedemption | undefined> {
    const redemption = this.rewardRedemptions.get(id);
    if (!redemption) return undefined;

    const updated = {
      ...redemption,
      status,
      deliveredAt: status === 'delivered' ? new Date() : redemption.deliveredAt,
    };

    this.rewardRedemptions.set(id, updated);
    return updated;
  }

  // DAILY QUEST OPERATIONS
  async getDailyQuests(heroId: string): Promise<DailyQuest[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return Array.from(this.dailyQuests.values())
      .filter(q => q.heroId === heroId && q.questDate >= today);
  }

  async createDailyQuest(quest: InsertDailyQuest): Promise<DailyQuest> {
    const newQuest: DailyQuest = {
      id: randomUUID(),
      ...quest,
      status: 'active',
      questDate: quest.questDate || new Date(),
      completedAt: null,
    };
    this.dailyQuests.set(newQuest.id, newQuest);
    return newQuest;
  }

  async completeDailyQuest(questId: string): Promise<DailyQuest | undefined> {
    const quest = this.dailyQuests.get(questId);
    if (!quest || quest.status === 'completed') return quest;

    // Award points
    await this.awardPlanetPoints(
      quest.heroId,
      quest.pointsReward,
      'daily_quest',
      'quest',
      questId,
      `Completed daily quest: ${quest.description}`
    );

    // Award XP
    await this.awardXP(quest.heroId, quest.xpReward);

    const updated = {
      ...quest,
      status: 'completed' as any,
      completedAt: new Date(),
    };

    this.dailyQuests.set(questId, updated);
    return updated;
  }

  async generateDailyQuests(heroId: string): Promise<DailyQuest[]> {
    const questTypes = [
      { type: 'login', description: 'Log in to continue your planet-saving journey', points: 10, xp: 5 },
      { type: 'share', description: 'Share your impact on social media', points: 25, xp: 10 },
      { type: 'trade', description: 'Complete an iPhone trade-in mission', points: 100, xp: 50 },
    ];

    const quests: DailyQuest[] = [];
    
    for (const questType of questTypes.slice(0, 2)) { // Generate 2 daily quests
      const quest = await this.createDailyQuest({
        heroId,
        questType: questType.type,
        description: questType.description,
        pointsReward: questType.points,
        xpReward: questType.xp,
        questDate: new Date(),
      });
      quests.push(quest);
    }

    return quests;
  }

  // ============================================================================
  // METAVERSE GAMING SEED DATA
  // ============================================================================
  
  private seedMetaverseGamingData() {
    // Seed planet missions
    const iphoneMission: PlanetMission = {
      id: randomUUID(),
      code: 'iphone_tradein_mission',
      title: 'iPhone Planet Rescue Mission',
      description: 'Transform your old iPhone into planet-saving power! Complete the trade-in process to earn massive planet points and unlock exclusive badges.',
      storyline: 'Every iPhone trade-in prevents 247 plastic bottles from polluting our planet and saves 2.3kg of CO2 emissions. Your old iPhone becomes a powerful weapon in the fight for Earth!',
      category: 'trade',
      difficulty: 'beginner',
      basePoints: 500,
      bonusMultiplier: 120, // 20% bonus for Dubai heroes
      xpReward: 100,
      requiredLevel: 'Bronze Hero',
      estimatedDuration: '10 minutes',
      steps: [
        { step: 1, title: 'Choose Your Device', description: 'Select your iPhone model and condition' },
        { step: 2, title: 'Get Instant Quote', description: 'Receive your trade-in value' },
        { step: 3, title: 'Complete Mission', description: 'Finalize your planet-saving trade' }
      ],
      achievements: ['first_mission', 'iphone_saver'],
      environmentalImpact: {
        bottlesPrevented: 247,
        co2SavedGrams: 2300,
        treesEquivalent: 1.2
      },
      isActive: true,
      isEpic: false,
      createdAt: new Date(),
    };
    this.planetMissions.set(iphoneMission.id, iphoneMission);

    // Seed achievement badges
    const badges: AchievementBadge[] = [
      {
        id: randomUUID(),
        code: 'first_mission',
        name: 'Mission Pioneer',
        description: 'Completed your first planet-saving mission!',
        category: 'mission',
        rarity: 'common',
        iconUrl: '/badges/first-mission.svg',
        glowEffect: 'blue',
        unlockedBy: 'iphone_tradein_mission',
        xpBonus: 25,
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        code: 'iphone_saver',
        name: 'iPhone Planet Saver',
        description: 'Rescued the planet by trading in an iPhone!',
        category: 'environmental',
        rarity: 'rare',
        iconUrl: '/badges/iphone-saver.svg',
        glowEffect: 'green',
        unlockedBy: 'iphone_tradein_mission',
        xpBonus: 50,
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        code: 'water_hero',
        name: 'Water Hero',
        description: 'Prevented 1000+ plastic bottles from polluting our oceans!',
        category: 'environmental',
        rarity: 'epic',
        iconUrl: '/badges/water-hero.svg',
        glowEffect: 'gold',
        unlockedBy: 'bottles_milestone',
        xpBonus: 100,
        isActive: true,
        createdAt: new Date(),
      },
    ];

    badges.forEach(badge => {
      this.achievementBadges.set(badge.id, badge);
    });

    // Seed metaverse rewards
    const rewards: MetaverseReward[] = [
      {
        id: randomUUID(),
        name: 'AquaCafe Premium Water System',
        description: 'Complete home water purification system with Dubai delivery',
        category: 'tech',
        subcategory: 'water_tech',
        pointsCost: 2500,
        originalValue: 599900, // AED 5,999 in fils
        discountPercent: 25,
        stockQuantity: 10,
        claimedCount: 0,
        isVirtual: false,
        isFeatured: true,
        isDubaiExclusive: true,
        imageUrl: '/rewards/aquacafe-system.jpg',
        partnerBrand: 'AquaCafe',
        deliveryInfo: 'Free delivery within Dubai, installation included',
        termsConditions: 'Valid for Dubai residents only. Installation within 3 business days.',
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: 'Dubai Mall VIP Shopping Experience',
        description: 'Personal shopping assistant + AED 500 gift card',
        category: 'experience',
        subcategory: 'lifestyle',
        pointsCost: 1500,
        originalValue: 100000, // AED 1,000 in fils
        discountPercent: 50,
        stockQuantity: 5,
        claimedCount: 0,
        isVirtual: false,
        isFeatured: true,
        isDubaiExclusive: true,
        imageUrl: '/rewards/dubai-mall-vip.jpg',
        partnerBrand: 'Dubai Mall',
        deliveryInfo: 'Experience voucher delivered via email',
        termsConditions: 'Valid for 6 months. Advance booking required.',
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: 'Limited Edition Planet Hero NFT',
        description: 'Exclusive digital collectible commemorating your impact',
        category: 'digital',
        subcategory: 'gaming',
        pointsCost: 750,
        originalValue: null,
        discountPercent: 0,
        stockQuantity: 100,
        claimedCount: 0,
        isVirtual: true,
        isFeatured: false,
        isDubaiExclusive: false,
        imageUrl: '/rewards/planet-hero-nft.jpg',
        partnerBrand: 'DeliWer Metaverse',
        deliveryInfo: 'NFT delivered to your connected wallet',
        termsConditions: 'Requires connected Web3 wallet. Non-transferable for first 30 days.',
        isActive: true,
        createdAt: new Date(),
      },
    ];

    rewards.forEach(reward => {
      this.metaverseRewards.set(reward.id, reward);
    });
  }

  // Wellness Passport operations
  async createWellnessPassport(passportData: InsertWellnessPassport): Promise<WellnessPassport> {
    const id = randomUUID();
    const referralCode = `WELLNESS${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    
    const passport: WellnessPassport = {
      id,
      phone: passportData.phone,
      referralCode,
      status: passportData.status || "active",
      stepsCompleted: passportData.stepsCompleted || [],
      currentStep: passportData.currentStep || 1,
      totalValue: passportData.totalValue || 14900,
      pointsEarned: passportData.pointsEarned || 0,
      partnerLocation: passportData.partnerLocation || "Baker's Kitchen, Mazaya Center",
      issuedAt: now,
      expiresAt,
      redeemedAt: null,
      sharedAt: null,
      createdAt: now,
    };

    this.wellnessPassports.set(id, passport);
    return passport;
  }

  async getWellnessPassport(id: string): Promise<WellnessPassport | undefined> {
    return this.wellnessPassports.get(id);
  }

  async getWellnessPassportByPhone(phone: string): Promise<WellnessPassport | undefined> {
    for (const passport of this.wellnessPassports.values()) {
      if (passport.phone === phone && passport.status === "active") {
        return passport;
      }
    }
    return undefined;
  }

  async recordShare(passportId: string): Promise<WellnessPassport | undefined> {
    const passport = this.wellnessPassports.get(passportId);
    if (!passport) return undefined;

    const updatedPassport: WellnessPassport = {
      ...passport,
      sharedAt: new Date(),
      currentStep: Math.max(passport.currentStep, 2),
      stepsCompleted: Array.from(new Set([...passport.stepsCompleted, 1])),
      pointsEarned: passport.pointsEarned + 50,
    };

    this.wellnessPassports.set(passportId, updatedPassport);
    return updatedPassport;
  }

  async progressStep(passportId: string, step: number): Promise<WellnessPassport | undefined> {
    const passport = this.wellnessPassports.get(passportId);
    if (!passport) return undefined;

    const stepPoints = { 1: 50, 2: 100, 3: 75, 4: 200 };
    const updatedPassport: WellnessPassport = {
      ...passport,
      currentStep: Math.max(passport.currentStep, step + 1),
      stepsCompleted: Array.from(new Set([...passport.stepsCompleted, step])),
      pointsEarned: passport.pointsEarned + (stepPoints[step as keyof typeof stepPoints] || 0),
    };

    this.wellnessPassports.set(passportId, updatedPassport);
    return updatedPassport;
  }

  async redeemPassport(passportId: string): Promise<WellnessPassport | undefined> {
    const passport = this.wellnessPassports.get(passportId);
    if (!passport) return undefined;

    const updatedPassport: WellnessPassport = {
      ...passport,
      status: "redeemed",
      redeemedAt: new Date(),
      currentStep: 4,
      stepsCompleted: [1, 2, 3, 4],
      pointsEarned: 425, // Total journey points
    };

    this.wellnessPassports.set(passportId, updatedPassport);
    return updatedPassport;
  }

  // Comprehensive Dubai Wellness Journey operations
  async createWellnessJourney(journey: InsertWellnessJourney): Promise<WellnessJourney> {
    const id = randomUUID();
    const now = new Date();
    
    const newJourney: WellnessJourney = {
      id,
      heroId: journey.heroId,
      wellnessPassportId: journey.wellnessPassportId,
      title: journey.title || "Dubai Wellness Journey",
      description: journey.description,
      journeyType: journey.journeyType || "premium",
      totalSteps: journey.totalSteps || 5,
      completedSteps: 0,
      currentStepId: journey.currentStepId,
      progress: 0,
      totalValueAED: journey.totalValueAED || 110000, // AED 1100 in fils
      pointsEarned: 0,
      status: "active",
      startedAt: now,
      completedAt: null,
      expiresAt: journey.expiresAt || new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    this.wellnessJourneys.set(id, newJourney);
    return newJourney;
  }

  async getWellnessJourney(id: string): Promise<WellnessJourney | undefined> {
    return this.wellnessJourneys.get(id);
  }

  async getWellnessJourneysByHero(heroId: string): Promise<WellnessJourney[]> {
    return Array.from(this.wellnessJourneys.values()).filter(
      journey => journey.heroId === heroId
    );
  }

  async updateWellnessJourneyProgress(id: string, progress: number): Promise<WellnessJourney | undefined> {
    const journey = this.wellnessJourneys.get(id);
    if (!journey) return undefined;

    const updatedJourney: WellnessJourney = {
      ...journey,
      progress: Math.min(100, Math.max(0, progress)),
      updatedAt: new Date(),
    };

    this.wellnessJourneys.set(id, updatedJourney);
    return updatedJourney;
  }

  async completeWellnessJourneyStep(journeyId: string, stepNumber: number): Promise<WellnessJourney | undefined> {
    const journey = this.wellnessJourneys.get(journeyId);
    if (!journey) return undefined;

    const updatedJourney: WellnessJourney = {
      ...journey,
      completedSteps: Math.max(journey.completedSteps, stepNumber),
      progress: Math.min(100, (stepNumber / journey.totalSteps) * 100),
      pointsEarned: journey.pointsEarned + 200, // Award points per step
      updatedAt: new Date(),
    };

    // Mark as completed if all steps are done
    if (updatedJourney.completedSteps >= journey.totalSteps) {
      updatedJourney.status = "completed";
      updatedJourney.completedAt = new Date();
    }

    this.wellnessJourneys.set(journeyId, updatedJourney);
    return updatedJourney;
  }

  // Wellness Journey Steps operations
  async createWellnessJourneyStep(step: InsertWellnessJourneyStep): Promise<WellnessJourneyStep> {
    const id = randomUUID();
    const now = new Date();

    const newStep: WellnessJourneyStep = {
      id,
      journeyId: step.journeyId,
      stepNumber: step.stepNumber,
      stepId: step.stepId,
      title: step.title,
      description: step.description,
      location: step.location,
      duration: step.duration,
      category: step.category,
      perks: step.perks || [],
      pointsReward: step.pointsReward || 0,
      isCompleted: false,
      completedAt: null,
      partnerInfo: step.partnerInfo || {},
      bookingUrl: step.bookingUrl,
      qrCodeToken: step.qrCodeToken,
      isActive: true,
      createdAt: now,
    };

    this.wellnessJourneySteps.set(id, newStep);
    return newStep;
  }

  async getWellnessJourneySteps(journeyId: string): Promise<WellnessJourneyStep[]> {
    return Array.from(this.wellnessJourneySteps.values())
      .filter(step => step.journeyId === journeyId)
      .sort((a, b) => a.stepNumber - b.stepNumber);
  }

  async getWellnessJourneyStep(id: string): Promise<WellnessJourneyStep | undefined> {
    return this.wellnessJourneySteps.get(id);
  }

  async completeJourneyStep(stepId: string): Promise<WellnessJourneyStep | undefined> {
    const step = this.wellnessJourneySteps.get(stepId);
    if (!step) return undefined;

    const updatedStep: WellnessJourneyStep = {
      ...step,
      isCompleted: true,
      completedAt: new Date(),
    };

    this.wellnessJourneySteps.set(stepId, updatedStep);
    return updatedStep;
  }

  // Aqua Show Perks operations
  async getAquaShowPerks(): Promise<AquaShowPerk[]> {
    return Array.from(this.aquaShowPerks.values()).filter(perk => perk.isActive);
  }

  async getAquaShowPerk(id: string): Promise<AquaShowPerk | undefined> {
    return this.aquaShowPerks.get(id);
  }

  async createAquaShowPerk(perk: InsertAquaShowPerk): Promise<AquaShowPerk> {
    const id = randomUUID();
    const now = new Date();

    const newPerk: AquaShowPerk = {
      id,
      perkId: perk.perkId,
      title: perk.title,
      description: perk.description,
      valueAED: perk.valueAED,
      category: perk.category,
      availableQuantity: perk.availableQuantity,
      claimedQuantity: 0,
      pointsCost: perk.pointsCost || 0,
      isWellnessJourneyPerk: perk.isWellnessJourneyPerk ?? true,
      partner: perk.partner || "La Perle by Dragone",
      location: perk.location || "Al Habtoor City",
      bookingInstructions: perk.bookingInstructions,
      termsConditions: perk.termsConditions,
      isActive: true,
      createdAt: now,
    };

    this.aquaShowPerks.set(id, newPerk);
    return newPerk;
  }

  async claimAquaShowPerk(perkId: string, heroId: string): Promise<boolean> {
    const perk = this.aquaShowPerks.get(perkId);
    if (!perk) return false;
    if (perk.availableQuantity && perk.claimedQuantity >= perk.availableQuantity) return false;

    const updatedPerk: AquaShowPerk = {
      ...perk,
      claimedQuantity: perk.claimedQuantity + 1,
    };

    this.aquaShowPerks.set(perkId, updatedPerk);
    return true;
  }

  // Luxury Hotel Partners operations
  async getLuxuryHotelPartners(): Promise<LuxuryHotelPartner[]> {
    return Array.from(this.luxuryHotelPartners.values()).filter(hotel => hotel.isActive);
  }

  async getLuxuryHotelPartner(id: string): Promise<LuxuryHotelPartner | undefined> {
    return this.luxuryHotelPartners.get(id);
  }

  async createLuxuryHotelPartner(partner: InsertLuxuryHotelPartner): Promise<LuxuryHotelPartner> {
    const id = randomUUID();
    const now = new Date();

    const newPartner: LuxuryHotelPartner = {
      id,
      hotelId: partner.hotelId,
      name: partner.name,
      brand: partner.brand,
      location: partner.location,
      address: partner.address,
      distanceToTrack: partner.distanceToTrack,
      amenities: partner.amenities || [],
      specialOffer: partner.specialOffer,
      wellnessPackages: partner.wellnessPackages || [],
      phone: partner.phone,
      website: partner.website,
      rating: partner.rating || 5,
      priceRange: partner.priceRange,
      isWellnessPartner: partner.isWellnessPartner ?? true,
      journeyDiscountPercent: partner.journeyDiscountPercent || 0,
      isActive: true,
      createdAt: now,
    };

    this.luxuryHotelPartners.set(id, newPartner);
    return newPartner;
  }

  async updateHotelPartner(id: string, updates: Partial<LuxuryHotelPartner>): Promise<LuxuryHotelPartner | undefined> {
    const partner = this.luxuryHotelPartners.get(id);
    if (!partner) return undefined;

    const updatedPartner: LuxuryHotelPartner = {
      ...partner,
      ...updates,
    };

    this.luxuryHotelPartners.set(id, updatedPartner);
    return updatedPartner;
  }

  // Restaurant Partners operations
  async getRestaurantPartners(): Promise<RestaurantPartner[]> {
    return Array.from(this.restaurantPartners.values()).filter(restaurant => restaurant.isActive);
  }

  async getRestaurantPartner(id: string): Promise<RestaurantPartner | undefined> {
    return this.restaurantPartners.get(id);
  }

  async getRestaurantPartnerByRestaurantId(restaurantId: string): Promise<RestaurantPartner | undefined> {
    for (const partner of this.restaurantPartners.values()) {
      if (partner.restaurantId === restaurantId && partner.isActive) {
        return partner;
      }
    }
    return undefined;
  }

  async createRestaurantPartner(partner: InsertRestaurantPartner): Promise<RestaurantPartner> {
    const id = randomUUID();
    const now = new Date();

    const newPartner: RestaurantPartner = {
      id,
      restaurantId: partner.restaurantId,
      name: partner.name,
      cuisine: partner.cuisine,
      location: partner.location,
      address: partner.address,
      phone: partner.phone,
      website: partner.website,
      rating: partner.rating || 45,
      priceRange: partner.priceRange,
      specialOffer: partner.specialOffer,
      wellnessMenuItems: partner.wellnessMenuItems || [],
      loyaltyDiscountPercent: partner.loyaltyDiscountPercent || 0,
      partnerCategory: partner.partnerCategory || "dining",
      pointsMultiplier: partner.pointsMultiplier || 1,
      isWellnessPartner: partner.isWellnessPartner || false,
      isActive: true,
      createdAt: now,
    };

    this.restaurantPartners.set(id, newPartner);
    return newPartner;
  }

  async updateRestaurantPartner(id: string, updates: Partial<RestaurantPartner>): Promise<RestaurantPartner | undefined> {
    const partner = this.restaurantPartners.get(id);
    if (!partner) return undefined;

    const updatedPartner: RestaurantPartner = {
      ...partner,
      ...updates,
    };

    this.restaurantPartners.set(id, updatedPartner);
    return updatedPartner;
  }

  // Wellness Journey Participants operations
  async createWellnessJourneyParticipant(participant: InsertWellnessJourneyParticipant): Promise<WellnessJourneyParticipant> {
    const id = randomUUID();
    const now = new Date();

    const newParticipant: WellnessJourneyParticipant = {
      id,
      journeyId: participant.journeyId,
      heroId: participant.heroId,
      currentStep: participant.currentStep || 1,
      stepsCompleted: participant.stepsCompleted || [],
      perksRedeemed: participant.perksRedeemed || [],
      totalPointsEarned: 0,
      hotelPartnerId: participant.hotelPartnerId,
      preferredRestaurants: participant.preferredRestaurants || [],
      specialRequests: participant.specialRequests,
      status: "active",
      joinedAt: now,
      completedAt: null,
      lastActivityAt: now,
    };

    this.wellnessJourneyParticipants.set(id, newParticipant);
    return newParticipant;
  }

  async getWellnessJourneyParticipant(id: string): Promise<WellnessJourneyParticipant | undefined> {
    return this.wellnessJourneyParticipants.get(id);
  }

  async getParticipantsByJourney(journeyId: string): Promise<WellnessJourneyParticipant[]> {
    return Array.from(this.wellnessJourneyParticipants.values())
      .filter(participant => participant.journeyId === journeyId);
  }

  async getParticipantsByHero(heroId: string): Promise<WellnessJourneyParticipant[]> {
    return Array.from(this.wellnessJourneyParticipants.values())
      .filter(participant => participant.heroId === heroId);
  }

  async updateParticipantProgress(id: string, updates: Partial<WellnessJourneyParticipant>): Promise<WellnessJourneyParticipant | undefined> {
    const participant = this.wellnessJourneyParticipants.get(id);
    if (!participant) return undefined;

    const updatedParticipant: WellnessJourneyParticipant = {
      ...participant,
      ...updates,
      lastActivityAt: new Date(),
    };

    this.wellnessJourneyParticipants.set(id, updatedParticipant);
    return updatedParticipant;
  }

  // ============================================================================
  // GLOBAL SUSTAINABILITY FRAMEWORK IMPLEMENTATIONS
  // ============================================================================

  private seedGlobalSustainabilityData() {
    // Seed Dubai as the pilot city
    const dubaiCity: City = {
      id: "dubai",
      name: "Dubai",
      country: "UAE",
      timezone: "Asia/Dubai",
      currency: "AED",
      language: "en",
      brandTheme: { primary: "#1e40af", secondary: "#06b6d4" },
      localPartners: [],
      governmentContact: "sustainability@dubai.gov.ae",
      populationSize: 3600000,
      sustainabilityGoals: {
        waterReduction: 30,
        energyEfficiency: 25,
        wasteReduction: 40,
        mobilityImprovement: 35
      },
      baselineMetrics: {
        bottlesPrevented: 847392,
        co2Saved: 423700,
        activeParticipants: 12847
      },
      isActive: true,
      launchDate: new Date("2024-01-01"),
      nextCityToInspire: "singapore",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.cities.set(dubaiCity.id, dubaiCity);

    // Seed current water season
    const waterSeason: Season = {
      id: "dubai-2025-water",
      name: "Dubai 2025 Water Conservation Season", 
      cityId: "dubai",
      theme: "water",
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-12-31"),
      registrationDeadline: new Date("2025-11-30"),
      participationGoal: 50000,
      environmentalGoals: {
        bottlesPrevented: 2000000,
        waterSaved: 500000000,
        participantsTarget: 50000
      },
      rewards: [
        { tier: "bronze", requirement: 10, reward: "Water Hero Badge" },
        { tier: "gold", requirement: 100, reward: "Canal Journey Access" }
      ],
      heroImageUrl: "/assets/dubai-water-season.jpg",
      campaignDescription: "Join Dubai's water conservation mission to protect our precious resources",
      socialHashtags: ["#DubaiWater2025", "#AquaCafe", "#SustainableDubai"],
      isActive: true,
      createdAt: new Date(),
    };
    this.seasons.set(waterSeason.id, waterSeason);
  }

  // Cities management
  async getCities(): Promise<City[]> {
    return Array.from(this.cities.values());
  }

  async getCity(id: string): Promise<City | undefined> {
    return this.cities.get(id);
  }

  async createCity(city: InsertCity): Promise<City> {
    const newCity: City = {
      ...city,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.cities.set(newCity.id, newCity);
    return newCity;
  }

  async updateCity(id: string, updates: Partial<City>): Promise<City | undefined> {
    const city = this.cities.get(id);
    if (!city) return undefined;
    
    const updatedCity: City = {
      ...city,
      ...updates,
      updatedAt: new Date(),
    };
    this.cities.set(id, updatedCity);
    return updatedCity;
  }

  // Seasons management
  async getSeasons(): Promise<Season[]> {
    return Array.from(this.seasons.values());
  }

  async getSeason(id: string): Promise<Season | undefined> {
    return this.seasons.get(id);
  }

  async getSeasonsByCity(cityId: string): Promise<Season[]> {
    return Array.from(this.seasons.values()).filter(s => s.cityId === cityId);
  }

  async getActiveSeasons(): Promise<Season[]> {
    const now = new Date();
    return Array.from(this.seasons.values()).filter(s => 
      s.isActive && s.startDate <= now && s.endDate >= now
    );
  }

  async createSeason(season: InsertSeason): Promise<Season> {
    const newSeason: Season = {
      ...season,
      createdAt: new Date(),
    };
    this.seasons.set(newSeason.id, newSeason);
    return newSeason;
  }

  async updateSeason(id: string, updates: Partial<Season>): Promise<Season | undefined> {
    const season = this.seasons.get(id);
    if (!season) return undefined;
    
    const updatedSeason: Season = { ...season, ...updates };
    this.seasons.set(id, updatedSeason);
    return updatedSeason;
  }

  // Activity submissions (core real-world verification)
  async getActivitySubmissions(heroId?: string): Promise<ActivitySubmission[]> {
    let submissions = Array.from(this.activitySubmissions.values());
    if (heroId) {
      submissions = submissions.filter(s => s.heroId === heroId);
    }
    return submissions.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  async getActivitySubmission(id: string): Promise<ActivitySubmission | undefined> {
    return this.activitySubmissions.get(id);
  }

  async getSubmissionsByMission(missionCode: string): Promise<ActivitySubmission[]> {
    return Array.from(this.activitySubmissions.values())
      .filter(s => s.missionCode === missionCode)
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  async getSubmissionsByCity(cityId: string): Promise<ActivitySubmission[]> {
    return Array.from(this.activitySubmissions.values())
      .filter(s => s.cityId === cityId)
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  async createActivitySubmission(submission: InsertActivitySubmission): Promise<ActivitySubmission> {
    const newSubmission: ActivitySubmission = {
      id: randomUUID(),
      ...submission,
      submittedAt: new Date(),
      verifiedAt: null,
    };
    this.activitySubmissions.set(newSubmission.id, newSubmission);
    return newSubmission;
  }

  async updateActivitySubmission(id: string, updates: Partial<ActivitySubmission>): Promise<ActivitySubmission | undefined> {
    const submission = this.activitySubmissions.get(id);
    if (!submission) return undefined;
    
    const updatedSubmission: ActivitySubmission = { ...submission, ...updates };
    this.activitySubmissions.set(id, updatedSubmission);
    return updatedSubmission;
  }

  // Enhanced mission operations with verification
  async submitMissionActivity(heroId: string, missionCode: string, submissionData: InsertActivitySubmission): Promise<{ submission: ActivitySubmission; verified: boolean; pointsAwarded: number; }> {
    const mission = await this.getPlanetMission(missionCode);
    if (!mission) {
      throw new Error(`Mission ${missionCode} not found`);
    }

    // Create activity submission
    const submission = await this.createActivitySubmission({
      ...submissionData,
      heroId,
      missionCode,
      status: "pending",
    });

    // Simple auto-verification for certain types
    let verified = false;
    let pointsAwarded = 0;

    if (submissionData.submissionType === "qr_scan" || submissionData.submissionType === "partner_api") {
      // Auto-verify QR codes and partner API submissions
      verified = true;
      pointsAwarded = mission.basePoints || 200;
      
      await this.updateActivitySubmission(submission.id, {
        status: "verified",
        verifiedBy: "auto",
        verificationScore: 100,
        pointsAwarded,
        verifiedAt: new Date(),
      });

      // Award points to hero
      await this.awardPlanetPoints(
        heroId, 
        pointsAwarded, 
        "mission_completion", 
        "activity_submission", 
        submission.id, 
        `Completed mission: ${mission.title}`
      );
    }

    return { 
      submission: await this.getActivitySubmission(submission.id) as ActivitySubmission, 
      verified, 
      pointsAwarded 
    };
  }

  async verifyActivitySubmission(submissionId: string, verifiedBy: string, result: string, confidence?: number): Promise<ActivitySubmission> {
    const submission = this.activitySubmissions.get(submissionId);
    if (!submission) {
      throw new Error("Submission not found");
    }

    const isApproved = result === "approved";
    const pointsToAward = isApproved ? (submission.pointsAwarded || 200) : 0;

    const updatedSubmission: ActivitySubmission = {
      ...submission,
      status: isApproved ? "verified" : "rejected",
      verifiedBy,
      verificationScore: confidence || 85,
      verifiedAt: new Date(),
      pointsAwarded: pointsToAward,
    };

    this.activitySubmissions.set(submissionId, updatedSubmission);

    // Award points if approved
    if (isApproved && pointsToAward > 0) {
      const mission = await this.getPlanetMission(submission.missionCode);
      await this.awardPlanetPoints(
        submission.heroId,
        pointsToAward,
        "mission_verification",
        "activity_submission", 
        submissionId,
        `Verified mission: ${mission?.title}`
      );
    }

    // Create verification event
    await this.createVerificationEvent({
      submissionId,
      eventType: "manual_review",
      result,
      confidence: confidence || 85,
      details: { verifiedBy, timestamp: new Date() },
      verifierInfo: { type: "manual", id: verifiedBy },
    });

    return updatedSubmission;
  }

  // Verification events
  async getVerificationEvents(submissionId?: string): Promise<VerificationEvent[]> {
    let events = Array.from(this.verificationEvents.values());
    if (submissionId) {
      events = events.filter(e => e.submissionId === submissionId);
    }
    return events.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createVerificationEvent(event: InsertVerificationEvent): Promise<VerificationEvent> {
    const newEvent: VerificationEvent = {
      id: randomUUID(),
      ...event,
      createdAt: new Date(),
    };
    this.verificationEvents.set(newEvent.id, newEvent);
    return newEvent;
  }

  // Placeholder implementations for remaining interface methods
  async getGlobalPartners(cityId?: string): Promise<GlobalPartner[]> { return []; }
  async getGlobalPartner(id: string): Promise<GlobalPartner | undefined> { return undefined; }
  async getPartnersByType(partnerType: string, cityId?: string): Promise<GlobalPartner[]> { return []; }
  async createGlobalPartner(partner: InsertGlobalPartner): Promise<GlobalPartner> { throw new Error("Not implemented"); }
  async updateGlobalPartner(id: string, updates: Partial<GlobalPartner>): Promise<GlobalPartner | undefined> { return undefined; }
  
  async getAiMissionTemplates(cityId?: string): Promise<AiMissionTemplate[]> { return []; }
  async getAiMissionTemplate(id: string): Promise<AiMissionTemplate | undefined> { return undefined; }
  async getTemplatesByCategory(category: string): Promise<AiMissionTemplate[]> { return []; }
  async createAiMissionTemplate(template: InsertAiMissionTemplate): Promise<AiMissionTemplate> { throw new Error("Not implemented"); }
  async updateAiMissionTemplate(id: string, updates: Partial<AiMissionTemplate>): Promise<AiMissionTemplate | undefined> { return undefined; }
  
  async getEnvironmentStates(cityId?: string, seasonId?: string): Promise<EnvironmentState[]> { return []; }
  async getEnvironmentState(id: string): Promise<EnvironmentState | undefined> { return undefined; }
  async getEnvironmentStateByName(environmentName: string, cityId: string): Promise<EnvironmentState | undefined> { return undefined; }
  async createEnvironmentState(state: InsertEnvironmentState): Promise<EnvironmentState> { throw new Error("Not implemented"); }
  async updateEnvironmentState(id: string, updates: Partial<EnvironmentState>): Promise<EnvironmentState | undefined> { return undefined; }
  
  async getLeaderboardSnapshots(scope?: string, cityId?: string): Promise<LeaderboardSnapshot[]> { return []; }
  async getLatestSnapshot(snapshotType: string, scope: string, cityId?: string): Promise<LeaderboardSnapshot | undefined> { return undefined; }
  async createLeaderboardSnapshot(snapshot: InsertLeaderboardSnapshot): Promise<LeaderboardSnapshot> { throw new Error("Not implemented"); }
  
  async generateMissionFromTemplate(templateId: string, variables?: Record<string, any>): Promise<PlanetMission> { throw new Error("Not implemented"); }

  // B2B Wholesale Inventory System Implementations
  
  // Inventory sources
  async getInventorySources(): Promise<InventorySource[]> {
    return Array.from(this.inventorySources.values());
  }

  async getInventorySource(id: string): Promise<InventorySource | undefined> {
    return this.inventorySources.get(id);
  }

  async getInventorySourceByCode(code: string): Promise<InventorySource | undefined> {
    return Array.from(this.inventorySources.values()).find(s => s.sourceCode === code);
  }

  async createInventorySource(source: InsertInventorySource): Promise<InventorySource> {
    const newSource: InventorySource = {
      id: randomUUID(),
      ...source,
      createdAt: new Date(),
      lastSyncAt: null,
    };
    this.inventorySources.set(newSource.id, newSource);
    return newSource;
  }

  async updateInventorySource(id: string, updates: Partial<InventorySource>): Promise<InventorySource | undefined> {
    const source = this.inventorySources.get(id);
    if (!source) return undefined;
    
    const updated = { ...source, ...updates };
    this.inventorySources.set(id, updated);
    return updated;
  }

  // Inventory uploads
  async getInventoryUploads(sourceId?: string): Promise<InventoryUpload[]> {
    let uploads = Array.from(this.inventoryUploads.values());
    if (sourceId) {
      uploads = uploads.filter(u => u.sourceId === sourceId);
    }
    return uploads.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  }

  async getInventoryUpload(id: string): Promise<InventoryUpload | undefined> {
    return this.inventoryUploads.get(id);
  }

  async createInventoryUpload(upload: InsertInventoryUpload): Promise<InventoryUpload> {
    const newUpload: InventoryUpload = {
      id: randomUUID(),
      ...upload,
      uploadedAt: new Date(),
    };
    this.inventoryUploads.set(newUpload.id, newUpload);
    return newUpload;
  }

  async updateInventoryUpload(id: string, updates: Partial<InventoryUpload>): Promise<InventoryUpload | undefined> {
    const upload = this.inventoryUploads.get(id);
    if (!upload) return undefined;
    
    const updated = { ...upload, ...updates };
    this.inventoryUploads.set(id, updated);
    return updated;
  }

  // Wholesale inventory
  async getWholesaleInventory(filters?: { sourceId?: string; brand?: string; model?: string; grade?: string; isAvailable?: boolean }): Promise<WholesaleInventory[]> {
    let items = Array.from(this.wholesaleInventory.values());
    
    if (filters) {
      if (filters.sourceId) {
        items = items.filter(i => i.sourceId === filters.sourceId);
      }
      if (filters.brand) {
        items = items.filter(i => i.brand.toLowerCase().includes(filters.brand!.toLowerCase()));
      }
      if (filters.model) {
        items = items.filter(i => i.model.toLowerCase().includes(filters.model!.toLowerCase()));
      }
      if (filters.grade) {
        items = items.filter(i => i.grade === filters.grade);
      }
      if (filters.isAvailable !== undefined) {
        items = items.filter(i => i.isAvailable === filters.isAvailable);
      }
    }
    
    return items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getWholesaleInventoryItem(id: string): Promise<WholesaleInventory | undefined> {
    return this.wholesaleInventory.get(id);
  }

  async createWholesaleInventoryItem(item: InsertWholesaleInventory): Promise<WholesaleInventory> {
    const newItem: WholesaleInventory = {
      id: randomUUID(),
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.wholesaleInventory.set(newItem.id, newItem);
    return newItem;
  }

  async updateWholesaleInventoryItem(id: string, updates: Partial<WholesaleInventory>): Promise<WholesaleInventory | undefined> {
    const item = this.wholesaleInventory.get(id);
    if (!item) return undefined;
    
    const updated = { ...item, ...updates, updatedAt: new Date() };
    this.wholesaleInventory.set(id, updated);
    return updated;
  }

  async deleteWholesaleInventoryItem(id: string): Promise<boolean> {
    return this.wholesaleInventory.delete(id);
  }

  async searchWholesaleInventory(query: string): Promise<WholesaleInventory[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.wholesaleInventory.values()).filter(item => 
      item.brand.toLowerCase().includes(lowerQuery) ||
      item.model.toLowerCase().includes(lowerQuery) ||
      (item.storage && item.storage.toLowerCase().includes(lowerQuery)) ||
      (item.color && item.color.toLowerCase().includes(lowerQuery))
    );
  }

  // B2B buyers
  async getB2bBuyers(filters?: { verificationStatus?: string; buyerTier?: string }): Promise<B2bBuyer[]> {
    let buyers = Array.from(this.b2bBuyers.values());
    
    if (filters) {
      if (filters.verificationStatus) {
        buyers = buyers.filter(b => b.verificationStatus === filters.verificationStatus);
      }
      if (filters.buyerTier) {
        buyers = buyers.filter(b => b.buyerTier === filters.buyerTier);
      }
    }
    
    return buyers.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getB2bBuyer(id: string): Promise<B2bBuyer | undefined> {
    return this.b2bBuyers.get(id);
  }

  async getB2bBuyerByEmail(email: string): Promise<B2bBuyer | undefined> {
    return Array.from(this.b2bBuyers.values()).find(b => b.contactEmail === email);
  }

  async createB2bBuyer(buyer: InsertB2bBuyer): Promise<B2bBuyer> {
    const newBuyer: B2bBuyer = {
      id: randomUUID(),
      ...buyer,
      verifiedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.b2bBuyers.set(newBuyer.id, newBuyer);
    return newBuyer;
  }

  async updateB2bBuyer(id: string, updates: Partial<B2bBuyer>): Promise<B2bBuyer | undefined> {
    const buyer = this.b2bBuyers.get(id);
    if (!buyer) return undefined;
    
    const updated = { ...buyer, ...updates, updatedAt: new Date() };
    this.b2bBuyers.set(id, updated);
    return updated;
  }

  // ChainTrack membership tiers
  async getChaintrackMembershipTiers(): Promise<ChaintrackMembershipTier[]> {
    // Return hardcoded tier data with proper pricing structure
    // Note: All fees stored in basis points (50 = 0.5%), USD amounts in cents
    return [
      {
        id: '1',
        tierName: 'On-Demand',
        tierCode: 'ondemand',
        minDevicesPerMonth: 0,
        maxDevicesPerMonth: 49, // Cap at 49 to enforce tier progression
        monthlyFeeUSD: 0, // No monthly fee (in cents)
        transactionFeePercent: 50, // 0.5% general transaction fee (basis points)
        minimumMonthlyFeeUSD: 50000, // $500 minimum (in cents)
        asisAuctionAccess: false, // No ASIS auction access
        readyToShipAccess: true, // Only ready-to-ship tested stock
        asisFeePercent: null, // N/A - no ASIS access
        readyToShipFeePercent: 50, // 0.5% fee on tested stock (basis points)
        features: ['Ready-to-Ship Stock Only', '0.5% transaction fee', '$500 minimum per month', 'Browse & compare prices'],
        priority: 1,
        badgeColor: '#64748b',
        badgeText: null,
        isActive: true,
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        tierName: 'Starter',
        tierCode: 'starter',
        minDevicesPerMonth: 50,
        maxDevicesPerMonth: 249,
        monthlyFeeUSD: 0,
        transactionFeePercent: 30, // Average transaction fee (basis points)
        minimumMonthlyFeeUSD: 50000, // $500 minimum (in cents)
        asisAuctionAccess: true,
        readyToShipAccess: true,
        asisFeePercent: 30, // 0.3% fee on ASIS stock (basis points)
        readyToShipFeePercent: 50, // 0.5% fee on tested stock (basis points)
        features: ['ASIS Auction Stock Access', 'Ready-to-Ship Stock', '0.3% fee on ASIS stock', '0.5% fee on tested stock', 'Priority support'],
        priority: 2,
        badgeColor: '#a855f7',
        badgeText: 'MOST POPULAR',
        isActive: true,
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        tierName: 'Growth',
        tierCode: 'growth',
        minDevicesPerMonth: 250,
        maxDevicesPerMonth: 499,
        monthlyFeeUSD: 0,
        transactionFeePercent: 25, // Average transaction fee (basis points)
        minimumMonthlyFeeUSD: 50000, // $500 minimum (in cents)
        asisAuctionAccess: true,
        readyToShipAccess: true,
        asisFeePercent: 25, // 0.25% fee on ASIS stock (basis points)
        readyToShipFeePercent: 40, // 0.4% fee on tested stock (basis points)
        features: ['All Starter features', '0.25% fee on ASIS stock', '0.4% fee on tested stock', 'Dedicated account manager', 'Custom sourcing requests'],
        priority: 3,
        badgeColor: '#3b82f6',
        badgeText: null,
        isActive: true,
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '4',
        tierName: 'Enterprise',
        tierCode: 'enterprise',
        minDevicesPerMonth: 500,
        maxDevicesPerMonth: null, // Unlimited for enterprise
        monthlyFeeUSD: 0,
        transactionFeePercent: 20, // Average (basis points)
        minimumMonthlyFeeUSD: 50000, // $500 minimum (in cents)
        asisAuctionAccess: true,
        readyToShipAccess: true,
        asisFeePercent: 20, // Custom negotiated, starting at 0.2% (basis points)
        readyToShipFeePercent: 35, // Custom negotiated, starting at 0.35% (basis points)
        features: ['All Growth features', 'Custom negotiated rates', 'Direct auction participation', 'API integration available', 'White-glove service'],
        priority: 4,
        badgeColor: '#f59e0b',
        badgeText: null,
        isActive: true,
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}

export const storage = new MemStorage();
