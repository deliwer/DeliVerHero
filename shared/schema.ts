import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, index, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  address: text("address"),
  city: text("city").default("Dubai"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const heroes = pgTable("heroes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phoneModel: text("phone_model").notNull(),
  phoneCondition: text("phone_condition").notNull(),
  tradeValue: integer("trade_value").notNull(),
  points: integer("points").notNull().default(0),
  level: text("level").notNull().default("Bronze Hero"),
  badges: jsonb("badges").default([]),
  bottlesPrevented: integer("bottles_prevented").notNull().default(0),
  co2Saved: integer("co2_saved").notNull().default(0), // in grams
  referralCount: integer("referral_count").notNull().default(0),
  dubaiZone: text("dubai_zone").default("Dubai Marina"),
  rewardsEarned: jsonb("rewards_earned").default([]),
  challengesCompleted: jsonb("challenges_completed").default([]),
  sustainabilityStreak: integer("sustainability_streak").notNull().default(0),
  isAquaCafeLoyaltyMember: boolean("is_aquacafe_loyalty_member").notNull().default(false),
  aquaCafeMembershipDate: timestamp("aquacafe_membership_date"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const tradeIns = pgTable("trade_ins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull().references(() => heroes.id),
  phoneModel: text("phone_model").notNull(),
  phoneCondition: text("phone_condition").notNull(),
  tradeValue: integer("trade_value").notNull(),
  status: text("status").notNull().default("pending"), // pending, completed, cancelled
  pickupAddress: text("pickup_address"),
  pickupDate: timestamp("pickup_date"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const impactStats = pgTable("impact_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  totalBottlesPrevented: integer("total_bottles_prevented").notNull().default(0),
  totalCo2Saved: integer("total_co2_saved").notNull().default(0), // in grams
  totalRewards: integer("total_rewards").notNull().default(0), // in AED fils
  activeHeroes: integer("active_heroes").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const referrals = pgTable("referrals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  referrerId: varchar("referrer_id").notNull().references(() => heroes.id),
  refereeId: varchar("referee_id").notNull().references(() => heroes.id),
  pointsEarned: integer("points_earned").notNull().default(50),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"), // new, reviewed, responded, closed
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const quotes = pgTable("quotes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  phoneModel: text("phone_model").notNull(),
  phoneCondition: text("phone_condition").notNull(),
  estimatedValue: integer("estimated_value").notNull(),
  actualValue: integer("actual_value"),
  status: text("status").notNull().default("pending"), // pending, approved, expired, completed
  notes: text("notes"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const socialChallenges = pgTable("social_challenges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  creatorId: varchar("creator_id").notNull().references(() => heroes.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  challengeType: text("challenge_type").notNull(), // bottles_prevented, co2_saved, trade_value, points_earned
  targetValue: integer("target_value").notNull(),
  duration: integer("duration").notNull(), // in days
  pointsReward: integer("points_reward").notNull().default(100),
  participantLimit: integer("participant_limit").default(50),
  currentParticipants: integer("current_participants").notNull().default(0),
  completedParticipants: integer("completed_participants").notNull().default(0),
  shareCount: integer("share_count").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  expiresAt: timestamp("expires_at").notNull(),
});

export const challengeParticipants = pgTable("challenge_participants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  challengeId: varchar("challenge_id").notNull().references(() => socialChallenges.id),
  participantId: varchar("participant_id").notNull().references(() => heroes.id),
  status: text("status").notNull().default("active"), // active, completed, failed
  currentProgress: integer("current_progress").notNull().default(0),
  completedAt: timestamp("completed_at"),
  pointsEarned: integer("points_earned").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const socialShares = pgTable("social_shares", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sharerId: varchar("sharer_id").notNull().references(() => heroes.id),
  shareType: text("share_type").notNull(), // challenge, achievement, trade, milestone
  contentId: varchar("content_id").notNull(), // ID of the shared content
  platform: text("platform").notNull(), // whatsapp, twitter, facebook, instagram, linkedin, native
  shareUrl: text("share_url").notNull(),
  shareText: text("share_text").notNull(),
  clickCount: integer("click_count").notNull().default(0),
  referralSignups: integer("referral_signups").notNull().default(0),
  pointsEarned: integer("points_earned").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const dubaiChallenges = pgTable("dubai_challenges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // water, energy, transport, waste
  targetZone: text("target_zone"), // specific Dubai zone or null for city-wide
  pointsReward: integer("points_reward").notNull(),
  rewardItem: text("reward_item"), // specific reward description
  timeLimit: integer("time_limit"), // in days
  participantLimit: integer("participant_limit"),
  currentParticipants: integer("current_participants").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  expiresAt: timestamp("expires_at"),
});

export const dubaiRewards = pgTable("dubai_rewards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // voucher, experience, product, service
  partner: text("partner"), // Dubai business partner
  value: integer("value").notNull(), // in AED fils
  pointsCost: integer("points_cost").notNull(),
  availableQuantity: integer("available_quantity"),
  claimedQuantity: integer("claimed_quantity").notNull().default(0),
  zoneRestriction: text("zone_restriction"), // specific Dubai zone or null
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  expiresAt: timestamp("expires_at"),
});

export const sponsors = pgTable("sponsors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  organizationType: text("organization_type").notNull(), // ngo, government, corporate, foundation
  description: text("description").notNull(),
  logoUrl: text("logo_url"),
  website: text("website"),
  contactPerson: text("contact_person").notNull(),
  phone: text("phone"),
  isVerified: boolean("is_verified").notNull().default(false),
  totalFunded: integer("total_funded").notNull().default(0), // in AED fils
  missionsSponsored: integer("missions_sponsored").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// B2B Corporate Schema
export const corporateAccounts = pgTable("corporate_accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  industry: text("industry").notNull(), // financial, technology, healthcare, etc.
  website: text("website"),
  address: text("address").notNull(),
  vatNumber: text("vat_number"),
  tradeNumber: text("trade_number"),
  contactPerson: text("contact_person").notNull(),
  department: text("department").notNull(),
  employeeCount: text("employee_count").notNull(), // 1-50, 51-200, etc.
  isVerified: boolean("is_verified").notNull().default(false),
  tier: text("tier").notNull().default("basic"), // basic, plus, enterprise
  apiKey: text("api_key"),
  webhookUrl: text("webhook_url"),
  totalTradeValue: integer("total_trade_value").notNull().default(0), // in AED fils
  devicesTraded: integer("devices_traded").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const corporateUsers = pgTable("corporate_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  corporateAccountId: varchar("corporate_account_id").notNull().references(() => corporateAccounts.id),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull(), // admin, manager, user
  department: text("department").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const bulkQuotes = pgTable("bulk_quotes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  quoteNumber: text("quote_number").notNull().unique(),
  corporateAccountId: varchar("corporate_account_id").notNull().references(() => corporateAccounts.id),
  requestedById: varchar("requested_by_id").notNull().references(() => corporateUsers.id),
  deviceInventory: jsonb("device_inventory").notNull(), // Array of {type, condition, quantity, estimatedValue}
  totalDevices: integer("total_devices").notNull(),
  estimatedValue: integer("estimated_value").notNull(), // in AED fils
  finalValue: integer("final_value"), // in AED fils (after evaluation)
  status: text("status").notNull().default("pending"), // pending, under_review, approved, declined, expired
  urgency: text("urgency").notNull().default("standard"), // asap, 24h, week, month
  preferredPickup: text("preferred_pickup"),
  additionalNotes: text("additional_notes"),
  validUntil: timestamp("valid_until"),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const purchaseOrders = pgTable("purchase_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  poNumber: text("po_number").notNull().unique(),
  quoteId: varchar("quote_id").notNull().references(() => bulkQuotes.id),
  corporateAccountId: varchar("corporate_account_id").notNull().references(() => corporateAccounts.id),
  totalAmount: integer("total_amount").notNull(), // in AED fils
  status: text("status").notNull().default("pending_approval"), // pending_approval, processing, completed, cancelled
  paymentTerms: text("payment_terms").notNull().default("NET 30"), // NET 7, NET 15, NET 30
  paymentStatus: text("payment_status").notNull().default("pending"), // pending, paid, overdue
  pickupDate: timestamp("pickup_date"),
  pickupAddress: text("pickup_address").notNull(),
  pickupContact: text("pickup_contact").notNull(),
  specialInstructions: text("special_instructions"),
  estimatedDuration: text("estimated_duration"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const sponsorshipTiers = pgTable("sponsorship_tiers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // Bronze Sponsor, Silver Sponsor, Gold Sponsor, Platinum Sponsor
  minAmount: integer("min_amount").notNull(), // minimum funding in AED fils
  maxAmount: integer("max_amount"), // maximum funding in AED fils (null for unlimited)
  benefits: jsonb("benefits").notNull().default([]), // array of benefits
  badgeColor: text("badge_color").notNull().default("#666666"),
  priority: integer("priority").notNull().default(1), // higher priority gets better placement
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const sponsoredMissions = pgTable("sponsored_missions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // water, energy, transport, waste, biodiversity
  targetZone: text("target_zone"), // specific Dubai zone or null for city-wide
  fundingGoal: integer("funding_goal").notNull(), // in AED fils
  currentFunding: integer("current_funding").notNull().default(0), // in AED fils
  participantLimit: integer("participant_limit"),
  currentParticipants: integer("current_participants").notNull().default(0),
  pointsReward: integer("points_reward").notNull(),
  environmentalGoal: text("environmental_goal").notNull(), // e.g., "Save 1000 plastic bottles"
  timeLimit: integer("time_limit"), // in days
  status: text("status").notNull().default("funding"), // funding, active, completed, cancelled
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  startsAt: timestamp("starts_at"),
  expiresAt: timestamp("expires_at"),
});

export const missionSponsorships = pgTable("mission_sponsorships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sponsorId: varchar("sponsor_id").notNull().references(() => sponsors.id),
  missionId: varchar("mission_id").notNull().references(() => sponsoredMissions.id),
  tierId: varchar("tier_id").notNull().references(() => sponsorshipTiers.id),
  amount: integer("amount").notNull(), // sponsored amount in AED fils
  message: text("message"), // optional message from sponsor
  isAnonymous: boolean("is_anonymous").notNull().default(false),
  status: text("status").notNull().default("pending"), // pending, confirmed, cancelled
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// Email Campaign System
export const emailCampaigns = pgTable("email_campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  targetAudience: text("target_audience").notNull(), // corporate, consumer, all
  industry: text("industry"), // specific industry targeting
  status: text("status").notNull().default("draft"), // draft, scheduled, sent, cancelled
  scheduledAt: timestamp("scheduled_at"),
  sentAt: timestamp("sent_at"),
  totalRecipients: integer("total_recipients").notNull().default(0),
  emailsSent: integer("emails_sent").notNull().default(0),
  opensCount: integer("opens_count").notNull().default(0),
  clicksCount: integer("clicks_count").notNull().default(0),
  unsubscribes: integer("unsubscribes").notNull().default(0),
  bounces: integer("bounces").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const corporateLeads = pgTable("corporate_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  industry: text("industry").notNull(),
  deviceCount: text("device_count"),
  message: text("message"),
  source: text("source").notNull().default("cobone_landing"), // cobone_landing, direct, referral
  status: text("status").notNull().default("new"), // new, contacted, qualified, proposal_sent, closed
  priority: text("priority").notNull().default("medium"), // low, medium, high, urgent
  estimatedValue: integer("estimated_value"), // potential deal value in AED fils
  assignedTo: text("assigned_to"), // sales rep assigned
  lastContactAt: timestamp("last_contact_at"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const emailSubscribers = pgTable("email_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  companyName: text("company_name"),
  industry: text("industry"),
  subscriberType: text("subscriber_type").notNull().default("corporate"), // corporate, consumer
  isActive: boolean("is_active").notNull().default(true),
  source: text("source").notNull().default("website"), // website, manual, import
  tags: jsonb("tags").default([]),
  preferences: jsonb("preferences").default({}), // email preferences
  lastEmailAt: timestamp("last_email_at"),
  subscribedAt: timestamp("subscribed_at").notNull().default(sql`now()`),
  unsubscribedAt: timestamp("unsubscribed_at"),
});

// METAVERSE GAMING SYSTEM - Ultimate Planet Missions
export const planetMissions = pgTable("planet_missions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(), // iphone_tradein_mission, water_hero_quest
  title: text("title").notNull(),
  description: text("description").notNull(),
  storyline: text("storyline").notNull(), // epic narrative for gen z
  category: text("category").notNull(), // trade, water, energy, planet_saving
  difficulty: text("difficulty").notNull().default("beginner"), // beginner, intermediate, expert, legendary
  basePoints: integer("base_points").notNull().default(100),
  bonusMultiplier: integer("bonus_multiplier").notNull().default(100), // percentage bonus
  xpReward: integer("xp_reward").notNull().default(50),
  requiredLevel: text("required_level").default("Bronze Hero"),
  estimatedDuration: text("estimated_duration").default("5 minutes"), // "5 minutes", "1 hour", "1 day"
  steps: jsonb("steps").default([]), // mission steps with descriptions
  achievements: jsonb("achievements").default([]), // badges unlocked
  environmentalImpact: jsonb("environmental_impact").default({}), // bottles saved, co2 reduced
  isActive: boolean("is_active").notNull().default(true),
  isEpic: boolean("is_epic").notNull().default(false), // epic missions have special effects
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const heroMissionProgress = pgTable("hero_mission_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull().references(() => heroes.id),
  missionCode: text("mission_code").notNull().references(() => planetMissions.code),
  tradeInId: varchar("trade_in_id").references(() => tradeIns.id), // links mission to actual trade-in
  missionInstanceId: varchar("mission_instance_id").notNull().default(sql`gen_random_uuid()`), // for repeatable missions
  status: text("status").notNull().default("available"), // available, accepted, in_progress, completed, rewarded
  currentStep: integer("current_step").notNull().default(0),
  payload: jsonb("payload").default({}), // mission-specific data like phone model, condition
  pointsAwarded: integer("points_awarded").default(0),
  xpAwarded: integer("xp_awarded").default(0),
  completionRate: integer("completion_rate").default(0), // 0-100%
  isRewarded: boolean("is_rewarded").notNull().default(false), // prevents double rewards
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  rewardedAt: timestamp("rewarded_at"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
}, (table) => {
  return {
    heroMissionIdx: index("hero_mission_progress_hero_mission_idx").on(table.heroId, table.missionCode, table.status),
    tradeInIdx: index("hero_mission_progress_trade_in_idx").on(table.tradeInId),
    uniqueInstance: unique("hero_mission_progress_unique_instance").on(table.heroId, table.missionInstanceId),
    uniqueTradeIn: unique("hero_mission_progress_unique_trade_in").on(table.tradeInId),
    uniqueNonRepeatable: unique("hero_mission_progress_unique_non_repeatable").on(table.heroId, table.missionCode),
  };
});

export const planetPointsLedger = pgTable("planet_points_ledger", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull().references(() => heroes.id),
  transactionType: text("transaction_type").notNull(), // earned, spent, bonus, penalty
  source: text("source").notNull(), // mission, tombola, referral, redeem, daily_bonus
  refType: text("ref_type").notNull(), // mission, prize, reward, challenge
  refId: varchar("ref_id").notNull(),
  pointsDelta: integer("points_delta").notNull(), // can be negative for spending
  balanceBefore: integer("balance_before").notNull(),
  balanceAfter: integer("balance_after").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
}, (table) => {
  return {
    heroTimeIdx: index("planet_points_ledger_hero_time_idx").on(table.heroId, table.createdAt),
    sourceRefIdx: index("planet_points_ledger_source_ref_idx").on(table.source, table.refType, table.refId),
    uniqueTransaction: unique("planet_points_ledger_unique_transaction").on(table.heroId, table.refType, table.refId, table.transactionType),
  };
});

export const metaverseAvatars = pgTable("metaverse_avatars", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull().references(() => heroes.id),
  avatarName: text("avatar_name").notNull().default("Planet Guardian"),
  level: integer("level").notNull().default(1),
  xp: integer("xp").notNull().default(0),
  xpToNextLevel: integer("xp_to_next_level").notNull().default(100),
  planetRank: text("planet_rank").notNull().default("Eco Rookie"), // Eco Rookie, Planet Defender, Earth Champion, Galaxy Guardian
  specialAbilities: jsonb("special_abilities").default([]), // unlocked abilities
  equippedBadges: jsonb("equipped_badges").default([]), // currently displayed badges
  avatarStyle: jsonb("avatar_style").default({}), // customization data
  totalMissionsCompleted: integer("total_missions_completed").notNull().default(0),
  epicMissionsCompleted: integer("epic_missions_completed").notNull().default(0),
  planetImpactScore: integer("planet_impact_score").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
}, (table) => {
  return {
    uniqueHero: unique("metaverse_avatars_unique_hero").on(table.heroId), // one avatar per hero
  };
});

export const achievementBadges = pgTable("achievement_badges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(), // first_mission, iphone_saver, water_hero
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // mission, environmental, social, special
  rarity: text("rarity").notNull().default("common"), // common, rare, epic, legendary, mythic
  iconUrl: text("icon_url"),
  glowEffect: text("glow_effect").default("none"), // none, blue, green, gold, rainbow
  unlockedBy: text("unlocked_by").notNull(), // mission_code or special trigger
  xpBonus: integer("xp_bonus").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const heroBadges = pgTable("hero_badges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull().references(() => heroes.id),
  badgeCode: text("badge_code").notNull().references(() => achievementBadges.code),
  unlockedAt: timestamp("unlocked_at").notNull().default(sql`now()`),
  isEquipped: boolean("is_equipped").notNull().default(false),
  celebrationShown: boolean("celebration_shown").notNull().default(false),
}, (table) => {
  return {
    uniqueHeroBadge: unique("hero_badges_unique_hero_badge").on(table.heroId, table.badgeCode), // prevents duplicate badges
  };
});

export const metaverseRewards = pgTable("metaverse_rewards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // digital, physical, experience, tech
  subcategory: text("subcategory"), // water_tech, gaming, lifestyle, eco_friendly
  pointsCost: integer("points_cost").notNull(),
  originalValue: integer("original_value"), // in AED fils
  discountPercent: integer("discount_percent").default(0),
  stockQuantity: integer("stock_quantity").default(0),
  claimedCount: integer("claimed_count").notNull().default(0),
  isVirtual: boolean("is_virtual").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  isDubaiExclusive: boolean("is_dubai_exclusive").notNull().default(true),
  imageUrl: text("image_url"),
  partnerBrand: text("partner_brand"),
  deliveryInfo: text("delivery_info"),
  termsConditions: text("terms_conditions"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const rewardRedemptions = pgTable("reward_redemptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull().references(() => heroes.id),
  rewardId: varchar("reward_id").notNull().references(() => metaverseRewards.id),
  pointsSpent: integer("points_spent").notNull(),
  status: text("status").notNull().default("pending"), // pending, processing, delivered, completed
  deliveryAddress: text("delivery_address"),
  trackingInfo: text("tracking_info"),
  redemptionCode: text("redemption_code"),
  redeemedAt: timestamp("redeemed_at").notNull().default(sql`now()`),
  deliveredAt: timestamp("delivered_at"),
});

// Enhanced existing tables for metaverse gaming
export const dailyQuests = pgTable("daily_quests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull().references(() => heroes.id),
  questType: text("quest_type").notNull(), // login, share, trade, challenge
  description: text("description").notNull(),
  pointsReward: integer("points_reward").notNull().default(10),
  xpReward: integer("xp_reward").notNull().default(5),
  status: text("status").notNull().default("active"), // active, completed
  questDate: timestamp("quest_date").notNull().default(sql`now()`),
  completedAt: timestamp("completed_at"),
});

// AquaCafe Heroes Tombola Gamification System
export const tombolaPrizes = pgTable("tombola_prizes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // coupon, product, xp, points
  rarity: text("rarity").notNull().default("common"), // common, rare, epic, legendary
  quantity: integer("quantity"), // null for unlimited
  remainingQuantity: integer("remaining_quantity"),
  probability: integer("probability").notNull(), // out of 10000 (0.01% precision)
  xpReward: integer("xp_reward").default(0),
  pointsReward: integer("points_reward").default(0),
  couponTemplateId: varchar("coupon_template_id").references(() => couponTemplates.id),
  isActive: boolean("is_active").notNull().default(true),
  validFrom: timestamp("valid_from").notNull().default(sql`now()`),
  validUntil: timestamp("valid_until"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const tombolaSpins = pgTable("tombola_spins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull().references(() => heroes.id),
  resultPrizeId: varchar("result_prize_id").references(() => tombolaPrizes.id),
  issuedCouponId: varchar("issued_coupon_id").references(() => issuedCoupons.id),
  spinType: text("spin_type").notNull().default("free"), // free, premium, bonus
  xpEarned: integer("xp_earned").default(0),
  pointsEarned: integer("points_earned").default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const tombolaConfig = pgTable("tombola_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  dailyFreeSpins: integer("daily_free_spins").notNull().default(3),
  pityThreshold: integer("pity_threshold").notNull().default(20), // guaranteed prize after N empty spins
  spinCooldown: integer("spin_cooldown").notNull().default(300), // seconds between spins
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const couponTemplates = pgTable("coupon_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  brand: text("brand").notNull(), // AquaCafe, Partner brands
  title: text("title").notNull(),
  description: text("description").notNull(),
  faceValue: integer("face_value").notNull(), // in AED fils
  discountPercent: integer("discount_percent"), // percentage discount
  minPurchase: integer("min_purchase"), // minimum purchase required in AED fils
  terms: text("terms").notNull(),
  category: text("category").notNull(), // water_systems, maintenance, upgrades
  partnerLogo: text("partner_logo"),
  backgroundColor: text("background_color").default("#0066CC"),
  textColor: text("text_color").default("#FFFFFF"),
  validityDays: integer("validity_days").notNull().default(30),
  usageLimit: integer("usage_limit").default(1), // how many times can be used
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const issuedCoupons = pgTable("issued_coupons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  templateId: varchar("template_id").notNull().references(() => couponTemplates.id),
  heroId: varchar("hero_id").notNull().references(() => heroes.id),
  couponCode: text("coupon_code").notNull().unique(),
  status: text("status").notNull().default("active"), // active, redeemed, expired, cancelled
  usedCount: integer("used_count").notNull().default(0),
  issuedAt: timestamp("issued_at").notNull().default(sql`now()`),
  expiresAt: timestamp("expires_at").notNull(),
  redeemedAt: timestamp("redeemed_at"),
  redemptionLocation: text("redemption_location"),
});

export const heroSpinCounts = pgTable("hero_spin_counts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull().references(() => heroes.id),
  dailySpinsUsed: integer("daily_spins_used").notNull().default(0),
  totalSpins: integer("total_spins").notNull().default(0),
  lastSpinDate: timestamp("last_spin_date"),
  pityCounter: integer("pity_counter").notNull().default(0), // spins since last guaranteed prize
  lastResetDate: timestamp("last_reset_date").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// METAVERSE GAMING ZOD SCHEMAS
export const insertPlanetMissionSchema = createInsertSchema(planetMissions).pick({
  code: true,
  title: true,
  description: true,
  storyline: true,
  category: true,
  difficulty: true,
  basePoints: true,
  xpReward: true,
  requiredLevel: true,
  estimatedDuration: true,
  steps: true,
  achievements: true,
  environmentalImpact: true,
  isEpic: true,
});

export const acceptMissionSchema = z.object({
  missionCode: z.string(),
  payload: z.record(z.any()).optional(),
});

export const updateMissionProgressSchema = z.object({
  currentStep: z.number().min(0),
  payload: z.record(z.any()).optional(),
  completionRate: z.number().min(0).max(100).optional(),
});

export const completeMissionSchema = z.object({
  finalPayload: z.record(z.any()).optional(),
});

export const insertMetaverseRewardSchema = createInsertSchema(metaverseRewards).pick({
  name: true,
  description: true,
  category: true,
  subcategory: true,
  pointsCost: true,
  originalValue: true,
  discountPercent: true,
  stockQuantity: true,
  isVirtual: true,
  isFeatured: true,
  isDubaiExclusive: true,
  imageUrl: true,
  partnerBrand: true,
  deliveryInfo: true,
  termsConditions: true,
});

// Missing insert schemas for new tables
export const insertHeroMissionProgressSchema = createInsertSchema(heroMissionProgress).pick({
  heroId: true,
  missionCode: true,
  tradeInId: true,
  payload: true,
});

export const insertMetaverseAvatarSchema = createInsertSchema(metaverseAvatars).pick({
  heroId: true,
  avatarName: true,
  avatarStyle: true,
});

export const insertHeroBadgeSchema = createInsertSchema(heroBadges).pick({
  heroId: true,
  badgeCode: true,
});

export const insertPlanetPointsLedgerSchema = createInsertSchema(planetPointsLedger).pick({
  heroId: true,
  transactionType: true,
  source: true,
  refType: true,
  refId: true,
  pointsDelta: true,
  balanceBefore: true,
  balanceAfter: true,
  description: true,
});

export const insertRewardRedemptionSchema = createInsertSchema(rewardRedemptions).pick({
  heroId: true,
  rewardId: true,
  pointsSpent: true,
  deliveryAddress: true,
});

export const insertDailyQuestSchema = createInsertSchema(dailyQuests).pick({
  heroId: true,
  questType: true,
  description: true,
  pointsReward: true,
  xpReward: true,
  questDate: true,
});

export const redeemRewardSchema = z.object({
  rewardId: z.string(),
  deliveryAddress: z.string().optional(),
});

export const insertAchievementBadgeSchema = createInsertSchema(achievementBadges).pick({
  code: true,
  name: true,
  description: true,
  category: true,
  rarity: true,
  iconUrl: true,
  glowEffect: true,
  unlockedBy: true,
  xpBonus: true,
});

export const updateAvatarSchema = z.object({
  avatarName: z.string().optional(),
  avatarStyle: z.record(z.any()).optional(),
  equippedBadges: z.array(z.string()).optional(),
});

// Enhanced existing schemas for mission gaming
export type PlanetMission = typeof planetMissions.$inferSelect;
export type HeroMissionProgress = typeof heroMissionProgress.$inferSelect;
export type PlanetPointsTransaction = typeof planetPointsLedger.$inferSelect;
export type MetaverseAvatar = typeof metaverseAvatars.$inferSelect;
export type AchievementBadge = typeof achievementBadges.$inferSelect;
export type HeroBadge = typeof heroBadges.$inferSelect;
export type MetaverseReward = typeof metaverseRewards.$inferSelect;
export type RewardRedemption = typeof rewardRedemptions.$inferSelect;
export type DailyQuest = typeof dailyQuests.$inferSelect;

export type InsertPlanetMission = z.infer<typeof insertPlanetMissionSchema>;
export type AcceptMission = z.infer<typeof acceptMissionSchema>;
export type UpdateMissionProgress = z.infer<typeof updateMissionProgressSchema>;
export type CompleteMission = z.infer<typeof completeMissionSchema>;
export type InsertMetaverseReward = z.infer<typeof insertMetaverseRewardSchema>;
export type RedeemReward = z.infer<typeof redeemRewardSchema>;
export type InsertAchievementBadge = z.infer<typeof insertAchievementBadgeSchema>;
export type UpdateAvatar = z.infer<typeof updateAvatarSchema>;

// Additional insert types for complete API validation
export type InsertHeroMissionProgress = z.infer<typeof insertHeroMissionProgressSchema>;
export type InsertMetaverseAvatar = z.infer<typeof insertMetaverseAvatarSchema>;
export type InsertHeroBadge = z.infer<typeof insertHeroBadgeSchema>;
export type InsertPlanetPointsLedger = z.infer<typeof insertPlanetPointsLedgerSchema>;
export type InsertRewardRedemption = z.infer<typeof insertRewardRedemptionSchema>;
export type InsertDailyQuest = z.infer<typeof insertDailyQuestSchema>;

// Zod schemas
export const insertHeroSchema = createInsertSchema(heroes).pick({
  name: true,
  email: true,
  phoneModel: true,
  phoneCondition: true,
  tradeValue: true,
});

export const insertSponsorSchema = createInsertSchema(sponsors).pick({
  name: true,
  email: true,
  organizationType: true,
  description: true,
  logoUrl: true,
  website: true,
  contactPerson: true,
  phone: true,
});

export const insertSponsoredMissionSchema = createInsertSchema(sponsoredMissions).pick({
  title: true,
  description: true,
  category: true,
  targetZone: true,
  fundingGoal: true,
  participantLimit: true,
  pointsReward: true,
  environmentalGoal: true,
  timeLimit: true,
  startsAt: true,
  expiresAt: true,
});

export const insertMissionSponsorshipSchema = createInsertSchema(missionSponsorships).pick({
  sponsorId: true,
  missionId: true,
  tierId: true,
  amount: true,
  message: true,
  isAnonymous: true,
});

export const insertTradeInSchema = createInsertSchema(tradeIns).pick({
  heroId: true,
  phoneModel: true,
  phoneCondition: true,
  tradeValue: true,
  pickupAddress: true,
  pickupDate: true,
});

export const insertSocialChallengeSchema = createInsertSchema(socialChallenges).pick({
  creatorId: true,
  title: true,
  description: true,
  challengeType: true,
  targetValue: true,
  duration: true,
  pointsReward: true,
  participantLimit: true,
});

export const insertChallengeParticipantSchema = createInsertSchema(challengeParticipants).pick({
  challengeId: true,
  participantId: true,
});

export const insertSocialShareSchema = createInsertSchema(socialShares).pick({
  sharerId: true,
  shareType: true,
  contentId: true,
  platform: true,
  shareUrl: true,
  shareText: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  phone: true,
  company: true,
  subject: true,
  message: true,
});

export const insertQuoteSchema = createInsertSchema(quotes).pick({
  userId: true,
  phoneModel: true,
  phoneCondition: true,
  estimatedValue: true,
  notes: true,
  expiresAt: true,
});

export const insertCorporateLeadSchema = createInsertSchema(corporateLeads).pick({
  companyName: true,
  contactName: true,
  email: true,
  phone: true,
  industry: true,
  deviceCount: true,
  message: true,
  source: true,
});

export const insertEmailCampaignSchema = createInsertSchema(emailCampaigns).pick({
  name: true,
  subject: true,
  content: true,
  targetAudience: true,
  industry: true,
  scheduledAt: true,
});

export const insertEmailSubscriberSchema = createInsertSchema(emailSubscribers).pick({
  email: true,
  firstName: true,
  lastName: true,
  companyName: true,
  industry: true,
  subscriberType: true,
  source: true,
  tags: true,
});

// Tombola schemas
export const insertTombolaPrizeSchema = createInsertSchema(tombolaPrizes).pick({
  name: true,
  description: true,
  type: true,
  rarity: true,
  quantity: true,
  probability: true,
  xpReward: true,
  pointsReward: true,
  couponTemplateId: true,
  validFrom: true,
  validUntil: true,
});

export const insertTombolaSpinSchema = createInsertSchema(tombolaSpins).pick({
  heroId: true,
  spinType: true,
});

export const insertCouponTemplateSchema = createInsertSchema(couponTemplates).pick({
  brand: true,
  title: true,
  description: true,
  faceValue: true,
  discountPercent: true,
  minPurchase: true,
  terms: true,
  category: true,
  partnerLogo: true,
  backgroundColor: true,
  textColor: true,
  validityDays: true,
  usageLimit: true,
});

export const insertIssuedCouponSchema = createInsertSchema(issuedCoupons).pick({
  templateId: true,
  heroId: true,
  couponCode: true,
  expiresAt: true,
});

export const redeemCouponSchema = z.object({
  couponCode: z.string().min(1),
  heroId: z.string().min(1),
  redemptionLocation: z.string().optional(),
});

export const updateHeroSchema = createInsertSchema(heroes).pick({
  points: true,
  level: true,
  badges: true,
  bottlesPrevented: true,
  co2Saved: true,
  referralCount: true,
  isAquaCafeLoyaltyMember: true,
  aquaCafeMembershipDate: true,
}).partial();

// Types
export type InsertHero = z.infer<typeof insertHeroSchema>;
export type Hero = typeof heroes.$inferSelect;
export type InsertTradeIn = z.infer<typeof insertTradeInSchema>;
export type TradeIn = typeof tradeIns.$inferSelect;
export type ImpactStats = typeof impactStats.$inferSelect;
export type Referral = typeof referrals.$inferSelect;
export type UpdateHero = z.infer<typeof updateHeroSchema>;
export type DubaiChallenge = typeof dubaiChallenges.$inferSelect;
export type DubaiReward = typeof dubaiRewards.$inferSelect;
export type InsertSponsor = z.infer<typeof insertSponsorSchema>;
export type Sponsor = typeof sponsors.$inferSelect;
export type SponsorshipTier = typeof sponsorshipTiers.$inferSelect;
export type InsertSponsoredMission = z.infer<typeof insertSponsoredMissionSchema>;
export type SponsoredMission = typeof sponsoredMissions.$inferSelect;
export type InsertMissionSponsorship = z.infer<typeof insertMissionSponsorshipSchema>;
export type MissionSponsorship = typeof missionSponsorships.$inferSelect;
export type InsertSocialChallenge = z.infer<typeof insertSocialChallengeSchema>;
export type SocialChallenge = typeof socialChallenges.$inferSelect;
export type InsertChallengeParticipant = z.infer<typeof insertChallengeParticipantSchema>;
export type ChallengeParticipant = typeof challengeParticipants.$inferSelect;
export type InsertSocialShare = z.infer<typeof insertSocialShareSchema>;
export type SocialShare = typeof socialShares.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertQuote = z.infer<typeof insertQuoteSchema>;

// Tombola types
export type TombolaPrize = typeof tombolaPrizes.$inferSelect;
export type InsertTombolaPrize = z.infer<typeof insertTombolaPrizeSchema>;
export type TombolaSpin = typeof tombolaSpins.$inferSelect;
export type InsertTombolaSpin = z.infer<typeof insertTombolaSpinSchema>;
export type TombolaConfig = typeof tombolaConfig.$inferSelect;
export type CouponTemplate = typeof couponTemplates.$inferSelect;
export type InsertCouponTemplate = z.infer<typeof insertCouponTemplateSchema>;
export type IssuedCoupon = typeof issuedCoupons.$inferSelect;
export type InsertIssuedCoupon = z.infer<typeof insertIssuedCouponSchema>;
export type HeroSpinCount = typeof heroSpinCounts.$inferSelect;
export type RedeemCoupon = z.infer<typeof redeemCouponSchema>;

// E-commerce Order Management
export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  paymentIntentId: text("payment_intent_id").notNull(),
  customerId: varchar("customer_id"),
  customerEmail: text("customer_email").notNull(),
  amount: integer("amount").notNull(), // in fils (AED cents)
  currency: text("currency").notNull().default("aed"),
  status: text("status").notNull().default("pending"),
  items: jsonb("items").notNull(),
  billingDetails: jsonb("billing_details").notNull(),
  shippingDetails: jsonb("shipping_details").notNull(),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const customers = pgTable("customers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  shopifyCustomerId: text("shopify_customer_id"),
  stripeCustomerId: text("stripe_customer_id"),
  defaultAddress: jsonb("default_address"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  paymentIntentId: true,
  customerId: true,
  customerEmail: true,
  amount: true,
  currency: true,
  status: true,
  items: true,
  billingDetails: true,
  shippingDetails: true,
  metadata: true,
});

export const insertCustomerSchema = createInsertSchema(customers).pick({
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
  shopifyCustomerId: true,
  stripeCustomerId: true,
  defaultAddress: true,
  metadata: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type Customer = typeof customers.$inferSelect;
export type Quote = typeof quotes.$inferSelect;

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type CorporateLead = typeof corporateLeads.$inferSelect;
export type InsertCorporateLead = z.infer<typeof insertCorporateLeadSchema>;
export type EmailCampaign = typeof emailCampaigns.$inferSelect;
export type InsertEmailCampaign = z.infer<typeof insertEmailCampaignSchema>;
export type EmailSubscriber = typeof emailSubscribers.$inferSelect;
export type InsertEmailSubscriber = z.infer<typeof insertEmailSubscriberSchema>;
