import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertHeroSchema, insertTradeInSchema, updateHeroSchema } from "@shared/schema";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || "",
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Hero routes
  app.get("/api/heroes", async (req, res) => {
    try {
      const heroes = await storage.getAllHeroes();
      res.json(heroes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch heroes" });
    }
  });

  app.get("/api/heroes/leaderboard", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const topHeroes = await storage.getTopHeroes(limit);
      res.json(topHeroes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  app.get("/api/heroes/:id", async (req, res) => {
    try {
      const hero = await storage.getHero(req.params.id);
      if (!hero) {
        return res.status(404).json({ error: "Hero not found" });
      }
      res.json(hero);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch hero" });
    }
  });

  app.post("/api/heroes", async (req, res) => {
    try {
      const validatedData = insertHeroSchema.parse(req.body);
      const hero = await storage.createHero(validatedData);
      res.json(hero);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid hero data" });
    }
  });

  app.patch("/api/heroes/:id", async (req, res) => {
    try {
      const validatedData = updateHeroSchema.parse(req.body);
      const hero = await storage.updateHero(req.params.id, validatedData);
      if (!hero) {
        return res.status(404).json({ error: "Hero not found" });
      }
      res.json(hero);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid update data" });
    }
  });

  // Trade-in routes
  app.post("/api/trade-ins", async (req, res) => {
    try {
      const validatedData = insertTradeInSchema.parse(req.body);
      const tradeIn = await storage.createTradeIn(validatedData);
      res.json(tradeIn);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid trade-in data" });
    }
  });

  app.get("/api/trade-ins/hero/:heroId", async (req, res) => {
    try {
      const tradeIns = await storage.getTradeInsByHero(req.params.heroId);
      res.json(tradeIns);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch trade-ins" });
    }
  });

  app.patch("/api/trade-ins/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ error: "Status is required" });
      }
      
      const tradeIn = await storage.updateTradeInStatus(req.params.id, status);
      if (!tradeIn) {
        return res.status(404).json({ error: "Trade-in not found" });
      }
      res.json(tradeIn);
    } catch (error) {
      res.status(500).json({ error: "Failed to update trade-in status" });
    }
  });

  // Impact stats
  app.get("/api/impact-stats", async (req, res) => {
    try {
      const stats = await storage.getImpactStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch impact stats" });
    }
  });

  // Trade value calculation
  app.post("/api/calculate-trade-value", async (req, res) => {
    try {
      const { phoneModel, condition } = req.body;
      if (!phoneModel || !condition) {
        return res.status(400).json({ error: "Phone model and condition are required" });
      }
      
      const tradeValue = await storage.calculateTradeValue(phoneModel, condition);
      const bottlesPrevented = Math.floor(tradeValue / 0.5);
      const co2Saved = Math.floor(bottlesPrevented * 0.5);
      const points = 100 + Math.floor(tradeValue / 10);
      
      res.json({
        tradeValue,
        bottlesPrevented,
        co2Saved,
        points,
        level: points >= 600 ? "Gold Hero" : points >= 300 ? "Silver Hero" : "Bronze Hero",
        phoneModel,
        condition
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to calculate trade value" });
    }
  });

  // AI Concierge Chat
  app.post("/api/ai-chat", async (req, res) => {
    try {
      const { message, context } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are the DeliWer AI Hero Concierge. Your role:
1. Greet warmly, make user feel like a Hero.
2. Ask for iPhone model & condition if not provided.
3. Calculate trade-in reward using the available phone models (iPhone 15, 14, 13, 12, 11 series).
4. Offer AquaCafe kit reward, explain environmental impact.
5. Help book pickup/drop-off.
6. Create a Hero profile and guide them through the process.
Always highlight urgency: only limited Hero spots left today.
Be enthusiastic about environmental impact and use emojis.
Keep responses concise but engaging.
Context: ${JSON.stringify(context || {})}`
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      const aiResponse = response.choices[0].message.content;
      res.json({ response: aiResponse });
    } catch (error: any) {
      console.error("OpenAI API error:", error);
      res.status(500).json({ 
        error: "AI service temporarily unavailable",
        fallback: "Hi! I'm the DeliWer AI Concierge 🤖 I can help you calculate your iPhone trade-in value and start your hero journey. What iPhone model would you like to trade?"
      });
    }
  });

  // Referrals
  app.post("/api/referrals", async (req, res) => {
    try {
      const { referrerId, refereeId } = req.body;
      if (!referrerId || !refereeId) {
        return res.status(400).json({ error: "Referrer and referee IDs are required" });
      }
      
      const referral = await storage.createReferral(referrerId, refereeId);
      res.json(referral);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create referral" });
    }
  });

  // Dubai Rewards Routes
  app.get("/api/dubai/challenges", async (req, res) => {
    try {
      const challenges = await storage.getDubaiChallenges();
      res.json(challenges);
    } catch (error) {
      console.error("Error fetching Dubai challenges:", error);
      res.status(500).json({ error: "Failed to fetch challenges" });
    }
  });

  app.get("/api/dubai/rewards", async (req, res) => {
    try {
      const rewards = await storage.getDubaiRewards();
      res.json(rewards);
    } catch (error) {
      console.error("Error fetching Dubai rewards:", error);
      res.status(500).json({ error: "Failed to fetch rewards" });
    }
  });

  app.post("/api/dubai/challenges/:challengeId/join", async (req, res) => {
    try {
      const { challengeId } = req.params;
      const { heroId } = req.body;

      if (!heroId) {
        return res.status(400).json({ error: "Hero ID is required" });
      }

      const success = await storage.joinDubaiChallenge(challengeId, heroId);
      
      if (success) {
        res.json({ success: true, message: "Successfully joined challenge" });
      } else {
        res.status(400).json({ error: "Failed to join challenge" });
      }
    } catch (error) {
      console.error("Error joining Dubai challenge:", error);
      res.status(500).json({ error: "Failed to join challenge" });
    }
  });

  app.post("/api/dubai/rewards/:rewardId/claim", async (req, res) => {
    try {
      const { rewardId } = req.params;
      const { heroId } = req.body;

      if (!heroId) {
        return res.status(400).json({ error: "Hero ID is required" });
      }

      const success = await storage.claimDubaiReward(rewardId, heroId);
      
      if (success) {
        res.json({ success: true, message: "Successfully claimed reward" });
      } else {
        res.status(400).json({ error: "Failed to claim reward" });
      }
    } catch (error) {
      console.error("Error claiming Dubai reward:", error);
      res.status(500).json({ error: "Failed to claim reward" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
