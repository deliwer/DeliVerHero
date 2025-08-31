import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
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

export const updateHeroSchema = createInsertSchema(heroes).pick({
  points: true,
  level: true,
  badges: true,
  bottlesPrevented: true,
  co2Saved: true,
  referralCount: true,
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
