import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertHeroSchema, insertTradeInSchema, updateHeroSchema, insertSponsorSchema, insertSponsoredMissionSchema, insertMissionSponsorshipSchema } from "@shared/schema";
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

  // Sponsor routes
  app.get("/api/sponsors", async (req, res) => {
    try {
      const sponsors = await storage.getAllSponsors();
      res.json(sponsors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sponsors" });
    }
  });

  app.get("/api/sponsors/:id", async (req, res) => {
    try {
      const sponsor = await storage.getSponsor(req.params.id);
      if (!sponsor) {
        return res.status(404).json({ error: "Sponsor not found" });
      }
      res.json(sponsor);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sponsor" });
    }
  });

  app.post("/api/sponsors", async (req, res) => {
    try {
      const validatedData = insertSponsorSchema.parse(req.body);
      const sponsor = await storage.createSponsor(validatedData);
      res.json(sponsor);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create sponsor" });
    }
  });

  app.patch("/api/sponsors/:id/verify", async (req, res) => {
    try {
      const sponsor = await storage.verifySponsor(req.params.id);
      if (!sponsor) {
        return res.status(404).json({ error: "Sponsor not found" });
      }
      res.json(sponsor);
    } catch (error) {
      res.status(500).json({ error: "Failed to verify sponsor" });
    }
  });

  // Sponsorship tier routes
  app.get("/api/sponsorship-tiers", async (req, res) => {
    try {
      const tiers = await storage.getSponsorshipTiers();
      res.json(tiers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sponsorship tiers" });
    }
  });

  app.get("/api/sponsorship-tiers/:id", async (req, res) => {
    try {
      const tier = await storage.getSponsorshipTier(req.params.id);
      if (!tier) {
        return res.status(404).json({ error: "Sponsorship tier not found" });
      }
      res.json(tier);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sponsorship tier" });
    }
  });

  // Sponsored mission routes
  app.get("/api/sponsored-missions", async (req, res) => {
    try {
      const missions = await storage.getSponsoredMissions();
      res.json(missions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sponsored missions" });
    }
  });

  app.get("/api/sponsored-missions/:id", async (req, res) => {
    try {
      const mission = await storage.getSponsoredMission(req.params.id);
      if (!mission) {
        return res.status(404).json({ error: "Sponsored mission not found" });
      }
      res.json(mission);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sponsored mission" });
    }
  });

  app.post("/api/sponsored-missions", async (req, res) => {
    try {
      const validatedData = insertSponsoredMissionSchema.parse(req.body);
      const mission = await storage.createSponsoredMission(validatedData);
      res.json(mission);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create sponsored mission" });
    }
  });

  app.post("/api/sponsored-missions/:id/join", async (req, res) => {
    try {
      const { heroId } = req.body;
      const missionId = req.params.id;

      if (!heroId) {
        return res.status(400).json({ error: "Hero ID is required" });
      }

      const success = await storage.joinSponsoredMission(missionId, heroId);
      
      if (success) {
        res.json({ success: true, message: "Successfully joined sponsored mission" });
      } else {
        res.status(400).json({ error: "Failed to join sponsored mission" });
      }
    } catch (error) {
      console.error("Error joining sponsored mission:", error);
      res.status(500).json({ error: "Failed to join sponsored mission" });
    }
  });

  // Mission sponsorship routes
  app.get("/api/sponsored-missions/:id/sponsorships", async (req, res) => {
    try {
      const sponsorships = await storage.getMissionSponsorships(req.params.id);
      res.json(sponsorships);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch mission sponsorships" });
    }
  });

  app.post("/api/mission-sponsorships", async (req, res) => {
    try {
      const validatedData = insertMissionSponsorshipSchema.parse(req.body);
      const sponsorship = await storage.createMissionSponsorship(validatedData);
      res.json(sponsorship);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create mission sponsorship" });
    }
  });

  app.patch("/api/mission-sponsorships/:id/confirm", async (req, res) => {
    try {
      const sponsorship = await storage.confirmMissionSponsorship(req.params.id);
      if (!sponsorship) {
        return res.status(404).json({ error: "Mission sponsorship not found" });
      }
      res.json(sponsorship);
    } catch (error) {
      res.status(500).json({ error: "Failed to confirm mission sponsorship" });
    }
  });

  // Authentication routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const userData = req.body;
      
      // Create customer in Shopify
      const shopifyResponse = await fetch("/shopify/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            accepts_marketing: userData.acceptMarketing || false,
            tags: userData.accountType === "company" ? "company,b2b" : "consumer",
            metafields: [
              {
                namespace: "deliwer",
                key: "account_type",
                value: userData.accountType || "personal"
              },
              ...(userData.companyName ? [{
                namespace: "deliwer",
                key: "company_name",
                value: userData.companyName
              }] : []),
              ...(userData.industry ? [{
                namespace: "deliwer",
                key: "industry",
                value: userData.industry
              }] : [])
            ]
          }
        }),
      });

      let shopifyCustomer = null;
      if (shopifyResponse.ok) {
        const shopifyData = await shopifyResponse.json();
        shopifyCustomer = shopifyData.customer;
      }

      // Create local user record
      const user = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        accountType: userData.accountType || "personal",
        companyName: userData.companyName,
        isVerified: userData.accountType === "personal", // Company accounts need verification
        shopifyCustomerId: shopifyCustomer?.id,
        createdAt: new Date(),
      };

      // Generate simple token (in production, use JWT)
      const token = Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString('base64');

      res.json({
        ...user,
        token
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      res.status(400).json({ 
        error: error.message || "Failed to create account" 
      });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // In production, verify password against database
      // For now, mock authentication
      const user = {
        id: Date.now().toString(),
        email,
        firstName: "Ahmed",
        lastName: "Al-Maktoum",
        phone: "+971501234567",
        accountType: "personal",
        isVerified: true,
        shopifyCustomerId: "customer_123",
      };

      const token = Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString('base64');

      res.json({
        ...user,
        token
      });
    } catch (error: any) {
      res.status(401).json({ 
        error: error.message || "Authentication failed" 
      });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    // In production, invalidate token
    res.json({ success: true });
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "No valid token provided" });
      }

      // In production, verify and decode JWT token
      const user = {
        id: "user_123",
        email: "ahmed@deliwer.com",
        firstName: "Ahmed",
        lastName: "Al-Maktoum",
        phone: "+971501234567",
        accountType: "personal",
        isVerified: true,
        shopifyCustomerId: "customer_123",
      };

      res.json(user);
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = req.body;
      
      // In production, save to database and send notification
      console.log("Contact form submission:", contactData);
      
      // Mock successful submission
      res.json({
        success: true,
        message: "Contact form submitted successfully",
        id: Date.now().toString()
      });
    } catch (error: any) {
      res.status(400).json({ 
        error: error.message || "Failed to submit contact form" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
