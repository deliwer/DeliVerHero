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
  stripeCustomerId: text("stripe_customer_id"), // Stripe customer ID for subscription management
  
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
  aquaCafeMembershipGiftChoice: text("aqua_cafe_membership_gift_choice"), // 'pizza-voucher' or 'shower-filter-referral'
  aquaCafeMembershipReferralCode: text("aqua_cafe_membership_referral_code"),
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

// Relocation & Partner Leads
export const leadApplications = pgTable("lead_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").references(() => heroes.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  relocationStatus: text("relocation_status").notNull(), // planned, in_progress, completed
  interestArea: text("interest_area"), // investment, residency, business, lifestyle
  notes: text("notes"),
  marketingStage: text("marketing_stage").notNull().default("intercepted"), // intercepted, handshake, redirected, closed
  conciergeStatus: text("concierge_status").notNull().default("new"), // new, intent_qualified, problem_identified, bundle_offered, ready_for_human
  moveInTiming: text("move_in_timing"), // within_7_days, 7_14_days, later
  area: text("area"),
  propertyType: text("property_type"), // apartment, villa
  conciergeData: jsonb("concierge_data").default({}), // { water: boolean, cleaning: boolean, fixes: boolean }
  lastReminderSentAt: timestamp("last_reminder_sent_at"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const leadInteractions = pgTable("lead_interactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id").notNull().references(() => leadApplications.id),
  role: text("role").notNull(), // bot, user, human
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const chaintrackMembershipTiers = pgTable("chaintrack_membership_tiers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // Seed, Sprout, Bloom, Harvest
  priceMonthly: integer("price_monthly").notNull(), // in fils
  priceYearly: integer("price_yearly").notNull(), // in fils
  description: text("description").notNull(),
  features: jsonb("features").notNull().default([]),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const chaintrackComplianceRules = pgTable("chaintrack_compliance_rules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull(), // carbon, recycling, labor, sourcing
  title: text("title").notNull(),
  description: text("description").notNull(),
  standard: text("standard").notNull(), // ISO 14001, LEED, etc.
  importance: text("importance").notNull(), // high, medium, low
  isActive: boolean("is_active").notNull().default(true),
});

export const insertLeadApplicationSchema = createInsertSchema(leadApplications).omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export type LeadApplication = typeof leadApplications.$inferSelect;
export type InsertLeadApplication = z.infer<typeof insertLeadApplicationSchema>;
