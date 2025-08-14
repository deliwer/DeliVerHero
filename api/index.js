// api/index.ts
import express from "express";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  heroes;
  tradeIns;
  impactStats;
  referrals;
  constructor() {
    this.heroes = /* @__PURE__ */ new Map();
    this.tradeIns = /* @__PURE__ */ new Map();
    this.referrals = /* @__PURE__ */ new Map();
    this.impactStats = {
      id: randomUUID(),
      totalBottlesPrevented: 847392,
      totalCo2Saved: 423700,
      // in grams (423.7 tons)
      totalRewards: 892e5,
      // AED 892K in fils
      activeHeroes: 12847,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.seedInitialData();
  }
  seedInitialData() {
    const initialHeroes = [
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-01-15"),
        updatedAt: /* @__PURE__ */ new Date()
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-01-20"),
        updatedAt: /* @__PURE__ */ new Date()
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-02-01"),
        updatedAt: /* @__PURE__ */ new Date()
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-02-15"),
        updatedAt: /* @__PURE__ */ new Date()
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-03-01"),
        updatedAt: /* @__PURE__ */ new Date()
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-03-15"),
        updatedAt: /* @__PURE__ */ new Date()
      },
      {
        id: "founder-7",
        name: "Hassan Al-Nuaimi",
        email: "hassan@deliwer.com",
        phoneModel: "iPhone 14",
        phoneCondition: "excellent",
        tradeValue: 1e3,
        points: 5345,
        level: "Silver Hero",
        badges: ["Planet Protector", "Green Innovator"],
        bottlesPrevented: 2891,
        co2Saved: 1445,
        referralCount: 10,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-04-01"),
        updatedAt: /* @__PURE__ */ new Date()
      },
      {
        id: "founder-8",
        name: "Mariam Al-Kaabi",
        email: "mariam@deliwer.com",
        phoneModel: "iPhone 13 Pro",
        phoneCondition: "excellent",
        tradeValue: 1e3,
        points: 4890,
        level: "Silver Hero",
        badges: ["Water Warrior", "Eco Champion"],
        bottlesPrevented: 2657,
        co2Saved: 1328,
        referralCount: 9,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-04-15"),
        updatedAt: /* @__PURE__ */ new Date()
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-05-01"),
        updatedAt: /* @__PURE__ */ new Date()
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-05-15"),
        updatedAt: /* @__PURE__ */ new Date()
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
        co2Saved: 1e3,
        referralCount: 6,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-06-01"),
        updatedAt: /* @__PURE__ */ new Date()
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-06-15"),
        updatedAt: /* @__PURE__ */ new Date()
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-07-01"),
        updatedAt: /* @__PURE__ */ new Date()
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-07-15"),
        updatedAt: /* @__PURE__ */ new Date()
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-08-01"),
        updatedAt: /* @__PURE__ */ new Date()
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-08-05"),
        updatedAt: /* @__PURE__ */ new Date()
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-08-08"),
        updatedAt: /* @__PURE__ */ new Date()
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-08-10"),
        updatedAt: /* @__PURE__ */ new Date()
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-08-12"),
        updatedAt: /* @__PURE__ */ new Date()
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
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-08-13"),
        updatedAt: /* @__PURE__ */ new Date()
      }
    ];
    initialHeroes.forEach((hero) => this.heroes.set(hero.id, hero));
  }
  async getHero(id) {
    return this.heroes.get(id);
  }
  async getHeroByEmail(email) {
    return Array.from(this.heroes.values()).find((hero) => hero.email === email);
  }
  async createHero(insertHero) {
    const id = randomUUID();
    const points = 100;
    const bottlesPrevented = Math.floor(insertHero.tradeValue / 0.5);
    const co2Saved = Math.floor(bottlesPrevented * 0.5);
    let level = "Bronze Hero";
    if (points >= 600) level = "Gold Hero";
    else if (points >= 300) level = "Silver Hero";
    const hero = {
      id,
      ...insertHero,
      points,
      level,
      badges: ["Water Warrior"],
      bottlesPrevented,
      co2Saved,
      referralCount: 0,
      isActive: true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.heroes.set(id, hero);
    this.impactStats.totalBottlesPrevented += bottlesPrevented;
    this.impactStats.totalCo2Saved += co2Saved;
    this.impactStats.totalRewards += insertHero.tradeValue * 100;
    this.impactStats.activeHeroes += 1;
    this.impactStats.updatedAt = /* @__PURE__ */ new Date();
    return hero;
  }
  async updateHero(id, updates) {
    const hero = this.heroes.get(id);
    if (!hero) return void 0;
    const updatedHero = {
      ...hero,
      ...updates,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.heroes.set(id, updatedHero);
    return updatedHero;
  }
  async getTopHeroes(limit = 10) {
    return Array.from(this.heroes.values()).filter((hero) => hero.isActive).sort((a, b) => b.points - a.points).slice(0, limit);
  }
  async getAllHeroes() {
    return Array.from(this.heroes.values()).filter((hero) => hero.isActive);
  }
  async createTradeIn(insertTradeIn) {
    const id = randomUUID();
    const tradeIn = {
      id,
      ...insertTradeIn,
      status: "pending",
      completedAt: null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.tradeIns.set(id, tradeIn);
    return tradeIn;
  }
  async getTradeInsByHero(heroId) {
    return Array.from(this.tradeIns.values()).filter((tradeIn) => tradeIn.heroId === heroId);
  }
  async updateTradeInStatus(id, status) {
    const tradeIn = this.tradeIns.get(id);
    if (!tradeIn) return void 0;
    const updatedTradeIn = {
      ...tradeIn,
      status,
      completedAt: status === "completed" ? /* @__PURE__ */ new Date() : tradeIn.completedAt
    };
    this.tradeIns.set(id, updatedTradeIn);
    return updatedTradeIn;
  }
  async getImpactStats() {
    return this.impactStats;
  }
  async updateImpactStats(stats) {
    this.impactStats = {
      ...this.impactStats,
      ...stats,
      updatedAt: /* @__PURE__ */ new Date()
    };
    return this.impactStats;
  }
  async createReferral(referrerId, refereeId) {
    const id = randomUUID();
    const referral = {
      id,
      referrerId,
      refereeId,
      pointsEarned: 50,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.referrals.set(id, referral);
    const referrer = this.heroes.get(referrerId);
    if (referrer) {
      await this.updateHero(referrerId, {
        points: referrer.points + 50,
        referralCount: referrer.referralCount + 1
      });
    }
    return referral;
  }
  async getReferralsByHero(heroId) {
    return Array.from(this.referrals.values()).filter((referral) => referral.referrerId === heroId);
  }
  async calculateTradeValue(phoneModel, condition) {
    const baseValues = {
      "iPhone 15 Pro Max": 1500,
      "iPhone 15 Pro": 1400,
      "iPhone 15": 1200,
      "iPhone 14 Pro Max": 1300,
      "iPhone 14 Pro": 1200,
      "iPhone 14": 1e3,
      "iPhone 13 Pro Max": 1100,
      "iPhone 13 Pro": 1e3,
      "iPhone 13": 900,
      "iPhone 12 Pro Max": 900,
      "iPhone 12 Pro": 800,
      "iPhone 12": 700,
      "iPhone 11 Pro Max": 700,
      "iPhone 11 Pro": 600,
      "iPhone 11": 500
    };
    const conditionMultipliers = {
      "excellent": 1,
      "good": 0.85,
      "fair": 0.65,
      "poor": 0.4
    };
    const baseValue = baseValues[phoneModel] || 300;
    const multiplier = conditionMultipliers[condition] || 0.4;
    return Math.floor(baseValue * multiplier);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var heroes = pgTable("heroes", {
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
  co2Saved: integer("co2_saved").notNull().default(0),
  // in grams
  referralCount: integer("referral_count").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`)
});
var tradeIns = pgTable("trade_ins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroId: varchar("hero_id").notNull().references(() => heroes.id),
  phoneModel: text("phone_model").notNull(),
  phoneCondition: text("phone_condition").notNull(),
  tradeValue: integer("trade_value").notNull(),
  status: text("status").notNull().default("pending"),
  // pending, completed, cancelled
  pickupAddress: text("pickup_address"),
  pickupDate: timestamp("pickup_date"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`)
});
var impactStats = pgTable("impact_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  totalBottlesPrevented: integer("total_bottles_prevented").notNull().default(0),
  totalCo2Saved: integer("total_co2_saved").notNull().default(0),
  // in grams
  totalRewards: integer("total_rewards").notNull().default(0),
  // in AED fils
  activeHeroes: integer("active_heroes").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`)
});
var referrals = pgTable("referrals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  referrerId: varchar("referrer_id").notNull().references(() => heroes.id),
  refereeId: varchar("referee_id").notNull().references(() => heroes.id),
  pointsEarned: integer("points_earned").notNull().default(50),
  createdAt: timestamp("created_at").notNull().default(sql`now()`)
});
var insertHeroSchema = createInsertSchema(heroes).pick({
  name: true,
  email: true,
  phoneModel: true,
  phoneCondition: true,
  tradeValue: true
});
var insertTradeInSchema = createInsertSchema(tradeIns).pick({
  heroId: true,
  phoneModel: true,
  phoneCondition: true,
  tradeValue: true,
  pickupAddress: true,
  pickupDate: true
});
var updateHeroSchema = createInsertSchema(heroes).pick({
  points: true,
  level: true,
  badges: true,
  bottlesPrevented: true,
  co2Saved: true,
  referralCount: true
}).partial();

// api/index.ts
import OpenAI from "openai";
var openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || ""
});
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.get("/api/heroes", async (req, res) => {
  try {
    const heroes2 = await storage.getAllHeroes();
    res.json(heroes2);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch heroes" });
  }
});
app.get("/api/heroes/leaderboard/:limit?", async (req, res) => {
  try {
    const limit = parseInt(req.params.limit || req.query.limit) || 10;
    const topHeroes = await storage.getTopHeroes(limit);
    res.json(topHeroes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});
app.get("/api/impact-stats", async (req, res) => {
  try {
    const stats = await storage.getImpactStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch impact stats" });
  }
});
app.post("/api/heroes", async (req, res) => {
  try {
    const validatedData = insertHeroSchema.parse(req.body);
    const hero = await storage.createHero(validatedData);
    res.json(hero);
  } catch (error) {
    res.status(400).json({ error: error.message || "Invalid hero data" });
  }
});
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, context } = req.body;
    if (!openai.apiKey) {
      return res.json({
        response: null,
        fallback: "I'm your AI concierge! I can help you calculate your iPhone trade-in value and guide you through the process. What iPhone model do you have?"
      });
    }
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are DeliWer's AI Hero Concierge for Dubai's iPhone-to-water trade platform. Help users trade iPhones for premium water systems while earning environmental impact points. Be conversational, helpful, and focused on conversion. Always mention specific trade values, environmental impact, and gamification elements."
        },
        { role: "user", content: message }
      ],
      max_tokens: 300,
      temperature: 0.7
    });
    res.json({
      response: completion.choices[0]?.message?.content,
      fallback: "I'm here to help you turn your iPhone into environmental superpowers! What iPhone model do you want to trade?"
    });
  } catch (error) {
    res.json({
      response: null,
      fallback: "I'm temporarily unavailable, but I'll be back soon to help with your iPhone trade-in! \u{1F916}"
    });
  }
});
async function handler(req, res) {
  return app(req, res);
}
export {
  handler as default
};
