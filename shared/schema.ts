import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, index, unique, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const founderStreaks = pgTable("founder_streaks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  phone: text("phone").notNull(),
  streak: integer("streak").notNull().default(0),
  lastPosted: text("last_posted"), // Store as YYYY-MM-DD
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const insertFounderStreakSchema = createInsertSchema(founderStreaks).omit({
  id: true,
  updatedAt: true,
});

export type FounderStreak = typeof founderStreaks.$inferSelect;
export type InsertFounderStreak = z.infer<typeof insertFounderStreakSchema>;

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

export const conciergeConversations = pgTable("concierge_conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  phoneNumber: text("phone_number").notNull(),
  platform: text("platform").notNull().default("whatsapp"), // 'whatsapp' or 'instagram'
  moveInTiming: text("move_in_timing"), // 'within_7_days', '7_14_days', 'later'
  area: text("area"),
  propertyType: text("property_type"), // 'apartment', 'villa'
  waterCheck: boolean("water_check"),
  cleaningCheck: boolean("cleaning_check"),
  fixesCheck: boolean("fixes_check"),
  status: text("status").notNull().default("qualifying"), // 'qualifying', 'checking', 'offering', 'ready_for_human'
  lastAgent: text("last_agent").notNull().default("agent_1"),
  lastMessageAt: timestamp("last_message_at").notNull().default(sql`now()`),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertConciergeConversationSchema = createInsertSchema(conciergeConversations).omit({
  id: true,
  createdAt: true,
  lastMessageAt: true,
});

export type InsertConciergeConversation = z.infer<typeof insertConciergeConversationSchema>;
export type ConciergeConversation = typeof conciergeConversations.$inferSelect;

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
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  phone: text("phone"),
  relocationStatus: text("relocation_status").notNull().default("planned"), // planned, in_progress, completed
  interestArea: text("interest_area"), // investment, residency, business, lifestyle
  notes: text("notes"),
  marketingStage: text("marketing_stage").notNull().default("intercepted"), // intercepted, handshake, redirected, closed
  conciergeStatus: text("concierge_status").notNull().default("new"), // new, intent_qualified, problem_identified, bundle_offered, ready_for_human
  moveInTiming: text("move_in_timing"), // within_7_days, 7_14_days, later
  area: text("area"),
  propertyType: text("property_type"), // apartment, villa
  conciergeData: jsonb("concierge_data").default({}), // { water: boolean, cleaning: boolean, fixes: boolean }
  source: text("source"),
  whatsappStatus: text("whatsapp_status"),
  nextAction: text("next_action"),
  instagramHandle: text("instagram_handle"),
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
  name: text("name").notNull(),
  tierName: text("tier_name").notNull().default(""),
  priceMonthly: integer("price_monthly").notNull(),
  priceYearly: integer("price_yearly").notNull(),
  monthlyFeeUSD: integer("monthly_fee_usd").notNull().default(0),
  description: text("description").notNull(),
  features: jsonb("features").notNull().default([]),
  isActive: boolean("is_active").notNull().default(true),
  isPublic: boolean("is_public").notNull().default(true),
  priority: integer("priority").notNull().default(0),
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

// ============================================================================
// EJARI CONVERSATIONS
// ============================================================================
export const ejariConversations = pgTable("ejari_conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  phone: text("phone").notNull(),
  platform: text("platform").notNull().default("whatsapp"),
  moveInTiming: text("move_in_timing"),
  area: text("area"),
  propertyType: text("property_type"),
  waterChecked: boolean("water_checked"),
  cleaningNeeded: boolean("cleaning_needed"),
  fixesNeeded: boolean("fixes_needed"),
  status: text("status").notNull().default("QUALIFYING"),
  lastMessageSentAt: timestamp("last_message_sent_at"),
  reminderSent: boolean("reminder_sent").notNull().default(false),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// ============================================================================
// RELOCATE LEADS
// ============================================================================
export const relocateLeads = pgTable("relocate_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  audienceType: text("audience_type"),
  capitalRange: text("capital_range"),
  familySize: text("family_size"),
  businessType: text("business_type"),
  timeline: text("timeline"),
  message: text("message"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// ============================================================================
// USER SUBSCRIPTIONS
// ============================================================================
export const userSubscriptions = pgTable("user_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  tierId: varchar("tier_id").notNull(),
  status: text("status").notNull().default("active"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  stripeCustomerId: text("stripe_customer_id"),
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// ============================================================================
// ORDERS & CUSTOMERS
// ============================================================================
export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  paymentIntentId: text("payment_intent_id"),
  customerId: varchar("customer_id"),
  customerEmail: text("customer_email").notNull(),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("aed"),
  status: text("status").notNull().default("pending"),
  items: jsonb("items").notNull().default([]),
  billingDetails: jsonb("billing_details").default({}),
  shippingDetails: jsonb("shipping_details").default({}),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const customers = pgTable("customers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  shopifyCustomerId: text("shopify_customer_id"),
  stripeCustomerId: text("stripe_customer_id"),
  defaultAddress: jsonb("default_address"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const loyaltyMemberships = pgTable("loyalty_memberships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id").notNull(),
  membershipNumber: text("membership_number").notNull(),
  tier: text("tier").notNull().default("bronze"),
  points: integer("points").notNull().default(0),
  lifetimePoints: integer("lifetime_points").notNull().default(0),
  status: text("status").notNull().default("active"),
  totalOrders: integer("total_orders").notNull().default(0),
  totalSpentAED: integer("total_spent_aed").notNull().default(0),
  welcomeGiftRedeemed: boolean("welcome_gift_redeemed").notNull().default(false),
  welcomeGiftType: text("welcome_gift_type"),
  enrolledAt: timestamp("enrolled_at"),
  lastActivityAt: timestamp("last_activity_at"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const digitalVouchers = pgTable("digital_vouchers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  voucherCode: text("voucher_code").notNull(),
  customerId: varchar("customer_id"),
  orderId: varchar("order_id"),
  voucherType: text("voucher_type").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  valueAED: integer("value_aed").notNull().default(0),
  status: text("status").notNull().default("active"),
  redeemedAt: timestamp("redeemed_at"),
  redeemedLocation: text("redeemed_location"),
  validFrom: timestamp("valid_from"),
  validUntil: timestamp("valid_until"),
  terms: text("terms"),
  redemptionInstructions: text("redemption_instructions"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// ============================================================================
// TOMBOLA & COUPONS
// ============================================================================
export const tombolaPrizes = pgTable("tombola_prizes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  prizeType: text("prize_type").notNull(),
  value: integer("value").notNull().default(0),
  probability: real("probability").notNull().default(0),
  totalAvailable: integer("total_available").notNull().default(0),
  totalClaimed: integer("total_claimed").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const tombolaSpins = pgTable("tombola_spins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull(),
  prizeId: varchar("prize_id"),
  result: text("result"),
  spinData: jsonb("spin_data").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const tombolaConfig = pgTable("tombola_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  maxSpinsPerDay: integer("max_spins_per_day").notNull().default(3),
  isActive: boolean("is_active").notNull().default(true),
  settings: jsonb("settings").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const couponTemplates = pgTable("coupon_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  code: text("code").notNull(),
  discountType: text("discount_type").notNull(),
  discountValue: integer("discount_value").notNull(),
  maxUses: integer("max_uses"),
  currentUses: integer("current_uses").notNull().default(0),
  validFrom: timestamp("valid_from"),
  validUntil: timestamp("valid_until"),
  isActive: boolean("is_active").notNull().default(true),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const issuedCoupons = pgTable("issued_coupons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  templateId: varchar("template_id").notNull(),
  heroId: varchar("hero_id"),
  code: text("code").notNull(),
  status: text("status").notNull().default("active"),
  redeemedAt: timestamp("redeemed_at"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// ============================================================================
// PLANET MISSIONS & METAVERSE
// ============================================================================
export const planetMissions = pgTable("planet_missions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  missionType: text("mission_type").notNull(),
  difficulty: text("difficulty").notNull().default("easy"),
  pointsReward: integer("points_reward").notNull().default(0),
  requirements: jsonb("requirements").default({}),
  isActive: boolean("is_active").notNull().default(true),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  maxParticipants: integer("max_participants"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const heroMissionProgress = pgTable("hero_mission_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull(),
  missionId: varchar("mission_id").notNull(),
  status: text("status").notNull().default("accepted"),
  progress: integer("progress").notNull().default(0),
  completedAt: timestamp("completed_at"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const planetPointsTransactions = pgTable("planet_points_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull(),
  amount: integer("amount").notNull(),
  transactionType: text("transaction_type").notNull(),
  description: text("description"),
  referenceId: varchar("reference_id"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const metaverseAvatars = pgTable("metaverse_avatars", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull(),
  avatarName: text("avatar_name"),
  avatarType: text("avatar_type").notNull().default("default"),
  appearance: jsonb("appearance").default({}),
  level: integer("level").notNull().default(1),
  experience: integer("experience").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const achievementBadges = pgTable("achievement_badges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  badgeType: text("badge_type").notNull(),
  iconUrl: text("icon_url"),
  requirements: jsonb("requirements").default({}),
  pointsRequired: integer("points_required").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const heroBadges = pgTable("hero_badges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull(),
  badgeId: varchar("badge_id").notNull(),
  earnedAt: timestamp("earned_at").notNull().default(sql`now()`),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const metaverseRewards = pgTable("metaverse_rewards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  rewardType: text("reward_type").notNull(),
  pointsCost: integer("points_cost").notNull().default(0),
  quantity: integer("quantity"),
  isActive: boolean("is_active").notNull().default(true),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const rewardRedemptions = pgTable("reward_redemptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull(),
  rewardId: varchar("reward_id").notNull(),
  status: text("status").notNull().default("pending"),
  redeemedAt: timestamp("redeemed_at"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const dailyQuests = pgTable("daily_quests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  questType: text("quest_type").notNull(),
  pointsReward: integer("points_reward").notNull().default(0),
  requirements: jsonb("requirements").default({}),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// ============================================================================
// CITIES & SEASONS
// ============================================================================
export const cities = pgTable("cities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  country: text("country").notNull(),
  region: text("region"),
  isActive: boolean("is_active").notNull().default(true),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const seasons = pgTable("seasons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  isActive: boolean("is_active").notNull().default(true),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// ============================================================================
// EMAIL SUBSCRIBERS & CAMPAIGNS
// ============================================================================
export const emailSubscribers = pgTable("email_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  subscriberType: text("subscriber_type").notNull().default("consumer"),
  source: text("source").notNull().default("website"),
  isActive: boolean("is_active").notNull().default(true),
  unsubscribedAt: timestamp("unsubscribed_at"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const emailCampaigns = pgTable("email_campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  content: text("content"),
  status: text("status").notNull().default("draft"),
  sentAt: timestamp("sent_at"),
  recipientCount: integer("recipient_count").notNull().default(0),
  openCount: integer("open_count").notNull().default(0),
  clickCount: integer("click_count").notNull().default(0),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// ============================================================================
// CORPORATE LEADS
// ============================================================================
export const corporateLeads = pgTable("corporate_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  industry: text("industry"),
  employeeCount: text("employee_count"),
  requirements: text("requirements"),
  status: text("status").notNull().default("new"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// ============================================================================
// SPONSORED MISSIONS & MISSION SPONSORSHIPS
// ============================================================================
export const sponsoredMissions = pgTable("sponsored_missions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sponsorId: varchar("sponsor_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  missionType: text("mission_type").notNull(),
  budget: integer("budget").notNull().default(0),
  pointsReward: integer("points_reward").notNull().default(0),
  maxParticipants: integer("max_participants"),
  isActive: boolean("is_active").notNull().default(true),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const missionSponsorships = pgTable("mission_sponsorships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  missionId: varchar("mission_id").notNull(),
  sponsorId: varchar("sponsor_id").notNull(),
  amount: integer("amount").notNull().default(0),
  status: text("status").notNull().default("active"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// ============================================================================
// STARS PURCHASES
// ============================================================================
export const starsPurchases = pgTable("stars_purchases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id"),
  starsTier: text("stars_tier").notNull(),
  amountUSD: integer("amount_usd").notNull(),
  starsAwarded: integer("stars_awarded").notNull().default(0),
  paymentGateway: text("payment_gateway").notNull().default("stripe"),
  paymentStatus: text("payment_status").notNull().default("pending"),
  contributorName: text("contributor_name"),
  contributorEmail: text("contributor_email"),
  isAnonymous: boolean("is_anonymous").notNull().default(false),
  displayOnLeaderboard: boolean("display_on_leaderboard").notNull().default(true),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// ============================================================================
// WATER FILTRATION
// ============================================================================
export const waterFiltrationProjects = pgTable("water_filtration_projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  location: text("location"),
  goalAmount: integer("goal_amount").notNull().default(0),
  currentAmount: integer("current_amount").notNull().default(0),
  status: text("status").notNull().default("active"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const waterFiltrationContributions = pgTable("water_filtration_contributions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull(),
  heroId: varchar("hero_id"),
  amount: integer("amount").notNull(),
  contributorName: text("contributor_name"),
  contributorEmail: text("contributor_email"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// ============================================================================
// COMMISSION CLAIMS
// ============================================================================
export const commissionClaims = pgTable("commission_claims", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull(),
  amount: integer("amount").notNull(),
  claimType: text("claim_type").notNull(),
  status: text("status").notNull().default("pending"),
  referenceId: varchar("reference_id"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// ============================================================================
// LEADS (for partners page)
// ============================================================================
export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service"),
  requirements: text("requirements"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// ============================================================================
// CHAINTRACK - SELLERS, ESCROWS, SHIPMENTS, DOCUMENTS, AML, COMPLIANCE, AUDIT, INVENTORY
// ============================================================================
export const chaintrackSellers = pgTable("chaintrack_sellers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  companyName: text("company_name").notNull(),
  gstin: text("gstin"),
  iecCode: text("iec_code"),
  panNumber: text("pan_number"),
  sellerTier: text("seller_tier").notNull().default("standard"),
  hasSubscription: boolean("has_subscription").notNull().default(false),
  kycStatus: text("kyc_status").notNull().default("pending"),
  verificationStatus: text("verification_status").notNull().default("pending"),
  verifiedAt: timestamp("verified_at"),
  sanctionsScreeningStatus: text("sanctions_screening_status"),
  sanctionsScreeningDate: timestamp("sanctions_screening_date"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const chaintrackEscrows = pgTable("chaintrack_escrows", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  escrowNumber: text("escrow_number"),
  sellerId: varchar("seller_id").notNull(),
  buyerId: varchar("buyer_id"),
  totalAmount: integer("total_amount").notNull().default(0),
  currency: text("currency").notNull().default("USD"),
  commissionRate: integer("commission_rate").notNull().default(0),
  commissionFee: integer("commission_fee").notNull().default(0),
  escrowFixedFee: integer("escrow_fixed_fee").notNull().default(0),
  fxFee: integer("fx_fee").notNull().default(0),
  totalFees: integer("total_fees").notNull().default(0),
  netToSeller: integer("net_to_seller").notNull().default(0),
  customsBrokerageFee: integer("customs_brokerage_fee").notNull().default(0),
  fastReleaseFee: integer("fast_release_fee").notNull().default(0),
  rodtepCredit: integer("rodtep_credit").notNull().default(0),
  partialReleasePercent: integer("partial_release_percent").default(70),
  partialReleasedAmount: integer("partial_released_amount"),
  partialReleasedAt: timestamp("partial_released_at"),
  partialReleaseSwiftRef: text("partial_release_swift_ref"),
  fullReleasedAmount: integer("full_released_amount"),
  fullReleasedAt: timestamp("full_released_at"),
  fullReleaseSwiftRef: text("full_release_swift_ref"),
  buyerDepositSwiftRef: text("buyer_deposit_swift_ref"),
  buyerDepositDate: timestamp("buyer_deposit_date"),
  buyerRemittanceAdviceUrl: text("buyer_remittance_advice_url"),
  caAttested: boolean("ca_attested").notNull().default(false),
  caName: text("ca_name"),
  caCertificateNumber: text("ca_certificate_number"),
  caAttestationUrl: text("ca_attestation_url"),
  status: text("status").notNull().default("pending"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const chaintrackShipments = pgTable("chaintrack_shipments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  escrowId: varchar("escrow_id").notNull(),
  invoiceNumber: text("invoice_number"),
  shippingBillNumber: text("shipping_bill_number"),
  icegateReference: text("icegate_reference"),
  fircNumber: text("firc_number"),
  hsCode: text("hs_code"),
  productDescription: text("product_description"),
  quantity: integer("quantity").notNull().default(0),
  fobValue: integer("fob_value").notNull().default(0),
  status: text("status").notNull().default("pending"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const chaintrackDocuments = pgTable("chaintrack_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerId: varchar("seller_id"),
  escrowId: varchar("escrow_id"),
  shipmentId: varchar("shipment_id"),
  documentType: text("document_type").notNull(),
  documentName: text("document_name").notNull(),
  documentUrl: text("document_url"),
  verificationStatus: text("verification_status").notNull().default("pending"),
  verifiedAt: timestamp("verified_at"),
  verifiedBy: text("verified_by"),
  uploadedBy: text("uploaded_by"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const chaintrackAmlLogs = pgTable("chaintrack_aml_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerId: varchar("seller_id"),
  escrowId: varchar("escrow_id"),
  eventType: text("event_type").notNull(),
  riskLevel: text("risk_level").notNull().default("low"),
  flagReason: text("flag_reason"),
  screeningProvider: text("screening_provider"),
  screeningResult: text("screening_result"),
  status: text("status").notNull().default("pending"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const chaintrackComplianceAlerts = pgTable("chaintrack_compliance_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerId: varchar("seller_id"),
  escrowId: varchar("escrow_id"),
  alertType: text("alert_type").notNull(),
  severity: text("severity").notNull().default("medium"),
  message: text("message").notNull(),
  status: text("status").notNull().default("open"),
  resolvedAt: timestamp("resolved_at"),
  acknowledgedBy: text("acknowledged_by"),
  resolutionNotes: text("resolution_notes"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const chaintrackAuditLogs = pgTable("chaintrack_audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  action: text("action").notNull(),
  resourceType: text("resource_type").notNull(),
  resourceId: varchar("resource_id"),
  changes: jsonb("changes").default({}),
  previousLogHash: text("previous_log_hash"),
  currentLogHash: text("current_log_hash"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const chaintrackInventory = pgTable("chaintrack_inventory", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  supplierId: varchar("supplier_id"),
  productName: text("product_name").notNull(),
  productType: text("product_type"),
  hsCode: text("hs_code"),
  quantity: integer("quantity").notNull().default(0),
  unitPrice: integer("unit_price").notNull().default(0),
  currency: text("currency").notNull().default("USD"),
  status: text("status").notNull().default("available"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const chaintrackAuctions = pgTable("chaintrack_auctions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  inventoryId: varchar("inventory_id"),
  sellerId: varchar("seller_id"),
  title: text("title").notNull(),
  description: text("description"),
  startingPrice: integer("starting_price").notNull().default(0),
  currentPrice: integer("current_price").notNull().default(0),
  buyerId: varchar("buyer_id"),
  status: text("status").notNull().default("active"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const chaintrackBids = pgTable("chaintrack_bids", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  auctionId: varchar("auction_id").notNull(),
  bidderId: varchar("bidder_id").notNull(),
  amount: integer("amount").notNull(),
  status: text("status").notNull().default("pending"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const chaintrackSuppliers = pgTable("chaintrack_suppliers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name"),
  email: text("email"),
  phone: text("phone"),
  country: text("country"),
  supplierType: text("supplier_type"),
  status: text("status").notNull().default("active"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// ============================================================================
// FULFILLMENT BY DELIWER
// ============================================================================
export const fulfillmentResellers = pgTable("fulfillment_resellers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  companyName: text("company_name"),
  contactName: text("contact_name"),
  email: text("email"),
  phone: text("phone"),
  resellerTier: text("reseller_tier").notNull().default("starter"),
  kycStatus: text("kyc_status").notNull().default("pending"),
  verifiedAt: timestamp("verified_at"),
  verifiedBy: text("verified_by"),
  totalOrders: integer("total_orders").notNull().default(0),
  totalRevenue: integer("total_revenue").notNull().default(0),
  averageOrderValue: integer("average_order_value").notNull().default(0),
  monthlyOrderVolume: integer("monthly_order_volume").notNull().default(0),
  reputationScore: integer("reputation_score").notNull().default(0),
  status: text("status").notNull().default("active"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const fulfillmentOrders = pgTable("fulfillment_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  resellerId: varchar("reseller_id").notNull(),
  orderNumber: text("order_number"),
  items: jsonb("items").notNull().default([]),
  totalAmount: integer("total_amount").notNull().default(0),
  currency: text("currency").notNull().default("USD"),
  paymentStatus: text("payment_status").notNull().default("pending"),
  paidAt: timestamp("paid_at"),
  paymentMethod: text("payment_method"),
  paymentReference: text("payment_reference"),
  fulfillmentStatus: text("fulfillment_status").notNull().default("pending"),
  shippedAt: timestamp("shipped_at"),
  shippingCarrier: text("shipping_carrier"),
  trackingNumber: text("tracking_number"),
  trackingUrl: text("tracking_url"),
  deliveredAt: timestamp("delivered_at"),
  cancelledAt: timestamp("cancelled_at"),
  cancellationReason: text("cancellation_reason"),
  shippingAddress: jsonb("shipping_address").default({}),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const resellerInventorySubscriptions = pgTable("reseller_inventory_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  resellerId: varchar("reseller_id").notNull(),
  productType: text("product_type").notNull(),
  quantity: integer("quantity").notNull().default(0),
  status: text("status").notNull().default("active"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const fulfillmentPricing = pgTable("fulfillment_pricing", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productType: text("product_type").notNull(),
  condition: text("condition"),
  storage: text("storage"),
  color: text("color"),
  grade: text("grade"),
  starterPrice: integer("starter_price").notNull().default(0),
  growthPrice: integer("growth_price").notNull().default(0),
  enterprisePrice: integer("enterprise_price").notNull().default(0),
  sourceCountry: text("source_country"),
  isActive: boolean("is_active").notNull().default(true),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// ============================================================================
// INSERT SCHEMAS - Existing tables
// ============================================================================
export const insertHeroSchema = createInsertSchema(heroes).omit({ id: true, createdAt: true });
export const insertTradeInSchema = createInsertSchema(tradeIns).omit({ id: true, createdAt: true });
export const insertContactSchema = createInsertSchema(contacts).omit({ id: true, createdAt: true });
export const insertQuoteSchema = createInsertSchema(quotes).omit({ id: true, createdAt: true });
export const insertSponsorSchema = createInsertSchema(sponsors).omit({ id: true, createdAt: true });
export const insertWellnessPassportSchema = createInsertSchema(wellnessPassports).omit({ id: true, createdAt: true });
export const insertWellnessJourneySchema = createInsertSchema(wellnessJourneys).omit({ id: true, createdAt: true });
export const insertWellnessJourneyStepSchema = createInsertSchema(wellnessJourneySteps).omit({ id: true, createdAt: true });
export const insertAquaShowPerkSchema = createInsertSchema(aquaShowPerks).omit({ id: true, createdAt: true });
export const insertLuxuryHotelPartnerSchema = createInsertSchema(luxuryHotelPartners).omit({ id: true, createdAt: true });
export const insertRestaurantPartnerSchema = createInsertSchema(restaurantPartners).omit({ id: true, createdAt: true });
export const insertWellnessJourneyParticipantSchema = createInsertSchema(wellnessJourneyParticipants).omit({ id: true, createdAt: true });

// INSERT SCHEMAS - New tables
export const insertEjariConversationSchema = createInsertSchema(ejariConversations).omit({ id: true, createdAt: true, updatedAt: true });
export const insertRelocateLeadSchema = createInsertSchema(relocateLeads).omit({ id: true, createdAt: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });
export const insertCustomerSchema = createInsertSchema(customers).omit({ id: true, createdAt: true });
export const insertLoyaltyMembershipSchema = createInsertSchema(loyaltyMemberships).omit({ id: true, createdAt: true });
export const insertDigitalVoucherSchema = createInsertSchema(digitalVouchers).omit({ id: true, createdAt: true });
export const insertTombolaPrizeSchema = createInsertSchema(tombolaPrizes).omit({ id: true, createdAt: true });
export const insertTombolaSpinSchema = createInsertSchema(tombolaSpins).omit({ id: true, createdAt: true });
export const insertCouponTemplateSchema = createInsertSchema(couponTemplates).omit({ id: true, createdAt: true });
export const insertIssuedCouponSchema = createInsertSchema(issuedCoupons).omit({ id: true, createdAt: true });
export const insertPlanetMissionSchema = createInsertSchema(planetMissions).omit({ id: true, createdAt: true });
export const insertHeroMissionProgressSchema = createInsertSchema(heroMissionProgress).omit({ id: true, createdAt: true });
export const insertMetaverseAvatarSchema = createInsertSchema(metaverseAvatars).omit({ id: true, createdAt: true, updatedAt: true });
export const insertAchievementBadgeSchema = createInsertSchema(achievementBadges).omit({ id: true, createdAt: true });
export const insertHeroBadgeSchema = createInsertSchema(heroBadges).omit({ id: true, createdAt: true });
export const insertMetaverseRewardSchema = createInsertSchema(metaverseRewards).omit({ id: true, createdAt: true });
export const insertRewardRedemptionSchema = createInsertSchema(rewardRedemptions).omit({ id: true, createdAt: true });
export const insertDailyQuestSchema = createInsertSchema(dailyQuests).omit({ id: true, createdAt: true });
export const insertCitySchema = createInsertSchema(cities).omit({ id: true, createdAt: true });
export const insertSeasonSchema = createInsertSchema(seasons).omit({ id: true, createdAt: true });
export const insertEmailSubscriberSchema = createInsertSchema(emailSubscribers).omit({ id: true, createdAt: true });
export const insertEmailCampaignSchema = createInsertSchema(emailCampaigns).omit({ id: true, createdAt: true });
export const insertCorporateLeadSchema = createInsertSchema(corporateLeads).omit({ id: true, createdAt: true });
export const insertSponsoredMissionSchema = createInsertSchema(sponsoredMissions).omit({ id: true, createdAt: true });
export const insertMissionSponsorshipSchema = createInsertSchema(missionSponsorships).omit({ id: true, createdAt: true });
export const insertStarsPurchaseSchema = createInsertSchema(starsPurchases).omit({ id: true, createdAt: true });
export const insertWaterFiltrationProjectSchema = createInsertSchema(waterFiltrationProjects).omit({ id: true, createdAt: true });
export const insertWaterFiltrationContributionSchema = createInsertSchema(waterFiltrationContributions).omit({ id: true, createdAt: true });
export const insertCommissionClaimSchema = createInsertSchema(commissionClaims).omit({ id: true, createdAt: true });
export const insertLeadSchema = createInsertSchema(leads).omit({ id: true, createdAt: true });

// Chaintrack insert schemas
export const insertChaintrackSellerSchema = createInsertSchema(chaintrackSellers).omit({ id: true, createdAt: true, updatedAt: true });
export const insertChaintrackEscrowSchema = createInsertSchema(chaintrackEscrows).omit({ id: true, createdAt: true, updatedAt: true });
export const insertChaintrackShipmentSchema = createInsertSchema(chaintrackShipments).omit({ id: true, createdAt: true, updatedAt: true });
export const insertChaintrackDocumentSchema = createInsertSchema(chaintrackDocuments).omit({ id: true, createdAt: true });
export const insertChaintrackAmlLogSchema = createInsertSchema(chaintrackAmlLogs).omit({ id: true, createdAt: true });
export const insertChaintrackComplianceAlertSchema = createInsertSchema(chaintrackComplianceAlerts).omit({ id: true, createdAt: true });
export const insertChaintrackAuditLogSchema = createInsertSchema(chaintrackAuditLogs).omit({ id: true, createdAt: true });
export const insertChaintrackInventorySchema = createInsertSchema(chaintrackInventory).omit({ id: true, createdAt: true });
export const insertChaintrackBidSchema = createInsertSchema(chaintrackBids).omit({ id: true, createdAt: true });

// Fulfillment insert schemas
export const insertFulfillmentResellerSchema = createInsertSchema(fulfillmentResellers).omit({ id: true, createdAt: true, updatedAt: true });
export const insertFulfillmentOrderSchema = createInsertSchema(fulfillmentOrders).omit({ id: true, createdAt: true, updatedAt: true });
export const insertResellerInventorySubscriptionSchema = createInsertSchema(resellerInventorySubscriptions).omit({ id: true, createdAt: true, updatedAt: true });
export const insertFulfillmentPricingSchema = createInsertSchema(fulfillmentPricing).omit({ id: true, createdAt: true });

// ============================================================================
// STANDALONE ZOD SCHEMAS (not based on createInsertSchema)
// ============================================================================
export const updateHeroSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  points: z.number().optional(),
  level: z.number().optional(),
  badges: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
});

export const updateAvatarSchema = z.object({
  avatarName: z.string().optional(),
  avatarType: z.string().optional(),
  appearance: z.record(z.any()).optional(),
  level: z.number().optional(),
  experience: z.number().optional(),
});

export const acceptMissionSchema = z.object({
  heroId: z.string(),
  missionId: z.string(),
});

export const updateMissionProgressSchema = z.object({
  heroId: z.string(),
  missionId: z.string(),
  progress: z.number(),
  metadata: z.record(z.any()).optional(),
});

export const completeMissionSchema = z.object({
  heroId: z.string(),
  missionId: z.string(),
});

export const redeemRewardSchema = z.object({
  heroId: z.string(),
  rewardId: z.string(),
});

export const redeemCouponSchema = z.object({
  heroId: z.string(),
  couponCode: z.string(),
});

export const progressStepSchema = z.object({
  passportId: z.string(),
  stepId: z.string(),
  status: z.string().optional(),
});

export const phoneRequestSchema = z.object({
  phone: z.string(),
});

export const redeemPassportSchema = z.object({
  passportId: z.string(),
  heroId: z.string(),
});

export const aiDeliPriceRequestSchema = z.object({
  deviceType: z.string(),
  brand: z.string(),
  model: z.string(),
  condition: z.string(),
  storage: z.string().optional(),
  accessories: z.array(z.string()).optional(),
});

export const sellRequestSchema = z.object({
  heroId: z.string(),
  deviceType: z.string(),
  brand: z.string(),
  model: z.string(),
  condition: z.string(),
  estimatedValue: z.number(),
  metadata: z.record(z.any()).optional(),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertHeroSchema>;

export type Hero = typeof heroes.$inferSelect;
export type InsertHero = z.infer<typeof insertHeroSchema>;

export type TradeIn = typeof tradeIns.$inferSelect;
export type InsertTradeIn = z.infer<typeof insertTradeInSchema>;

export type ImpactStats = typeof impactStats.$inferSelect;
export type Referral = typeof referrals.$inferSelect;

export type UpdateHero = z.infer<typeof updateHeroSchema>;

export type DubaiChallenge = typeof dubaiChallenges.$inferSelect;
export type DubaiReward = typeof dubaiRewards.$inferSelect;

export type Sponsor = typeof sponsors.$inferSelect;
export type InsertSponsor = z.infer<typeof insertSponsorSchema>;

export type SponsorshipTier = typeof sponsorshipTiers.$inferSelect;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;

export type LoyaltyMembership = typeof loyaltyMemberships.$inferSelect;
export type InsertLoyaltyMembership = z.infer<typeof insertLoyaltyMembershipSchema>;

export type DigitalVoucher = typeof digitalVouchers.$inferSelect;
export type InsertDigitalVoucher = z.infer<typeof insertDigitalVoucherSchema>;

export type TombolaPrize = typeof tombolaPrizes.$inferSelect;
export type InsertTombolaPrize = z.infer<typeof insertTombolaPrizeSchema>;

export type TombolaSpin = typeof tombolaSpins.$inferSelect;
export type InsertTombolaSpin = z.infer<typeof insertTombolaSpinSchema>;

export type TombolaConfig = typeof tombolaConfig.$inferSelect;

export type CouponTemplate = typeof couponTemplates.$inferSelect;
export type InsertCouponTemplate = z.infer<typeof insertCouponTemplateSchema>;

export type IssuedCoupon = typeof issuedCoupons.$inferSelect;
export type InsertIssuedCoupon = z.infer<typeof insertIssuedCouponSchema>;

export type HeroSpinCount = {
  heroId: string;
  spinCount: number;
};

export type RedeemCoupon = z.infer<typeof redeemCouponSchema>;

export type PlanetMission = typeof planetMissions.$inferSelect;
export type InsertPlanetMission = z.infer<typeof insertPlanetMissionSchema>;

export type HeroMissionProgress = typeof heroMissionProgress.$inferSelect;
export type InsertHeroMissionProgress = z.infer<typeof insertHeroMissionProgressSchema>;

export type PlanetPointsTransaction = typeof planetPointsTransactions.$inferSelect;

export type MetaverseAvatar = typeof metaverseAvatars.$inferSelect;
export type InsertMetaverseAvatar = z.infer<typeof insertMetaverseAvatarSchema>;

export type AchievementBadge = typeof achievementBadges.$inferSelect;
export type InsertAchievementBadge = z.infer<typeof insertAchievementBadgeSchema>;

export type HeroBadge = typeof heroBadges.$inferSelect;
export type InsertHeroBadge = z.infer<typeof insertHeroBadgeSchema>;

export type MetaverseReward = typeof metaverseRewards.$inferSelect;
export type InsertMetaverseReward = z.infer<typeof insertMetaverseRewardSchema>;

export type RewardRedemption = typeof rewardRedemptions.$inferSelect;
export type InsertRewardRedemption = z.infer<typeof insertRewardRedemptionSchema>;

export type DailyQuest = typeof dailyQuests.$inferSelect;
export type InsertDailyQuest = z.infer<typeof insertDailyQuestSchema>;

export type WellnessPassport = typeof wellnessPassports.$inferSelect;
export type InsertWellnessPassport = z.infer<typeof insertWellnessPassportSchema>;

export type WellnessJourney = typeof wellnessJourneys.$inferSelect;
export type InsertWellnessJourney = z.infer<typeof insertWellnessJourneySchema>;

export type WellnessJourneyStep = typeof wellnessJourneySteps.$inferSelect;
export type InsertWellnessJourneyStep = z.infer<typeof insertWellnessJourneyStepSchema>;

export type AquaShowPerk = typeof aquaShowPerks.$inferSelect;
export type InsertAquaShowPerk = z.infer<typeof insertAquaShowPerkSchema>;

export type LuxuryHotelPartner = typeof luxuryHotelPartners.$inferSelect;
export type InsertLuxuryHotelPartner = z.infer<typeof insertLuxuryHotelPartnerSchema>;

export type RestaurantPartner = typeof restaurantPartners.$inferSelect;
export type InsertRestaurantPartner = z.infer<typeof insertRestaurantPartnerSchema>;

export type WellnessJourneyParticipant = typeof wellnessJourneyParticipants.$inferSelect;
export type InsertWellnessJourneyParticipant = z.infer<typeof insertWellnessJourneyParticipantSchema>;

export type City = typeof cities.$inferSelect;
export type InsertCity = z.infer<typeof insertCitySchema>;

export type Season = typeof seasons.$inferSelect;
export type InsertSeason = z.infer<typeof insertSeasonSchema>;

export type EjariConversation = typeof ejariConversations.$inferSelect;
export type InsertEjariConversation = z.infer<typeof insertEjariConversationSchema>;

export type ChaintrackMembershipTier = typeof chaintrackMembershipTiers.$inferSelect;

export type ChaintrackAuction = typeof chaintrackAuctions.$inferSelect;
export type ChaintrackBid = typeof chaintrackBids.$inferSelect;
export type ChaintrackSupplier = typeof chaintrackSuppliers.$inferSelect;

export type StarsPurchase = typeof starsPurchases.$inferSelect;

export type InsertLead = z.infer<typeof insertLeadSchema>;

// Affiliates / Partner Payout System
export const affiliates = pgTable("affiliates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  email: text("email").notNull(),
  phone: text("phone"),
  commissionPercent: real("commission_percent").notNull().default(30), // % of DeliWer fee paid to affiliate
  totalEarnings: real("total_earnings").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertAffiliateSchema = createInsertSchema(affiliates).omit({ id: true, createdAt: true, totalEarnings: true });
export type Affiliate = typeof affiliates.$inferSelect;
export type InsertAffiliate = z.infer<typeof insertAffiliateSchema>;

export const affiliateLeads = pgTable("affiliate_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  affiliateId: varchar("affiliate_id").references(() => affiliates.id),
  affiliateCode: text("affiliate_code"),
  tenantName: text("tenant_name"),
  tenantPhone: text("tenant_phone"),
  unitSize: text("unit_size"), // 'studio', '1br', '2br', '3br_villa'
  serviceValue: real("service_value"), // total vendor cost paid by tenant
  deliwerFee: real("deliwer_fee"), // 10-15% embedded in vendor price
  affiliateCommission: real("affiliate_commission"), // 30% of deliwer_fee
  status: text("status").notNull().default("pending"), // pending | confirmed | paid
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertAffiliateleadSchema = createInsertSchema(affiliateLeads).omit({ id: true, createdAt: true });
export type AffiliateLead = typeof affiliateLeads.$inferSelect;
export type InsertAffiliateLead = z.infer<typeof insertAffiliateleadSchema>;

// ─── Broker Master (Central Lifecycle Table) ─────────────────────────────────

export const brokerMaster = pgTable("broker_master", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  phone: text("phone"),
  license: text("license"),
  refCode: text("ref_code"),
  partnerLink: text("partner_link"),
  status: text("status").notNull().default("new"), // new | sent | followed_up | converted
  followUpCount: integer("follow_up_count").notNull().default(0),
  firstContactedAt: timestamp("first_contacted_at"),
  lastContactedAt: timestamp("last_contacted_at"),
  response: text("response"),
  leadsGenerated: integer("leads_generated").notNull().default(0),
  source: text("source").notNull().default("manual"), // manual | rera_auto
  company: text("company"),
  deleted: boolean("deleted").notNull().default(false),
  // ── Social Handles ────────────────────────────────────────────────────────
  linkedinUrl: text("linkedin_url"),
  instagramHandle: text("instagram_handle"),
  twitterHandle: text("twitter_handle"),
  facebookUrl: text("facebook_url"),
  gmbUrl: text("gmb_url"),
  socialDiscoveryStatus: text("social_discovery_status").default("pending"), // pending | discovering | found | not_found
  socialDiscoveredAt: timestamp("social_discovered_at"),
  socialNotes: text("social_notes"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const insertBrokerMasterSchema = createInsertSchema(brokerMaster).omit({ id: true, createdAt: true, updatedAt: true });
export type BrokerMaster = typeof brokerMaster.$inferSelect;
export type InsertBrokerMaster = z.infer<typeof insertBrokerMasterSchema>;

// ─── Broker Automation Logs ───────────────────────────────────────────────────

export const brokerAutomationLog = pgTable("broker_automation_log", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  runType: text("run_type").notNull(), // daily | followup | manual_fetch | manual_followup
  status: text("status").notNull().default("running"), // running | completed | failed
  brokersFound: integer("brokers_found").notNull().default(0),
  newBrokers: integer("new_brokers").notNull().default(0),
  emailsSent: integer("emails_sent").notNull().default(0),
  followUpsSent: integer("follow_ups_sent").notNull().default(0),
  errors: text("errors"),
  startedAt: timestamp("started_at").notNull().default(sql`now()`),
  completedAt: timestamp("completed_at"),
});

export type BrokerAutomationLog = typeof brokerAutomationLog.$inferSelect;

// ─── Intent Signal Interception ──────────────────────────────────────────────

export const intentSignals = pgTable("intent_signals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  source: text("source").notNull(), // whatsapp_group | linkedin | facebook | instagram | telegram | bayut | dubizzle
  community: text("community").notNull(),
  signalText: text("signal_text").notNull(),
  intentType: text("intent_type").notNull(), // relocation | moving | home_services | dewa_setup | ejari | broker_referral
  intentScore: integer("intent_score").notNull().default(50), // 1-100
  contactName: text("contact_name"),
  contactHandle: text("contact_handle"),
  area: text("area"),
  status: text("status").notNull().default("new"), // new | contacted | converted | dismissed
  captureType: text("capture_type").notNull().default("ai_example"), // manual | ai_example
  aiResponse: text("ai_response"),
  capturedAt: timestamp("captured_at").notNull().default(sql`now()`),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertIntentSignalSchema = createInsertSchema(intentSignals).omit({ id: true, createdAt: true });
export type IntentSignal = typeof intentSignals.$inferSelect;
export type InsertIntentSignal = z.infer<typeof insertIntentSignalSchema>;

// ─── Broker Recruitment Campaigns ───────────────────────────────────────────

export const brokerCampaigns = pgTable("broker_campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  status: text("status").notNull().default("idle"), // idle | running | paused | completed
  totalBrokers: integer("total_brokers").notNull().default(0),
  sentCount: integer("sent_count").notNull().default(0),
  failedCount: integer("failed_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  completedAt: timestamp("completed_at"),
});

export const insertBrokerCampaignSchema = createInsertSchema(brokerCampaigns).omit({ id: true, createdAt: true, completedAt: true });
export type BrokerCampaign = typeof brokerCampaigns.$inferSelect;
export type InsertBrokerCampaign = z.infer<typeof insertBrokerCampaignSchema>;

export const brokerCampaignEntries = pgTable("broker_campaign_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  campaignId: varchar("campaign_id").notNull().references(() => brokerCampaigns.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  license: text("license"),
  refCode: text("ref_code").notNull(),
  partnerLink: text("partner_link").notNull(),
  status: text("status").notNull().default("pending"), // pending | sent | failed | skipped
  sentAt: timestamp("sent_at"),
  errorMessage: text("error_message"),
});

export const insertBrokerCampaignEntrySchema = createInsertSchema(brokerCampaignEntries).omit({ id: true, sentAt: true });
export type BrokerCampaignEntry = typeof brokerCampaignEntries.$inferSelect;
export type InsertBrokerCampaignEntry = z.infer<typeof insertBrokerCampaignEntrySchema>;

// ── Emergency Evacuation Profiles ─────────────────────────────────────────────

export const emergencyEvacuationProfiles = pgTable("emergency_evacuation_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  planCode: text("plan_code").notNull().unique(),
  fullName: text("full_name").notNull(),
  nationality: text("nationality").notNull(),
  currentArea: text("current_area").notNull(),
  visaType: text("visa_type").notNull(),
  familyCount: integer("family_count").notNull().default(1),
  hasPets: boolean("has_pets").notNull().default(false),
  medicalNeeds: text("medical_needs"),
  emergencyContactName: text("emergency_contact_name").notNull(),
  emergencyContactPhone: text("emergency_contact_phone").notNull(),
  emergencyContactCountry: text("emergency_contact_country").notNull(),
  preferredExitRoute: text("preferred_exit_route").notNull(),
  vehicleAvailable: boolean("vehicle_available").notNull().default(false),
  whatsapp: text("whatsapp"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertEmergencyEvacuationSchema = createInsertSchema(emergencyEvacuationProfiles).omit({
  id: true, createdAt: true,
});
export type EmergencyEvacuationProfile = typeof emergencyEvacuationProfiles.$inferSelect;
export type InsertEmergencyEvacuation = z.infer<typeof insertEmergencyEvacuationSchema>;

// ── Wartime Readiness Members ─────────────────────────────────────────────────

export const wartimeMembers = pgTable("wartime_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  memberCode: text("member_code").notNull().unique(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  whatsapp: text("whatsapp"),
  area: text("area").notNull(),
  skills: text("skills").array().notNull().default([]),
  familyCount: integer("family_count").notNull().default(1),
  hasPets: boolean("has_pets").notNull().default(false),
  medicalNeeds: text("medical_needs"),
  alertPreference: text("alert_preference").notNull().default("whatsapp"),
  hasSupplyKit: boolean("has_supply_kit").notNull().default(false),
  hasEvacPlan: boolean("has_evac_plan").notNull().default(false),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertWartimeMemberSchema = createInsertSchema(wartimeMembers).omit({
  id: true, createdAt: true,
});
export type WartimeMember = typeof wartimeMembers.$inferSelect;
export type InsertWartimeMember = z.infer<typeof insertWartimeMemberSchema>;

// ── Tips/Alerts Send Log ──────────────────────────────────────────────────────

export const tipsSendLog = pgTable("tips_send_log", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tipId: text("tip_id").notNull(),
  tipTitle: text("tip_title").notNull(),
  tipCategory: text("tip_category").notNull().default("general"),
  sentAt: timestamp("sent_at").notNull().default(sql`now()`),
  recipientCount: integer("recipient_count").notNull().default(0),
  successCount: integer("success_count").notNull().default(0),
  failCount: integer("fail_count").notNull().default(0),
  type: text("type").notNull().default("daily_tips"),
  subject: text("subject").notNull().default(""),
});

// ── Tenant Capture System ─────────────────────────────────────────────────────

export const tenantReferrers = pgTable("tenant_referrers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  whatsapp: text("whatsapp").notNull(),
  refId: text("ref_id").notNull().unique(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertTenantReferrerSchema = createInsertSchema(tenantReferrers).omit({ id: true, createdAt: true });
export type TenantReferrer = typeof tenantReferrers.$inferSelect;
export type InsertTenantReferrer = z.infer<typeof insertTenantReferrerSchema>;

export const tenantLeads = pgTable("tenant_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  intent: text("intent").notNull(),
  servicesNeeded: text("services_needed").array().notNull().default(sql`'{}'::text[]`),
  propertyType: text("property_type"),
  location: text("location"),
  budget: text("budget"),
  timeline: text("timeline"),
  referrerId: text("referrer_id"),
  status: text("status").notNull().default("new"),
  score: integer("score").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertTenantLeadSchema = createInsertSchema(tenantLeads).omit({ id: true, createdAt: true, score: true });
export type TenantLead = typeof tenantLeads.$inferSelect;
export type InsertTenantLead = z.infer<typeof insertTenantLeadSchema>;
