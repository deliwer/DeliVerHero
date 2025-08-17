import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
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
