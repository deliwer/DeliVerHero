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
  
  // B2B Wholesale Buyer fields
  userType: text("user_type").notNull().default("consumer"), // 'consumer' or 'b2b_buyer'
  companyName: text("company_name"),
  businessLicense: text("business_license"),
  tradeLicense: text("trade_license"),
  isB2BVerified: boolean("is_b2b_verified").notNull().default(false),
  b2bVerifiedAt: timestamp("b2b_verified_at"),
  membershipTierId: varchar("membership_tier_id").references(() => chaintrackMembershipTiers.id), // ChainTrack membership tier
  
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
  aquaCafeMembershipGiftChoice: text("aquacafe_membership_gift_choice"), // 'pizza-voucher' or 'shower-filter-referral'
  aquaCafeMembershipReferralCode: text("aquacafe_membership_referral_code"),
  isActive: boolean("is_active").notNull().default(true),
  
  // Global Sustainability Framework Enhancements
  cityHome: text("city_home").default("Dubai"), // User's primary city
  citiesParticipating: jsonb("cities_participating").default(["Dubai"]), // Array of cities they're active in
  waterStreak: integer("water_streak").notNull().default(0), // Consecutive days of water conservation
  energyStreak: integer("energy_streak").notNull().default(0), // Energy conservation streak
  wasteStreak: integer("waste_streak").notNull().default(0), // Waste reduction streak  
  mobilityStreak: integer("mobility_streak").notNull().default(0), // Sustainable transport streak
  loyaltyTier: text("loyalty_tier").notNull().default("bronze"), // bronze, silver, gold, platinum, diamond
  dataSharingConsent: boolean("data_sharing_consent").notNull().default(false), // For global impact tracking
  globalReferralCode: text("global_referral_code").unique(), // Unique code for cross-city referrals
  totalGlobalImpact: integer("total_global_impact").notNull().default(0), // Combined impact score across cities
  
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

export const wellnessPassports = pgTable("wellness_passports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  phone: text("phone").notNull(),
  referralCode: text("referral_code").notNull().unique(),
  status: text("status").notNull().default("active"), // active, redeemed, expired
  stepsCompleted: jsonb("steps_completed").notNull().default([]), // array of step numbers [1, 2, 3, 4]
  currentStep: integer("current_step").notNull().default(1),
  totalValue: integer("total_value").notNull().default(14900), // AED 149 in fils
  pointsEarned: integer("points_earned").notNull().default(0),
  partnerLocation: text("partner_location").default("Baker's Kitchen, Mazaya Center"),
  issuedAt: timestamp("issued_at").notNull().default(sql`now()`),
  expiresAt: timestamp("expires_at").notNull().default(sql`now() + interval '7 days'`),
  redeemedAt: timestamp("redeemed_at"),
  sharedAt: timestamp("shared_at"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// Comprehensive Dubai Wellness Journey Schema
export const wellnessJourneys = pgTable("wellness_journeys", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").references(() => heroes.id),
  wellnessPassportId: varchar("wellness_passport_id").references(() => wellnessPassports.id),
  title: text("title").notNull().default("Dubai Wellness Journey"),
  description: text("description").notNull(),
  journeyType: text("journey_type").notNull().default("premium"), // basic, premium, vip
  totalSteps: integer("total_steps").notNull().default(5),
  completedSteps: integer("completed_steps").notNull().default(0),
  currentStepId: varchar("current_step_id"),
  progress: integer("progress").notNull().default(0), // percentage 0-100
  totalValueAED: integer("total_value_aed").notNull().default(110000), // AED 1100 in fils
  pointsEarned: integer("points_earned").notNull().default(0),
  status: text("status").notNull().default("active"), // active, completed, expired, cancelled
  startedAt: timestamp("started_at").default(sql`now()`),
  completedAt: timestamp("completed_at"),
  expiresAt: timestamp("expires_at").default(sql`now() + interval '30 days'`),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const wellnessJourneySteps = pgTable("wellness_journey_steps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  journeyId: varchar("journey_id").notNull().references(() => wellnessJourneys.id),
  stepNumber: integer("step_number").notNull(),
  stepId: text("step_id").notNull(), // hotel-start, cycling-track, walking-track, laperle-experience, mazaya-shopping
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  duration: text("duration").notNull(),
  category: text("category").notNull(), // hotel, fitness, entertainment, shopping
  perks: jsonb("perks").notNull().default([]), // array of perk descriptions
  pointsReward: integer("points_reward").notNull().default(0),
  isCompleted: boolean("is_completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  partnerInfo: jsonb("partner_info").default({}), // partner details like hotel info, restaurant info
  bookingUrl: text("booking_url"),
  qrCodeToken: text("qr_code_token"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const aquaShowPerks = pgTable("aqua_show_perks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  perkId: text("perk_id").notNull().unique(), // vip-tickets, backstage-tour, dining-package, photo-session
  title: text("title").notNull(),
  description: text("description").notNull(),
  valueAED: integer("value_aed").notNull(), // value in fils
  category: text("category").notNull(), // tickets, experience, dining, photography
  availableQuantity: integer("available_quantity"),
  claimedQuantity: integer("claimed_quantity").notNull().default(0),
  pointsCost: integer("points_cost").notNull().default(0),
  isWellnessJourneyPerk: boolean("is_wellness_journey_perk").notNull().default(true),
  partner: text("partner").default("La Perle by Dragone"),
  location: text("location").default("Al Habtoor City"),
  bookingInstructions: text("booking_instructions"),
  termsConditions: text("terms_conditions"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const luxuryHotelPartners = pgTable("luxury_hotel_partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hotelId: text("hotel_id").notNull().unique(), // hilton-habtoor, jw-marriott-marquis, oberoi-dubai, address-hotels
  name: text("name").notNull(),
  brand: text("brand").notNull(), // Hilton, Marriott, Oberoi, Address
  location: text("location").notNull(),
  address: text("address").notNull(),
  distanceToTrack: text("distance_to_track").notNull(),
  amenities: jsonb("amenities").notNull().default([]),
  specialOffer: text("special_offer").notNull(),
  wellnessPackages: jsonb("wellness_packages").default([]),
  phone: text("phone"),
  website: text("website"),
  rating: integer("rating").default(5), // 1-5 scale
  priceRange: text("price_range"), // luxury, ultra-luxury
  isWellnessPartner: boolean("is_wellness_partner").notNull().default(true),
  journeyDiscountPercent: integer("journey_discount_percent").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const restaurantPartners = pgTable("restaurant_partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  restaurantId: text("restaurant_id").notNull().unique(),
  name: text("name").notNull(),
  cuisine: text("cuisine").notNull(),
  location: text("location").notNull(),
  address: text("address"),
  phone: text("phone"),
  website: text("website"),
  rating: integer("rating").default(45), // rating * 10 for decimal precision (4.5 = 45)
  priceRange: text("price_range"), // budget, mid-range, fine-dining, luxury
  specialOffer: text("special_offer"),
  wellnessMenuItems: jsonb("wellness_menu_items").default([]),
  loyaltyDiscountPercent: integer("loyalty_discount_percent").default(0),
  partnerCategory: text("partner_category").notNull().default("dining"), // dining, wellness-dining, aqua-show-dining
  pointsMultiplier: integer("points_multiplier").default(1), // points multiplier for spending
  isWellnessPartner: boolean("is_wellness_partner").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const wellnessJourneyParticipants = pgTable("wellness_journey_participants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  journeyId: varchar("journey_id").notNull().references(() => wellnessJourneys.id),
  heroId: varchar("hero_id").notNull().references(() => heroes.id),
  currentStep: integer("current_step").notNull().default(1),
  stepsCompleted: jsonb("steps_completed").notNull().default([]),
  perksRedeemed: jsonb("perks_redeemed").notNull().default([]),
  totalPointsEarned: integer("total_points_earned").notNull().default(0),
  hotelPartnerId: varchar("hotel_partner_id").references(() => luxuryHotelPartners.id),
  preferredRestaurants: jsonb("preferred_restaurants").default([]),
  specialRequests: text("special_requests"),
  status: text("status").notNull().default("active"), // active, completed, paused, cancelled
  joinedAt: timestamp("joined_at").notNull().default(sql`now()`),
  completedAt: timestamp("completed_at"),
  lastActivityAt: timestamp("last_activity_at").default(sql`now()`),
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

// METAVERSE GAMING SYSTEM - Ultimate Planet Missions (Enhanced for Global Sustainability)
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
  
  // Global Sustainability Framework Enhancements
  cityId: text("city_id"), // City where mission is available (null = global)
  seasonId: text("season_id"), // Links to specific seasons like "dubai-2025-water"
  missionType: text("mission_type").notNull().default("trade"), // water, energy, waste, mobility, community, trade
  verificationMethods: jsonb("verification_methods").default(["qr"]), // ["qr", "photo", "api", "iot", "partner"]
  impactSchema: jsonb("impact_schema").default({}), // {unit: "liters", factors: {per_action: 2.5}}
  sdgTags: jsonb("sdg_tags").default([]), // UN Sustainable Development Goals alignment
  sponsorId: text("sponsor_id"), // Partner/sponsor funding this mission
  loyaltyMultiplier: integer("loyalty_multiplier").default(100), // Bonus for AquaCafe loyalty members (100 = no bonus, 150 = 50% bonus)
  isRecurring: boolean("is_recurring").notNull().default(false), // Can be completed multiple times
  cadence: text("cadence").default("once"), // "once", "daily", "weekly", "monthly"
  realWorldPartners: jsonb("real_world_partners").default([]), // Partner locations for verification
  
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
  
  // Global Sustainability Framework Enhancements
  ecoGear: jsonb("eco_gear").default({}), // Sustainability-themed avatar equipment and rewards
  scenesUnlocked: jsonb("scenes_unlocked").default(["dubai-marina"]), // Metaverse environments unlocked through impact
  globalRanking: integer("global_ranking"), // Position in global sustainability leaderboard
  citiesActive: jsonb("cities_active").default(["Dubai"]), // Cities where avatar is active
  sustainabilityScore: integer("sustainability_score").notNull().default(0), // Verified real-world impact score
  carbonCreditsEarned: integer("carbon_credits_earned").notNull().default(0), // Blockchain-verified carbon offsets
  
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

// Wellness Journey Insert Schemas
export const insertWellnessJourneySchema = createInsertSchema(wellnessJourneys).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWellnessJourneyStepSchema = createInsertSchema(wellnessJourneySteps).omit({
  id: true,
  createdAt: true,
});

export const insertAquaShowPerkSchema = createInsertSchema(aquaShowPerks).omit({
  id: true,
  createdAt: true,
});

export const insertLuxuryHotelPartnerSchema = createInsertSchema(luxuryHotelPartners).omit({
  id: true,
  createdAt: true,
});

export const insertRestaurantPartnerSchema = createInsertSchema(restaurantPartners).omit({
  id: true,
  createdAt: true,
});

export const insertWellnessJourneyParticipantSchema = createInsertSchema(wellnessJourneyParticipants).omit({
  id: true,
});

// Wellness Journey Types
export type InsertWellnessJourney = z.infer<typeof insertWellnessJourneySchema>;
export type WellnessJourney = typeof wellnessJourneys.$inferSelect;
export type InsertWellnessJourneyStep = z.infer<typeof insertWellnessJourneyStepSchema>;
export type WellnessJourneyStep = typeof wellnessJourneySteps.$inferSelect;
export type InsertAquaShowPerk = z.infer<typeof insertAquaShowPerkSchema>;
export type AquaShowPerk = typeof aquaShowPerks.$inferSelect;
export type InsertLuxuryHotelPartner = z.infer<typeof insertLuxuryHotelPartnerSchema>;
export type LuxuryHotelPartner = typeof luxuryHotelPartners.$inferSelect;
export type InsertRestaurantPartner = z.infer<typeof insertRestaurantPartnerSchema>;
export type RestaurantPartner = typeof restaurantPartners.$inferSelect;
export type InsertWellnessJourneyParticipant = z.infer<typeof insertWellnessJourneyParticipantSchema>;
export type WellnessJourneyParticipant = typeof wellnessJourneyParticipants.$inferSelect;
// ========================================
// GLOBAL SUSTAINABILITY FRAMEWORK TABLES
// ========================================

// Cities participating in the global sustainability network
export const cities = pgTable("cities", {
  id: text("id").primaryKey(), // "dubai", "singapore", "london"
  name: text("name").notNull(),
  country: text("country").notNull(),
  timezone: text("timezone").notNull(),
  currency: text("currency").notNull().default("AED"),
  language: text("language").notNull().default("en"),
  
  // Branding and localization
  brandTheme: jsonb("brand_theme").default({}), // Color schemes, logos, local imagery
  localPartners: jsonb("local_partners").default([]), // AquaCafe equivalent partners in each city
  governmentContact: text("government_contact"), // Official government liaison
  
  // Sustainability metrics and goals
  populationSize: integer("population_size"),
  sustainabilityGoals: jsonb("sustainability_goals").default({}), // City-specific environmental targets
  baselineMetrics: jsonb("baseline_metrics").default({}), // Starting environmental measurements
  
  // Status and participation
  isActive: boolean("is_active").notNull().default(true),
  launchDate: timestamp("launch_date"),
  nextCityToInspire: text("next_city_to_inspire"), // Cities watching this city's success
  
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Seasonal campaigns and challenges (like "Dubai 2025 Water Season")  
export const seasons = pgTable("seasons", {
  id: text("id").primaryKey(), // "dubai-2025-water", "singapore-2026-energy"
  name: text("name").notNull(),
  cityId: text("city_id").notNull().references(() => cities.id),
  theme: text("theme").notNull(), // "water", "energy", "waste", "mobility", "biodiversity"
  
  // Timing and phases
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  registrationDeadline: timestamp("registration_deadline"),
  
  // Goals and targets
  participationGoal: integer("participation_goal"), // Target number of active heroes
  environmentalGoals: jsonb("environmental_goals").default({}), // Specific measurable targets
  rewards: jsonb("rewards").default([]), // Season-specific rewards and prizes
  
  // Promotional and marketing
  heroImageUrl: text("hero_image_url"),
  campaignDescription: text("campaign_description"),
  socialHashtags: jsonb("social_hashtags").default([]),
  
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// Real-world mission submissions and verification
export const activitySubmissions = pgTable("activity_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull().references(() => heroes.id),
  missionCode: text("mission_code").notNull().references(() => planetMissions.code),
  cityId: text("city_id").references(() => cities.id),
  seasonId: text("season_id").references(() => seasons.id),
  
  // Submission data and proofs
  submissionType: text("submission_type").notNull(), // "qr_scan", "photo_upload", "partner_api", "iot_data"
  proofData: jsonb("proof_data").notNull(), // QR codes, photo URLs, API responses, sensor data
  locationData: jsonb("location_data").default({}), // GPS coordinates, partner location IDs
  metadata: jsonb("metadata").default({}), // Additional context like timestamps, device info
  
  // Verification and processing
  status: text("status").notNull().default("pending"), // pending, verified, rejected, processing
  verifiedBy: text("verified_by"), // "ai", "partner", "manual", "iot"
  verificationScore: integer("verification_score").default(0), // Confidence score 0-100
  impactCalculated: jsonb("impact_calculated").default({}), // Verified environmental impact metrics
  
  // Points and rewards
  pointsAwarded: integer("points_awarded").default(0),
  bonusMultipliers: jsonb("bonus_multipliers").default({}), // Applied multipliers (loyalty, streak, etc)
  
  submittedAt: timestamp("submitted_at").notNull().default(sql`now()`),
  verifiedAt: timestamp("verified_at"),
}, (table) => {
  return {
    heroMissionIdx: index("activity_submissions_hero_mission_idx").on(table.heroId, table.missionCode),
    statusTimeIdx: index("activity_submissions_status_time_idx").on(table.status, table.submittedAt),
    citySeasonIdx: index("activity_submissions_city_season_idx").on(table.cityId, table.seasonId),
  };
});

// Verification events and audit trail
export const verificationEvents = pgTable("verification_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  submissionId: varchar("submission_id").notNull().references(() => activitySubmissions.id),
  eventType: text("event_type").notNull(), // "ai_analysis", "partner_confirm", "manual_review", "fraud_check"
  result: text("result").notNull(), // "approved", "rejected", "needs_review", "flagged"
  confidence: integer("confidence"), // 0-100 confidence score
  details: jsonb("details").default({}), // Event-specific details and evidence
  verifierInfo: jsonb("verifier_info").default({}), // Who or what performed verification
  
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
}, (table) => {
  return {
    submissionIdx: index("verification_events_submission_idx").on(table.submissionId),
    typeTimeIdx: index("verification_events_type_time_idx").on(table.eventType, table.createdAt),
  };
});

// Global partner network for real-world verification
export const globalPartners = pgTable("global_partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  partnerType: text("partner_type").notNull(), // "water_station", "restaurant", "hotel", "transport", "retail"
  name: text("name").notNull(),
  cityId: text("city_id").notNull().references(() => cities.id),
  
  // Location and contact
  address: text("address"),
  coordinates: jsonb("coordinates").default({}), // {lat, lng}
  contactInfo: jsonb("contact_info").default({}),
  operatingHours: jsonb("operating_hours").default({}),
  
  // Integration and verification capabilities
  apiEndpoint: text("api_endpoint"), // For automated verification
  qrCodePrefix: text("qr_code_prefix"), // For QR-based verification  
  verificationMethods: jsonb("verification_methods").default([]), // Supported verification methods
  
  // Partnership terms
  loyaltyDiscountPercent: integer("loyalty_discount_percent").default(0),
  pointsMultiplier: integer("points_multiplier").default(100),
  specialOffers: jsonb("special_offers").default([]),
  
  isActive: boolean("is_active").notNull().default(true),
  verifiedPartner: boolean("verified_partner").notNull().default(false),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
}, (table) => {
  return {
    cityTypeIdx: index("global_partners_city_type_idx").on(table.cityId, table.partnerType),
    locationIdx: index("global_partners_location_idx").on(table.coordinates),
  };
});

// AI-powered mission templates for global replication
export const aiMissionTemplates = pgTable("ai_mission_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  templateName: text("template_name").notNull(),
  cityId: text("city_id").references(() => cities.id), // null = global template
  missionCategory: text("mission_category").notNull(), // water, energy, waste, mobility, community
  
  // AI prompt engineering
  promptTemplate: text("prompt_template").notNull(), // Template for AI mission generation
  variableSchema: jsonb("variable_schema").default({}), // Schema for template variables
  exampleOutputs: jsonb("example_outputs").default([]), // Sample generated missions
  
  // Mission parameters
  baseDifficulty: text("base_difficulty").default("beginner"),
  typicalDuration: text("typical_duration").default("15 minutes"),
  averagePoints: integer("average_points").default(200),
  
  // Usage and performance
  timesUsed: integer("times_used").notNull().default(0),
  successRate: integer("success_rate").default(0), // Percentage of successful mission completions
  averageRating: integer("average_rating").default(0), // User feedback on generated missions
  
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Dynamic metaverse environment states based on real-world impact
export const environmentStates = pgTable("environment_states", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  cityId: text("city_id").notNull().references(() => cities.id),
  seasonId: text("season_id").references(() => seasons.id),
  environmentName: text("environment_name").notNull(), // "canal_journey", "desert_oasis", "marina_future"
  
  // Dynamic state based on collective impact
  currentState: text("current_state").notNull().default("initial"), // "initial", "improving", "thriving", "exemplary"
  progressPercentage: integer("progress_percentage").notNull().default(0), // 0-100
  triggerMetrics: jsonb("trigger_metrics").default({}), // Metrics needed for state changes
  currentMetrics: jsonb("current_metrics").default({}), // Current real-world impact measurements
  
  // Visual and narrative elements
  sceneAssets: jsonb("scene_assets").default({}), // 3D models, textures, animations
  narrativeText: text("narrative_text"), // Story describing current environmental state
  unlockRequirements: jsonb("unlock_requirements").default({}), // Requirements for heroes to access
  
  lastUpdated: timestamp("last_updated").notNull().default(sql`now()`),
}, (table) => {
  return {
    citySeasonIdx: index("environment_states_city_season_idx").on(table.cityId, table.seasonId),
    progressIdx: index("environment_states_progress_idx").on(table.progressPercentage),
  };
});

// Global leaderboard snapshots for city comparison and inspiration
export const leaderboardSnapshots = pgTable("leaderboard_snapshots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  snapshotType: text("snapshot_type").notNull(), // "daily", "weekly", "monthly", "seasonal", "annual"
  scope: text("scope").notNull(), // "city", "global", "season"
  cityId: text("city_id").references(() => cities.id),
  seasonId: text("season_id").references(() => seasons.id),
  
  // Leaderboard data
  rankings: jsonb("rankings").notNull().default([]), // Top heroes, cities, or achievements
  metrics: jsonb("metrics").notNull().default({}), // Performance metrics and comparisons
  achievements: jsonb("achievements").default([]), // Special achievements during this period
  
  // Metadata
  totalParticipants: integer("total_participants"),
  dataCompleteness: integer("data_completeness").default(100), // Percentage of data available
  
  snapshotDate: timestamp("snapshot_date").notNull().default(sql`now()`),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
}, (table) => {
  return {
    typeTimeIdx: index("leaderboard_snapshots_type_time_idx").on(table.snapshotType, table.snapshotDate),
    scopeCityIdx: index("leaderboard_snapshots_scope_city_idx").on(table.scope, table.cityId),
  };
});

// Shopping Cart Management
export const carts = pgTable("carts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull().unique(), // For guest carts
  customerId: varchar("customer_id"), // null for guest carts
  items: jsonb("items").notNull().default('[]'), // Array of cart items
  metadata: jsonb("metadata").default('{}'),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
  expiresAt: timestamp("expires_at"), // Auto-expire old carts
});

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

export const insertCartSchema = createInsertSchema(carts).pick({
  sessionId: true,
  customerId: true,
  items: true,
  metadata: true,
  expiresAt: true,
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

export type InsertCart = z.infer<typeof insertCartSchema>;
export type Cart = typeof carts.$inferSelect;
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

// Wellness Passport types
export const insertWellnessPassportSchema = createInsertSchema(wellnessPassports).omit({ 
  id: true, 
  createdAt: true,
  issuedAt: true,
  expiresAt: true,
  referralCode: true
});

export const progressStepSchema = z.object({
  step: z.number().int().min(1).max(4)
});

export const phoneRequestSchema = z.object({
  phone: z.string().min(10).max(15)
});

export const redeemPassportSchema = z.object({
  partnerPin: z.string().min(4).max(8),
  staffId: z.string().optional(),
  location: z.string().optional()
});

export type InsertWellnessPassport = z.infer<typeof insertWellnessPassportSchema>;
export type WellnessPassport = typeof wellnessPassports.$inferSelect;
export type ProgressStep = z.infer<typeof progressStepSchema>;
export type PhoneRequest = z.infer<typeof phoneRequestSchema>;
export type RedeemPassport = z.infer<typeof redeemPassportSchema>;

// ========================================
// GLOBAL SUSTAINABILITY FRAMEWORK SCHEMAS
// ========================================

// City insert schema
export const insertCitySchema = createInsertSchema(cities).omit({
  createdAt: true,
  updatedAt: true,
});

// Season insert schema  
export const insertSeasonSchema = createInsertSchema(seasons).omit({
  createdAt: true,
});

// Activity submission insert schema
export const insertActivitySubmissionSchema = createInsertSchema(activitySubmissions).omit({
  id: true,
  submittedAt: true,
  verifiedAt: true,
});

// Verification event insert schema
export const insertVerificationEventSchema = createInsertSchema(verificationEvents).omit({
  id: true,
  createdAt: true,
});

// Global partner insert schema
export const insertGlobalPartnerSchema = createInsertSchema(globalPartners).omit({
  id: true,
  createdAt: true,
});

// AI mission template insert schema
export const insertAiMissionTemplateSchema = createInsertSchema(aiMissionTemplates).omit({
  id: true,
  timesUsed: true,
  createdAt: true,
  updatedAt: true,
});

// Environment state insert schema
export const insertEnvironmentStateSchema = createInsertSchema(environmentStates).omit({
  id: true,
  lastUpdated: true,
});

// Leaderboard snapshot insert schema
export const insertLeaderboardSnapshotSchema = createInsertSchema(leaderboardSnapshots).omit({
  id: true,
  snapshotDate: true,
  createdAt: true,
});

// Global Sustainability Framework Types
export type City = typeof cities.$inferSelect;
export type InsertCity = z.infer<typeof insertCitySchema>;
export type Season = typeof seasons.$inferSelect;
export type InsertSeason = z.infer<typeof insertSeasonSchema>;
export type ActivitySubmission = typeof activitySubmissions.$inferSelect;
export type InsertActivitySubmission = z.infer<typeof insertActivitySubmissionSchema>;
export type VerificationEvent = typeof verificationEvents.$inferSelect;
export type InsertVerificationEvent = z.infer<typeof insertVerificationEventSchema>;
export type GlobalPartner = typeof globalPartners.$inferSelect;
export type InsertGlobalPartner = z.infer<typeof insertGlobalPartnerSchema>;
export type AiMissionTemplate = typeof aiMissionTemplates.$inferSelect;
export type InsertAiMissionTemplate = z.infer<typeof insertAiMissionTemplateSchema>;
export type EnvironmentState = typeof environmentStates.$inferSelect;
export type InsertEnvironmentState = z.infer<typeof insertEnvironmentStateSchema>;
export type LeaderboardSnapshot = typeof leaderboardSnapshots.$inferSelect;
export type InsertLeaderboardSnapshot = z.infer<typeof insertLeaderboardSnapshotSchema>;

// ========================================
// B2B WHOLESALE INVENTORY SYSTEM
// ========================================

// B2B Buyers - Verified wholesale buyers
export const b2bBuyers = pgTable("b2b_buyers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  companyName: text("company_name").notNull(),
  businessLicense: text("business_license"),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull().unique(),
  contactPhone: text("contact_phone"),
  companyAddress: text("company_address"),
  city: text("city").default("Dubai"),
  country: text("country").default("UAE"),
  buyerTier: text("buyer_tier").notNull().default("retail"), // retail, distributor, enterprise
  verificationStatus: text("verification_status").notNull().default("pending"), // pending, verified, rejected
  creditLimit: integer("credit_limit").default(0),
  paymentTerms: text("payment_terms").default("prepaid"), // prepaid, net30, net60
  isActive: boolean("is_active").notNull().default(true),
  notes: text("notes"),
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Inventory Sources - Track different suppliers
export const inventorySources = pgTable("inventory_sources", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sourceName: text("source_name").notNull().unique(), // Internal tracking name (confidential)
  sourceCode: text("source_code").notNull().unique(), // Internal code (confidential)
  sourceType: text("source_type").notNull(), // distributor, auction, marketplace
  stockType: text("stock_type").notNull().default("ready_to_ship"), // asis_auction, ready_to_ship
  region: text("region").notNull().default("US"), // US, Japan, China, Europe (displayed to users)
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  website: text("website"),
  country: text("country"),
  currency: text("currency").default("USD"),
  isActive: boolean("is_active").notNull().default(true),
  lastSyncAt: timestamp("last_sync_at"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// Inventory Upload Batches - Track each upload session
export const inventoryUploads = pgTable("inventory_uploads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sourceId: varchar("source_id").notNull().references(() => inventorySources.id),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(), // csv, xlsx
  uploadedBy: varchar("uploaded_by").references(() => users.id),
  totalItems: integer("total_items").notNull().default(0),
  successfulItems: integer("successful_items").notNull().default(0),
  failedItems: integer("failed_items").notNull().default(0),
  uploadStatus: text("upload_status").notNull().default("processing"), // processing, completed, failed
  errorLog: jsonb("error_log"),
  metadata: jsonb("metadata"),
  uploadedAt: timestamp("uploaded_at").notNull().default(sql`now()`),
});

// Wholesale Inventory - Main inventory table
export const wholesaleInventory = pgTable("wholesale_inventory", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  uploadId: varchar("upload_id").notNull().references(() => inventoryUploads.id),
  sourceId: varchar("source_id").notNull().references(() => inventorySources.id),
  
  // Device Information
  brand: text("brand").notNull(), // Apple, Samsung, etc.
  model: text("model").notNull(), // iPhone 15 Pro, Galaxy S24, etc.
  storage: text("storage"), // 128GB, 256GB, etc.
  color: text("color"),
  carrier: text("carrier"), // Unlocked, Verizon, AT&T, etc.
  
  // Condition & Grading
  grade: text("grade").notNull(), // A+, A, A-, B, C (normalized)
  originalGrade: text("original_grade"), // Original grade from source
  functionalCondition: text("functional_condition"), // Fully functional, minor issues, etc.
  cosmeticCondition: text("cosmetic_condition"), // Excellent, Good, Fair, Poor
  
  // Pricing
  price: integer("price").notNull(), // Price in cents/fils
  currency: text("currency").notNull().default("USD"),
  pricePerUnit: integer("price_per_unit"), // For lots
  
  // Quantity
  quantity: integer("quantity").notNull().default(1),
  availableQuantity: integer("available_quantity").notNull().default(1),
  
  // Lot Information (for bulk auctions)
  isLot: boolean("is_lot").notNull().default(false),
  lotSize: integer("lot_size"),
  lotComposition: jsonb("lot_composition"), // Array of models in mixed lots
  
  // Availability
  isAvailable: boolean("is_available").notNull().default(true),
  reservedQuantity: integer("reserved_quantity").notNull().default(0),
  
  // Additional Info
  imei: text("imei"),
  sku: text("sku"),
  sourceListingId: text("source_listing_id"), // Original listing ID from source
  warranty: text("warranty"),
  accessories: jsonb("accessories"),
  notes: text("notes"),
  images: jsonb("images"),
  
  // Metadata
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
}, (table) => ({
  brandIdx: index("wholesale_inventory_brand_idx").on(table.brand),
  modelIdx: index("wholesale_inventory_model_idx").on(table.model),
  gradeIdx: index("wholesale_inventory_grade_idx").on(table.grade),
  sourceIdx: index("wholesale_inventory_source_idx").on(table.sourceId),
  availabilityIdx: index("wholesale_inventory_availability_idx").on(table.isAvailable),
}));

// Inventory Price History - Track price changes over time
export const inventoryPriceHistory = pgTable("inventory_price_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  inventoryId: varchar("inventory_id").notNull().references(() => wholesaleInventory.id),
  sourceId: varchar("source_id").notNull().references(() => inventorySources.id),
  price: integer("price").notNull(),
  currency: text("currency").notNull().default("USD"),
  recordedAt: timestamp("recorded_at").notNull().default(sql`now()`),
});

// ChainTrack Membership Tiers - Volume-based wholesale pricing
export const chaintrackMembershipTiers = pgTable("chaintrack_membership_tiers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tierName: text("tier_name").notNull().unique(), // On-Demand, Starter, Growth, Pro, Enterprise
  tierCode: text("tier_code").notNull().unique(), // ondemand, starter, growth, pro, enterprise
  
  // Volume Requirements (devices per month)
  minDevicesPerMonth: integer("min_devices_per_month").notNull().default(0),
  maxDevicesPerMonth: integer("max_devices_per_month"), // null for unlimited
  
  // Pricing Structure (covers $500 base or 0.5% transaction fee)
  monthlyFeeUSD: integer("monthly_fee_usd").notNull().default(0), // Monthly fee in cents
  transactionFeePercent: integer("transaction_fee_percent").notNull().default(50), // 0.5% = 50 basis points
  minimumMonthlyFeeUSD: integer("minimum_monthly_fee_usd").notNull().default(50000), // $500 minimum
  
  // Stock Type Access
  asisAuctionAccess: boolean("asis_auction_access").notNull().default(false), // Untested auction stock
  readyToShipAccess: boolean("ready_to_ship_access").notNull().default(false), // Tested stock
  
  // Fee Rates by Stock Type
  asisFeePercent: integer("asis_fee_percent").default(30), // 0.3% for ASIS stock (30 basis points)
  readyToShipFeePercent: integer("ready_to_ship_fee_percent").default(50), // 0.5% for tested stock
  
  // Features & Benefits
  features: jsonb("features").default([]), // Array of feature descriptions
  priority: integer("priority").notNull().default(1), // Display order
  
  // Badge & Display
  badgeColor: text("badge_color").default("#64748b"),
  badgeText: text("badge_text"), // "Most Popular", "Best Value", etc.
  
  // Status
  isActive: boolean("is_active").notNull().default(true),
  isPublic: boolean("is_public").notNull().default(true), // Show on public pricing page
  
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Insert Schemas
export const insertB2bBuyerSchema = createInsertSchema(b2bBuyers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  verifiedAt: true,
});

export const insertInventorySourceSchema = createInsertSchema(inventorySources).omit({
  id: true,
  createdAt: true,
  lastSyncAt: true,
});

export const insertInventoryUploadSchema = createInsertSchema(inventoryUploads).omit({
  id: true,
  uploadedAt: true,
});

export const insertWholesaleInventorySchema = createInsertSchema(wholesaleInventory).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertChaintrackMembershipTierSchema = createInsertSchema(chaintrackMembershipTiers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type B2bBuyer = typeof b2bBuyers.$inferSelect;
export type InsertB2bBuyer = z.infer<typeof insertB2bBuyerSchema>;
export type InventorySource = typeof inventorySources.$inferSelect;
export type InsertInventorySource = z.infer<typeof insertInventorySourceSchema>;
export type InventoryUpload = typeof inventoryUploads.$inferSelect;
export type InsertInventoryUpload = z.infer<typeof insertInventoryUploadSchema>;
export type WholesaleInventory = typeof wholesaleInventory.$inferSelect;
export type InsertWholesaleInventory = z.infer<typeof insertWholesaleInventorySchema>;
export type InventoryPriceHistory = typeof inventoryPriceHistory.$inferSelect;
export type ChaintrackMembershipTier = typeof chaintrackMembershipTiers.$inferSelect;
export type InsertChaintrackMembershipTier = z.infer<typeof insertChaintrackMembershipTierSchema>;

// ============================================================================
// CHAINTRACK REVERSE BIDDING SYSTEM
// ============================================================================

export const chaintrackAuctions = pgTable("chaintrack_auctions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  buyerId: varchar("buyer_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  productType: text("product_type").notNull(), // 'iPhone 15 Pro', 'iPhone 14', etc.
  quantity: integer("quantity").notNull(),
  condition: text("condition").notNull(), // 'new', 'refurbished', 'as-is', 'like-new', 'good', 'fair'
  gradeRequired: text("grade_required"), // 'A', 'B', 'C', 'D'
  startingPrice: integer("starting_price").notNull(), // in USD cents
  reservePrice: integer("reserve_price"), // in USD cents (minimum acceptable)
  currentLowestBid: integer("current_lowest_bid"), // in USD cents
  startDate: timestamp("start_date").notNull().default(sql`now()`),
  endDate: timestamp("end_date").notNull(),
  deliveryLocation: text("delivery_location").notNull(),
  paymentTerms: text("payment_terms"), // 'NET 30', 'NET 15', 'Upfront', etc.
  status: text("status").notNull().default("draft"), // 'draft', 'active', 'closed', 'completed', 'cancelled'
  winningSupplierId: varchar("winning_supplier_id").references(() => chaintrackSuppliers.id),
  winningBidId: varchar("winning_bid_id"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const chaintrackBids = pgTable("chaintrack_bids", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  auctionId: varchar("auction_id").notNull().references(() => chaintrackAuctions.id),
  supplierId: varchar("supplier_id").notNull().references(() => chaintrackSuppliers.id),
  bidPrice: integer("bid_price").notNull(), // in USD cents
  quantity: integer("quantity").notNull(),
  paymentTerms: text("payment_terms"),
  notes: text("notes"),
  estimatedDelivery: timestamp("estimated_delivery"),
  status: text("status").notNull().default("active"), // 'active', 'accepted', 'rejected', 'withdrawn'
  isWinning: boolean("is_winning").notNull().default(false),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const chaintrackSuppliers = pgTable("chaintrack_suppliers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id).unique(),
  companyName: text("company_name").notNull(),
  contactPerson: text("contact_person").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  specialties: jsonb("specialties").notNull().default([]), // Array of product types
  sourceCountries: jsonb("source_countries").notNull().default([]), // ['US', 'Japan', 'China']
  verificationStatus: text("verification_status").notNull().default("pending"), // 'pending', 'verified', 'rejected'
  verifiedAt: timestamp("verified_at"),
  totalTransactions: integer("total_transactions").notNull().default(0),
  successfulTransactions: integer("successful_transactions").notNull().default(0),
  averageRating: integer("average_rating").default(0), // 0-50 (5.0 * 10 for decimals)
  totalRatings: integer("total_ratings").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const chaintrackInventory = pgTable("chaintrack_inventory", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  supplierId: varchar("supplier_id").notNull().references(() => chaintrackSuppliers.id),
  productType: text("product_type").notNull(),
  quantity: integer("quantity").notNull(),
  condition: text("condition").notNull(), // 'new', 'refurbished', 'as-is', 'like-new'
  grade: text("grade"), // 'A', 'B', 'C', 'D'
  sourceCountry: text("source_country").notNull(),
  price: integer("price").notNull(), // in USD cents
  currency: text("currency").notNull().default("USD"),
  status: text("status").notNull().default("available"), // 'available', 'reserved', 'sold'
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const chaintrackInspections = pgTable("chaintrack_inspections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  auctionId: varchar("auction_id").notNull().references(() => chaintrackAuctions.id),
  bidId: varchar("bid_id").references(() => chaintrackBids.id),
  inspectionType: text("inspection_type").notNull(), // 'video', 'physical', 'documents'
  scheduledDate: timestamp("scheduled_date"),
  completedDate: timestamp("completed_date"),
  notes: text("notes"),
  reportUrl: text("report_url"),
  status: text("status").notNull().default("pending"), // 'pending', 'scheduled', 'completed', 'cancelled'
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const chaintrackTransactions = pgTable("chaintrack_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  auctionId: varchar("auction_id").notNull().references(() => chaintrackAuctions.id),
  buyerId: varchar("buyer_id").notNull().references(() => users.id),
  supplierId: varchar("supplier_id").notNull().references(() => chaintrackSuppliers.id),
  totalAmount: integer("total_amount").notNull(), // in USD cents
  currency: text("currency").notNull().default("USD"),
  paymentStatus: text("payment_status").notNull().default("pending"), // 'pending', 'paid', 'overdue', 'failed'
  shippingStatus: text("shipping_status").notNull().default("pending"), // 'pending', 'in_transit', 'delivered', 'failed'
  completedDate: timestamp("completed_date"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const chaintrackRatings = pgTable("chaintrack_ratings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  transactionId: varchar("transaction_id").notNull().references(() => chaintrackTransactions.id),
  ratedById: varchar("rated_by_id").notNull().references(() => users.id),
  ratedUserId: varchar("rated_user_id").notNull().references(() => users.id),
  rating: integer("rating").notNull(), // 1-5
  review: text("review"),
  comment: text("comment"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// ChainTrack Enhanced: India Export Compliance & Escrow System
export const chaintrackSellers = pgTable("chaintrack_sellers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id).unique(),
  companyName: text("company_name").notNull(),
  contactPerson: text("contact_person").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  
  // India Export Credentials
  gstin: text("gstin").notNull().unique(), // GST Identification Number
  iecCode: text("iec_code").notNull(), // Import Export Code from DGFT
  lutBondNumber: text("lut_bond_number"), // Letter of Undertaking / Bond number
  usesLUT: boolean("uses_lut").notNull().default(true), // true = LUT, false = pays IGST
  panNumber: text("pan_number").notNull(), // Permanent Account Number
  mcaRegistrationNumber: text("mca_registration_number"), // Ministry of Corporate Affairs
  exportPort: text("export_port").default("Mumbai"), // Primary export port
  
  // Beneficial Owner / UBO
  beneficialOwnerName: text("beneficial_owner_name").notNull(),
  beneficialOwnerPan: text("beneficial_owner_pan").notNull(),
  uboDeclarationUrl: text("ubo_declaration_url"), // Document URL
  
  // Bank Details (for FIRC tracking)
  bankName: text("bank_name").notNull(),
  bankAccountNumber: text("bank_account_number").notNull(),
  bankIfscCode: text("bank_ifsc_code").notNull(),
  bankSwiftCode: text("bank_swift_code"), // For international transfers
  
  // Seller Tier (determines commission rate)
  sellerTier: text("seller_tier").notNull().default("standard"), // 'verified' (1.5%), 'premium' (1.0%), 'standard' (2.5%)
  hasSubscription: boolean("has_subscription").notNull().default(false), // -0.25% discount
  subscriptionExpiresAt: timestamp("subscription_expires_at"),
  
  // AML & KYC
  kycStatus: text("kyc_status").notNull().default("pending"), // 'pending', 'verified', 'rejected', 'edd_required'
  amlRiskScore: integer("aml_risk_score").default(0), // 0-100
  sanctionsScreeningStatus: text("sanctions_screening_status").default("pending"), // 'pending', 'clear', 'flagged'
  sanctionsScreeningDate: timestamp("sanctions_screening_date"),
  sofSwowDocumentUrl: text("sof_swow_document_url"), // Source of Funds / Source of Wealth
  auditedFinancialsUrl: text("audited_financials_url"),
  
  // Verification & Compliance
  verificationStatus: text("verification_status").notNull().default("pending"), // 'pending', 'verified', 'rejected'
  verifiedAt: timestamp("verified_at"),
  verifiedBy: varchar("verified_by").references(() => users.id),
  
  // Statistics
  totalTransactions: integer("total_transactions").notNull().default(0),
  totalExportValue: integer("total_export_value").notNull().default(0), // in USD cents
  averageRating: integer("average_rating").default(0), // 0-50 (5.0 * 10)
  
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const chaintrackEscrows = pgTable("chaintrack_escrows", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  escrowNumber: text("escrow_number").notNull().unique(), // e.g., "ESCROW/DEL/2025/00123"
  
  // Parties
  buyerId: varchar("buyer_id").notNull().references(() => users.id), // DeliWer Shopping FZCO
  sellerId: varchar("seller_id").notNull().references(() => chaintrackSellers.id),
  
  // Transaction Details
  totalAmount: integer("total_amount").notNull(), // in USD cents
  currency: text("currency").notNull().default("USD"),
  incoterm: text("incoterm").default("FOB"), // FOB, FCA, CIF, etc.
  
  // Fee Breakdown (all in cents)
  commissionRate: integer("commission_rate").notNull(), // e.g., 150 = 1.50%
  commissionFee: integer("commission_fee").notNull(),
  escrowFixedFee: integer("escrow_fixed_fee").default(10000), // $100.00
  escrowPercentFee: integer("escrow_percent_fee").default(0),
  fxFee: integer("fx_fee").default(0),
  customsBrokerageFee: integer("customs_brokerage_fee").default(0),
  fastReleaseFee: integer("fast_release_fee").default(0),
  rodtepCredit: integer("rodtep_credit").default(0), // RoDTEP tax credit
  totalFees: integer("total_fees").notNull(),
  netToSeller: integer("net_to_seller").notNull(),
  
  // Escrow Status & Releases
  status: text("status").notNull().default("pending"), // 'pending', 'buyer_deposited', 'partial_released', 'fully_released', 'disputed', 'cancelled'
  partialReleasePercent: integer("partial_release_percent").default(70), // 70% on shipping bill verification
  partialReleasedAmount: integer("partial_released_amount").default(0),
  partialReleasedAt: timestamp("partial_released_at"),
  fullReleasedAmount: integer("full_released_amount").default(0),
  fullReleasedAt: timestamp("full_released_at"),
  
  // Bank Transfer Tracking
  buyerDepositSwiftRef: text("buyer_deposit_swift_ref"), // MT103 reference
  buyerDepositDate: timestamp("buyer_deposit_date"),
  buyerRemittanceAdviceUrl: text("buyer_remittance_advice_url"),
  partialReleaseSwiftRef: text("partial_release_swift_ref"),
  fullReleaseSwiftRef: text("full_release_swift_ref"),
  
  // CA Attestation
  caAttested: boolean("ca_attested").notNull().default(false),
  caAttestedAt: timestamp("ca_attested_at"),
  caAttestationUrl: text("ca_attestation_url"),
  caName: text("ca_name"),
  caCertificateNumber: text("ca_certificate_number"),
  
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const chaintrackShipments = pgTable("chaintrack_shipments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  escrowId: varchar("escrow_id").notNull().references(() => chaintrackEscrows.id),
  
  // Export Invoice Details
  invoiceNumber: text("invoice_number").notNull().unique(),
  invoiceDate: timestamp("invoice_date").notNull(),
  invoiceUrl: text("invoice_url"),
  fobValue: integer("fob_value").notNull(), // in USD cents
  hsCode: text("hs_code").notNull(), // Harmonized System Code
  productDescription: text("product_description").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: integer("unit_price").notNull(), // in cents
  
  // India Export Documentation
  shippingBillNumber: text("shipping_bill_number"), // Filed with Indian customs
  shippingBillDate: timestamp("shipping_bill_date"),
  shippingBillUrl: text("shipping_bill_url"),
  icegateReference: text("icegate_reference"), // ICEGATE system reference
  exportManifestNumber: text("export_manifest_number"), // EGM
  
  // Transport Documents
  awbBolNumber: text("awb_bol_number"), // Air Waybill or Bill of Lading
  awbBolDate: timestamp("awb_bol_date"),
  awbBolUrl: text("awb_bol_url"),
  carrierName: text("carrier_name"),
  exportDate: timestamp("export_date"),
  
  // GST & Tax Compliance
  gstr1Table6aIncluded: boolean("gstr1_table6a_included").default(false), // Export in GSTR-1 Table 6A
  gstr1FilingMonth: text("gstr1_filing_month"), // e.g., "2025-01"
  gstr1ScreenshotUrl: text("gstr1_screenshot_url"),
  
  // FIRC (Foreign Inward Remittance Certificate)
  fircNumber: text("firc_number"),
  fircDate: timestamp("firc_date"),
  fircUrl: text("firc_url"),
  fircAmount: integer("firc_amount"), // in USD cents
  
  // UAE Import & Clearance
  uaeImportDeclarationNumber: text("uae_import_declaration_number"),
  uaeImportDeclarationDate: timestamp("uae_import_declaration_date"),
  dafzaClearanceNumber: text("dafza_clearance_number"),
  dafzaClearanceDate: timestamp("dafza_clearance_date"),
  dafzaWarehouseReceiptUrl: text("dafza_warehouse_receipt_url"),
  
  // Shipment Status
  status: text("status").notNull().default("draft"), // 'draft', 'export_pending', 'shipped', 'in_transit', 'arrived_uae', 'cleared', 'completed'
  
  // Brand Authorization (for OEM products)
  brandAuthorizationUrl: text("brand_authorization_url"),
  oemComplianceVerified: boolean("oem_compliance_verified").default(false),
  
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const chaintrackDocuments = pgTable("chaintrack_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerId: varchar("seller_id").references(() => chaintrackSellers.id),
  escrowId: varchar("escrow_id").references(() => chaintrackEscrows.id),
  shipmentId: varchar("shipment_id").references(() => chaintrackShipments.id),
  
  // Document Details
  documentType: text("document_type").notNull(), // 'gst_certificate', 'iec_certificate', 'lut', 'bank_statement', 'shipping_bill', 'firc', 'ca_attestation', etc.
  documentName: text("document_name").notNull(),
  documentUrl: text("document_url").notNull(),
  fileSize: integer("file_size"), // in bytes
  mimeType: text("mime_type"),
  
  // Verification
  verificationStatus: text("verification_status").default("pending"), // 'pending', 'verified', 'rejected'
  verifiedAt: timestamp("verified_at"),
  verifiedBy: varchar("verified_by").references(() => users.id),
  rejectionReason: text("rejection_reason"),
  
  // Encryption & Security
  encryptedAt: timestamp("encrypted_at"),
  retentionExpiresAt: timestamp("retention_expires_at"), // 7 years from creation
  
  uploadedBy: varchar("uploaded_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const chaintrackAmlLogs = pgTable("chaintrack_aml_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerId: varchar("seller_id").references(() => chaintrackSellers.id),
  escrowId: varchar("escrow_id").references(() => chaintrackEscrows.id),
  userId: varchar("user_id").references(() => users.id),
  
  // AML Event Details
  eventType: text("event_type").notNull(), // 'kyc_check', 'sanctions_screening', 'transaction_monitoring', 'velocity_check', 'edd_trigger', 'suspicious_activity'
  riskLevel: text("risk_level").default("low"), // 'low', 'medium', 'high', 'critical'
  flagReason: text("flag_reason"),
  
  // Screening Details
  screeningProvider: text("screening_provider"), // 'OFAC', 'UN', 'EU'
  screeningResult: text("screening_result"), // 'clear', 'match', 'potential_match'
  screeningDetails: jsonb("screening_details"),
  
  // Transaction Monitoring
  transactionAmount: integer("transaction_amount"),
  transactionCount: integer("transaction_count"),
  velocityThresholdBreached: boolean("velocity_threshold_breached").default(false),
  
  // Resolution
  status: text("status").notNull().default("pending"), // 'pending', 'reviewed', 'cleared', 'escalated', 'reported'
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: varchar("reviewed_by").references(() => users.id),
  resolutionNotes: text("resolution_notes"),
  
  // SAR (Suspicious Activity Report)
  sarFiled: boolean("sar_filed").default(false),
  sarFiledAt: timestamp("sar_filed_at"),
  sarReferenceNumber: text("sar_reference_number"),
  
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const chaintrackAuditLogs = pgTable("chaintrack_audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  
  // Action Details
  userId: varchar("user_id").references(() => users.id),
  action: text("action").notNull(), // 'document_upload', 'escrow_created', 'release_approved', 'kyc_verified', etc.
  resourceType: text("resource_type").notNull(), // 'seller', 'escrow', 'shipment', 'document'
  resourceId: varchar("resource_id"),
  
  // Audit Trail
  changes: jsonb("changes"), // Before/after snapshot
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  
  // Immutability
  previousLogHash: text("previous_log_hash"), // Hash chain for tamper-evidence
  currentLogHash: text("current_log_hash").notNull(),
  
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
}, (table) => [
  index("audit_logs_user_idx").on(table.userId),
  index("audit_logs_resource_idx").on(table.resourceType, table.resourceId),
  index("audit_logs_created_idx").on(table.createdAt),
]);

export const chaintrackComplianceAlerts = pgTable("chaintrack_compliance_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerId: varchar("seller_id").references(() => chaintrackSellers.id),
  escrowId: varchar("escrow_id").references(() => chaintrackEscrows.id),
  
  // Alert Details
  alertType: text("alert_type").notNull(), // 'missing_document', 'kyc_expiring', 'edd_required', 'sanctions_match', 'invoice_mismatch', 'gstr1_missing'
  severity: text("severity").notNull().default("medium"), // 'low', 'medium', 'high', 'critical'
  message: text("message").notNull(),
  details: jsonb("details"),
  
  // Resolution
  status: text("status").notNull().default("open"), // 'open', 'acknowledged', 'resolved', 'dismissed'
  acknowledgedAt: timestamp("acknowledged_at"),
  acknowledgedBy: varchar("acknowledged_by").references(() => users.id),
  resolvedAt: timestamp("resolved_at"),
  resolutionNotes: text("resolution_notes"),
  
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// ============================================================================
// FULFILLMENT BY DELIWER - Reseller Dropship Program
// ============================================================================

// Reseller Accounts - Online store owners who use DeliWer for fulfillment
export const fulfillmentResellers = pgTable("fulfillment_resellers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id).unique(),
  
  // Business Information
  businessName: text("business_name").notNull(),
  websiteUrl: text("website_url").notNull(),
  businessType: text("business_type").notNull(), // 'online_store', 'marketplace_seller', 'affiliate', 'retail'
  contactPerson: text("contact_person").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  
  // KYC & Verification
  businessLicense: text("business_license"),
  tradeLicense: text("trade_license"),
  taxId: text("tax_id"),
  kycStatus: text("kyc_status").notNull().default("pending"), // 'pending', 'verified', 'rejected'
  verifiedAt: timestamp("verified_at"),
  verifiedBy: varchar("verified_by").references(() => users.id),
  
  // Financial Details
  bankName: text("bank_name"),
  bankAccountNumber: text("bank_account_number"),
  bankIban: text("bank_iban"),
  paymentTerms: text("payment_terms").default("advance_payment"), // 'advance_payment', 'net_7', 'net_15'
  creditLimit: integer("credit_limit").default(0), // in USD cents
  
  // Reseller Tier (determines pricing and commission)
  resellerTier: text("reseller_tier").notNull().default("starter"), // 'starter' (1% markup), 'growth' (0.5% markup), 'enterprise' (negotiable)
  monthlyOrderVolume: integer("monthly_order_volume").default(0),
  totalOrderValue: integer("total_order_value").default(0), // in USD cents
  
  // API Access (for automated order placement)
  apiKeyEnabled: boolean("api_key_enabled").default(false),
  apiKey: text("api_key").unique(),
  webhookUrl: text("webhook_url"),
  
  // Statistics
  totalOrders: integer("total_orders").notNull().default(0),
  totalRevenue: integer("total_revenue").notNull().default(0), // in USD cents
  averageOrderValue: integer("average_order_value").default(0),
  reputationScore: integer("reputation_score").default(100), // 0-100
  
  // Status
  status: text("status").notNull().default("active"), // 'active', 'suspended', 'inactive'
  suspendedAt: timestamp("suspended_at"),
  suspensionReason: text("suspension_reason"),
  
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Fulfillment Orders - Orders placed by resellers for their end customers
export const fulfillmentOrders = pgTable("fulfillment_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderNumber: text("order_number").notNull().unique(), // e.g., "FBD-2025-00123"
  
  // Reseller & Customer
  resellerId: varchar("reseller_id").notNull().references(() => fulfillmentResellers.id),
  resellerOrderId: text("reseller_order_id"), // Reseller's own order reference
  
  // End Customer Details (shipping destination)
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  shippingAddress: text("shipping_address").notNull(),
  shippingCity: text("shipping_city").notNull(),
  shippingState: text("shipping_state"),
  shippingCountry: text("shipping_country").notNull(),
  shippingPostalCode: text("shipping_postal_code"),
  
  // Product Details (from ChainTrack Inventory)
  productType: text("product_type").notNull(), // 'iPhone 15 Pro Max', etc.
  storage: text("storage"), // '256GB', '512GB', '1TB'
  color: text("color"),
  condition: text("condition").notNull(), // 'new', 'refurbished', 'like-new'
  grade: text("grade"), // 'A', 'B', 'C'
  quantity: integer("quantity").notNull().default(1),
  unitCost: integer("unit_cost").notNull(), // Cost from supplier in USD cents
  markupPercent: integer("markup_percent").notNull(), // Reseller markup %
  totalAmount: integer("total_amount").notNull(), // Total charged to reseller in USD cents
  currency: text("currency").notNull().default("USD"),
  
  // Source Supplier (ChainTrack)
  supplierId: varchar("supplier_id").references(() => chaintrackSuppliers.id),
  inventoryItemId: varchar("inventory_item_id").references(() => chaintrackInventory.id),
  
  // Payment Status
  paymentStatus: text("payment_status").notNull().default("pending"), // 'pending', 'paid', 'failed', 'refunded'
  paymentMethod: text("payment_method"), // 'bank_transfer', 'stripe', 'paypal'
  paymentReference: text("payment_reference"),
  paidAt: timestamp("paid_at"),
  paymentDueDate: timestamp("payment_due_date"),
  
  // Fulfillment Status
  fulfillmentStatus: text("fulfillment_status").notNull().default("pending"), // 'pending', 'processing', 'sourced', 'shipped', 'delivered', 'cancelled', 'failed'
  sourcedAt: timestamp("sourced_at"), // When inventory was secured from supplier
  shippedAt: timestamp("shipped_at"),
  deliveredAt: timestamp("delivered_at"),
  estimatedDeliveryDate: timestamp("estimated_delivery_date"),
  
  // Shipping Details
  shippingCarrier: text("shipping_carrier"), // 'DHL', 'FedEx', 'Aramex', 'UPS'
  trackingNumber: text("tracking_number"),
  trackingUrl: text("tracking_url"),
  shippingCost: integer("shipping_cost").default(0), // in USD cents
  
  // Quality Assurance
  inspectionRequired: boolean("inspection_required").default(true),
  inspectionStatus: text("inspection_status").default("pending"), // 'pending', 'passed', 'failed'
  inspectionNotes: text("inspection_notes"),
  inspectedAt: timestamp("inspected_at"),
  
  // Special Instructions
  resellerNotes: text("reseller_notes"),
  packingInstructions: text("packing_instructions"),
  customBranding: boolean("custom_branding").default(false), // Use reseller's branding
  
  // Returns & Issues
  returnRequested: boolean("return_requested").default(false),
  returnReason: text("return_reason"),
  returnStatus: text("return_status"), // 'pending', 'approved', 'rejected', 'completed'
  
  cancelledAt: timestamp("cancelled_at"),
  cancellationReason: text("cancellation_reason"),
  
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
}, (table) => [
  index("fulfillment_orders_reseller_idx").on(table.resellerId),
  index("fulfillment_orders_status_idx").on(table.fulfillmentStatus),
  index("fulfillment_orders_payment_idx").on(table.paymentStatus),
]);

// Reseller Inventory Subscriptions - Which products reseller wants access to
export const resellerInventorySubscriptions = pgTable("reseller_inventory_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  resellerId: varchar("reseller_id").notNull().references(() => fulfillmentResellers.id),
  
  // Product Preferences
  productTypes: jsonb("product_types").notNull().default([]), // ['iPhone 15 Pro', 'iPhone 14', etc.]
  conditions: jsonb("conditions").notNull().default(['new', 'refurbished']), // Preferred conditions
  minGrade: text("min_grade").default("B"), // Minimum acceptable grade
  sourceCountries: jsonb("source_countries").default(['US', 'UAE', 'Japan']), // Preferred sources
  
  // Pricing Preferences
  maxUnitPrice: integer("max_unit_price"), // Maximum price willing to pay in USD cents
  preferredMarkup: integer("preferred_markup").default(100), // Default markup %
  
  // Notifications
  notifyOnNewInventory: boolean("notify_on_new_inventory").default(true),
  notifyOnPriceDrops: boolean("notify_on_price_drops").default(true),
  emailNotifications: boolean("email_notifications").default(true),
  
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Fulfillment Pricing - Real-time pricing for resellers
export const fulfillmentPricing = pgTable("fulfillment_pricing", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  
  // Product Details
  productType: text("product_type").notNull(),
  storage: text("storage"),
  color: text("color"),
  condition: text("condition").notNull(),
  grade: text("grade"),
  
  // Source & Availability
  supplierId: varchar("supplier_id").references(() => chaintrackSuppliers.id),
  sourceCountry: text("source_country").notNull(),
  availableQuantity: integer("available_quantity").notNull(),
  
  // Cost Structure
  baseCost: integer("base_cost").notNull(), // Supplier cost in USD cents
  fulfillmentFee: integer("fulfillment_fee").notNull(), // DeliWer service fee
  inspectionFee: integer("inspection_fee").default(0),
  shippingFee: integer("shipping_fee").default(0),
  totalCost: integer("total_cost").notNull(), // Total cost to reseller
  
  // Tier-based Pricing
  starterPrice: integer("starter_price").notNull(), // Price for starter tier
  growthPrice: integer("growth_price").notNull(), // Price for growth tier
  enterprisePrice: integer("enterprise_price").notNull(), // Price for enterprise tier
  
  // Validity
  validFrom: timestamp("valid_from").notNull().default(sql`now()`),
  validUntil: timestamp("valid_until").notNull(),
  isActive: boolean("is_active").default(true),
  
  lastUpdatedBy: varchar("last_updated_by").references(() => users.id),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
}, (table) => [
  index("fulfillment_pricing_product_idx").on(table.productType, table.condition),
  index("fulfillment_pricing_validity_idx").on(table.validUntil),
]);

// Insert Schemas
export const insertChaintrackAuctionSchema = createInsertSchema(chaintrackAuctions).omit({
  id: true,
  currentLowestBid: true,
  winningSupplierId: true,
  winningBidId: true,
  createdAt: true,
  updatedAt: true,
});

export const insertChaintrackBidSchema = createInsertSchema(chaintrackBids).omit({
  id: true,
  isWinning: true,
  createdAt: true,
  updatedAt: true,
});

export const insertChaintrackSupplierSchema = createInsertSchema(chaintrackSuppliers).omit({
  id: true,
  verifiedAt: true,
  totalTransactions: true,
  successfulTransactions: true,
  averageRating: true,
  totalRatings: true,
  createdAt: true,
  updatedAt: true,
});

export const insertChaintrackInventorySchema = createInsertSchema(chaintrackInventory).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertChaintrackInspectionSchema = createInsertSchema(chaintrackInspections).omit({
  id: true,
  createdAt: true,
});

export const insertChaintrackTransactionSchema = createInsertSchema(chaintrackTransactions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertChaintrackRatingSchema = createInsertSchema(chaintrackRatings).omit({
  id: true,
  createdAt: true,
});

// Enhanced ChainTrack Compliance Insert Schemas
export const insertChaintrackSellerSchema = createInsertSchema(chaintrackSellers).omit({
  id: true,
  verifiedAt: true,
  totalTransactions: true,
  totalExportValue: true,
  averageRating: true,
  createdAt: true,
  updatedAt: true,
});

export const insertChaintrackEscrowSchema = createInsertSchema(chaintrackEscrows).omit({
  id: true,
  partialReleasedAmount: true,
  partialReleasedAt: true,
  fullReleasedAmount: true,
  fullReleasedAt: true,
  caAttestedAt: true,
  createdAt: true,
  updatedAt: true,
});

export const insertChaintrackShipmentSchema = createInsertSchema(chaintrackShipments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertChaintrackDocumentSchema = createInsertSchema(chaintrackDocuments).omit({
  id: true,
  verifiedAt: true,
  createdAt: true,
});

export const insertChaintrackAmlLogSchema = createInsertSchema(chaintrackAmlLogs).omit({
  id: true,
  createdAt: true,
});

export const insertChaintrackAuditLogSchema = createInsertSchema(chaintrackAuditLogs).omit({
  id: true,
  createdAt: true,
});

export const insertChaintrackComplianceAlertSchema = createInsertSchema(chaintrackComplianceAlerts).omit({
  id: true,
  acknowledgedAt: true,
  resolvedAt: true,
  createdAt: true,
});

// Types
export type ChaintrackAuction = typeof chaintrackAuctions.$inferSelect;
export type InsertChaintrackAuction = z.infer<typeof insertChaintrackAuctionSchema>;
export type ChaintrackBid = typeof chaintrackBids.$inferSelect;
export type InsertChaintrackBid = z.infer<typeof insertChaintrackBidSchema>;
export type ChaintrackSupplier = typeof chaintrackSuppliers.$inferSelect;
export type InsertChaintrackSupplier = z.infer<typeof insertChaintrackSupplierSchema>;
export type ChaintrackInventory = typeof chaintrackInventory.$inferSelect;
export type InsertChaintrackInventory = z.infer<typeof insertChaintrackInventorySchema>;
export type ChaintrackInspection = typeof chaintrackInspections.$inferSelect;
export type InsertChaintrackInspection = z.infer<typeof insertChaintrackInspectionSchema>;
export type ChaintrackTransaction = typeof chaintrackTransactions.$inferSelect;
export type InsertChaintrackTransaction = z.infer<typeof insertChaintrackTransactionSchema>;
export type ChaintrackRating = typeof chaintrackRatings.$inferSelect;
export type InsertChaintrackRating = z.infer<typeof insertChaintrackRatingSchema>;

// Enhanced ChainTrack Compliance Types
export type ChaintrackSeller = typeof chaintrackSellers.$inferSelect;
export type InsertChaintrackSeller = z.infer<typeof insertChaintrackSellerSchema>;
export type ChaintrackEscrow = typeof chaintrackEscrows.$inferSelect;
export type InsertChaintrackEscrow = z.infer<typeof insertChaintrackEscrowSchema>;
export type ChaintrackShipment = typeof chaintrackShipments.$inferSelect;
export type InsertChaintrackShipment = z.infer<typeof insertChaintrackShipmentSchema>;
export type ChaintrackDocument = typeof chaintrackDocuments.$inferSelect;
export type InsertChaintrackDocument = z.infer<typeof insertChaintrackDocumentSchema>;
export type ChaintrackAmlLog = typeof chaintrackAmlLogs.$inferSelect;
export type InsertChaintrackAmlLog = z.infer<typeof insertChaintrackAmlLogSchema>;
export type ChaintrackAuditLog = typeof chaintrackAuditLogs.$inferSelect;
export type InsertChaintrackAuditLog = z.infer<typeof insertChaintrackAuditLogSchema>;
export type ChaintrackComplianceAlert = typeof chaintrackComplianceAlerts.$inferSelect;
export type InsertChaintrackComplianceAlert = z.infer<typeof insertChaintrackComplianceAlertSchema>;

// Fulfillment by DeliWer Insert Schemas
export const insertFulfillmentResellerSchema = createInsertSchema(fulfillmentResellers).omit({
  id: true,
  verifiedAt: true,
  totalOrders: true,
  totalRevenue: true,
  averageOrderValue: true,
  reputationScore: true,
  suspendedAt: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFulfillmentOrderSchema = createInsertSchema(fulfillmentOrders).omit({
  id: true,
  orderNumber: true,
  paidAt: true,
  sourcedAt: true,
  shippedAt: true,
  deliveredAt: true,
  inspectedAt: true,
  cancelledAt: true,
  createdAt: true,
  updatedAt: true,
});

export const insertResellerInventorySubscriptionSchema = createInsertSchema(resellerInventorySubscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFulfillmentPricingSchema = createInsertSchema(fulfillmentPricing).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Fulfillment by DeliWer Types
export type FulfillmentReseller = typeof fulfillmentResellers.$inferSelect;
export type InsertFulfillmentReseller = z.infer<typeof insertFulfillmentResellerSchema>;
export type FulfillmentOrder = typeof fulfillmentOrders.$inferSelect;
export type InsertFulfillmentOrder = z.infer<typeof insertFulfillmentOrderSchema>;
export type ResellerInventorySubscription = typeof resellerInventorySubscriptions.$inferSelect;
export type InsertResellerInventorySubscription = z.infer<typeof insertResellerInventorySubscriptionSchema>;
export type FulfillmentPricing = typeof fulfillmentPricing.$inferSelect;
export type InsertFulfillmentPricing = z.infer<typeof insertFulfillmentPricingSchema>;

// AI Deli Pricing Engine Schema
export const marketPrices = pgTable("market_prices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  deviceModel: text("device_model").notNull(), // e.g., "iPhone 15 Pro Max"
  condition: text("condition").notNull(), // excellent, good, fair, poor
  source: text("source").notNull(), // ebay, amazon, swappa, backmarket
  priceAED: integer("price_aed").notNull(), // Market price in fils
  url: text("url"), // Link to listing
  scrapedAt: timestamp("scraped_at").notNull().default(sql`now()`),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const pricingRules = pgTable("pricing_rules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  deviceCategory: text("device_category").notNull(), // iphone, ipad, macbook, watch
  minMarginPercent: integer("min_margin_percent").notNull().default(15), // Minimum profit margin %
  targetMarginPercent: integer("target_margin_percent").notNull().default(25), // Target profit margin %
  acquisitionCostAED: integer("acquisition_cost_aed").notNull().default(5000), // Fixed costs in fils (shipping, inspection, etc.)
  logisticsCostPercent: integer("logistics_cost_percent").notNull().default(5), // Logistics as % of device value
  overheadPercent: integer("overhead_percent").notNull().default(10), // Overhead costs %
  conditionMultipliers: jsonb("condition_multipliers").notNull().default({
    excellent: 1.0,
    good: 0.85,
    fair: 0.65,
    poor: 0.40
  }),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const priceHistory = pgTable("price_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  deviceModel: text("device_model").notNull(),
  condition: text("condition").notNull(),
  offerPriceAED: integer("offer_price_aed").notNull(), // Our offer to user in fils
  marketPriceAED: integer("market_price_aed").notNull(), // Average market price in fils
  calculatedMargin: integer("calculated_margin").notNull(), // Actual margin %
  accepted: boolean("accepted").notNull().default(false), // Did user accept the offer
  heroId: varchar("hero_id").references(() => heroes.id),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const aiConversations = pgTable("ai_conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").references(() => heroes.id),
  sessionId: varchar("session_id").notNull(), // Group messages by session
  role: text("role").notNull(), // user, assistant, system
  message: text("message").notNull(),
  context: jsonb("context").default({}), // Additional context (device model, prices, etc.)
  intent: text("intent"), // pricing_inquiry, trade_in_help, general_question
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const tradeInSellRequests = pgTable("trade_in_sell_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  deviceType: text("device_type").notNull(),
  model: text("model").notNull(),
  condition: text("condition").notNull(),
  storage: text("storage"),
  expectedPrice: integer("expected_price"),
  aiOfferPrice: integer("ai_offer_price").notNull(),
  description: text("description"),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone"),
  status: text("status").notNull().default("pending"), // pending, contacted, completed, cancelled
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// AI Deli Schemas
export const insertMarketPriceSchema = createInsertSchema(marketPrices).omit({
  id: true,
  createdAt: true,
});

export const insertPricingRuleSchema = createInsertSchema(pricingRules).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPriceHistorySchema = createInsertSchema(priceHistory).omit({
  id: true,
  createdAt: true,
});

export const insertAiConversationSchema = createInsertSchema(aiConversations).omit({
  id: true,
  createdAt: true,
});

export const insertTradeInSellRequestSchema = createInsertSchema(tradeInSellRequests).omit({
  id: true,
  createdAt: true,
});

// AI Deli Types
export type MarketPrice = typeof marketPrices.$inferSelect;
export type InsertMarketPrice = z.infer<typeof insertMarketPriceSchema>;
export type PricingRule = typeof pricingRules.$inferSelect;
export type InsertPricingRule = z.infer<typeof insertPricingRuleSchema>;
export type PriceHistory = typeof priceHistory.$inferSelect;
export type InsertPriceHistory = z.infer<typeof insertPriceHistorySchema>;
export type AiConversation = typeof aiConversations.$inferSelect;
export type InsertAiConversation = z.infer<typeof insertAiConversationSchema>;
export type TradeInSellRequest = typeof tradeInSellRequests.$inferSelect;
export type InsertTradeInSellRequest = z.infer<typeof insertTradeInSellRequestSchema>;

// AI Deli Request Validation Schemas
export const aiDeliPriceRequestSchema = z.object({
  deviceModel: z.string().min(1, "Device model is required"),
  condition: z.enum(["excellent", "good", "fair", "poor"]),
  storage: z.string().optional(),
});

export const sellRequestSchema = z.object({
  deviceType: z.string().min(1, "Device type is required"),
  model: z.string().min(1, "Model is required"),
  condition: z.enum(["excellent", "good", "fair", "poor"]),
  storage: z.string().optional(),
  expectedPrice: z.string().optional(),
  description: z.string().optional(),
  contactEmail: z.string().email("Valid email is required"),
  contactPhone: z.string().optional(),
});

// ========================================
// E-COMMERCE: LOYALTY & VOUCHERS
// ========================================

// AquaCafe Loyalty Memberships - Auto-enrolled on first purchase
export const loyaltyMemberships = pgTable("loyalty_memberships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id").notNull().references(() => customers.id),
  membershipNumber: text("membership_number").notNull().unique(),
  tier: text("tier").notNull().default("bronze"), // bronze, silver, gold, platinum
  points: integer("points").notNull().default(0),
  lifetimePoints: integer("lifetime_points").notNull().default(0),
  status: text("status").notNull().default("active"), // active, inactive, suspended
  
  // Benefits tracking
  totalOrders: integer("total_orders").notNull().default(0),
  totalSpentAED: integer("total_spent_aed").notNull().default(0), // in fils
  
  // Membership gifts
  welcomeGiftRedeemed: boolean("welcome_gift_redeemed").notNull().default(false),
  welcomeGiftType: text("welcome_gift_type"), // 'shower-filter' or 'pizza-voucher'
  
  enrolledAt: timestamp("enrolled_at").notNull().default(sql`now()`),
  lastActivityAt: timestamp("last_activity_at").default(sql`now()`),
  expiresAt: timestamp("expires_at"), // null = never expires
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Digital Vouchers - Generated automatically for qualifying purchases
export const digitalVouchers = pgTable("digital_vouchers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  voucherCode: text("voucher_code").notNull().unique(),
  customerId: varchar("customer_id").notNull().references(() => customers.id),
  orderId: varchar("order_id").references(() => orders.id),
  
  // Voucher details
  voucherType: text("voucher_type").notNull(), // 'starter-kit-discount', 'chill-grill-d100', 'shower-filter-free'
  title: text("title").notNull(),
  description: text("description").notNull(),
  valueAED: integer("value_aed").notNull(), // in fils
  
  // Usage tracking
  status: text("status").notNull().default("active"), // active, redeemed, expired, cancelled
  redeemedAt: timestamp("redeemed_at"),
  redeemedLocation: text("redeemed_location"),
  
  // Validity
  validFrom: timestamp("valid_from").notNull().default(sql`now()`),
  validUntil: timestamp("valid_until").notNull(),
  
  // Terms and conditions
  terms: text("terms"),
  redemptionInstructions: text("redemption_instructions"),
  
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Sessions table for authentication (required by Replit Auth blueprint)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Insert schemas for loyalty and vouchers
export const insertLoyaltyMembershipSchema = createInsertSchema(loyaltyMemberships).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDigitalVoucherSchema = createInsertSchema(digitalVouchers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types for loyalty and vouchers
export type LoyaltyMembership = typeof loyaltyMemberships.$inferSelect;
export type InsertLoyaltyMembership = z.infer<typeof insertLoyaltyMembershipSchema>;
export type DigitalVoucher = typeof digitalVouchers.$inferSelect;
export type InsertDigitalVoucher = z.infer<typeof insertDigitalVoucherSchema>;
