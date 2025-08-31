import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertHeroSchema, insertTradeInSchema, updateHeroSchema, insertSponsorSchema, insertSponsoredMissionSchema, insertMissionSponsorshipSchema, insertContactSchema, insertQuoteSchema, insertCorporateLeadSchema, insertEmailCampaignSchema } from "@shared/schema";
import OpenAI from "openai";
import { sendCorporateWelcomeEmail, sendCorporateCampaignEmail, sendBulkEmail } from "./sendgrid-service";
import adminCampaignRoutes from "./routes/admin-campaigns";
import adminRoleRoutes from "./routes/admin-roles";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || "",
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Register admin-only routes (Shopify admin authentication required)
  app.use("/api/admin/campaigns", adminCampaignRoutes);
  app.use("/api/admin/roles", adminRoleRoutes);

  // Shopify checkout endpoint
  app.post("/api/shopify/checkout", async (req, res) => {
    try {
      const { lineItems, customAttributes } = req.body;
      
      if (!lineItems || !Array.isArray(lineItems)) {
        return res.status(400).json({ error: "Line items are required" });
      }

      // Create checkout session
      const checkoutId = `checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Build cart URL for Shopify - starter kit specific
      let checkoutUrl = 'https://deliwer.myshopify.com/products/aquacafe-planet-hero-starter-kit';
      
      // For starter kit specifically, add query params
      const starterKitItem = lineItems.find(item => 
        item.variantId.includes('starter-kit') || 
        (typeof item.variantId === 'string' && item.variantId.includes('starter'))
      );
      
      if (starterKitItem) {
        checkoutUrl += '?variant=starter-kit-default&quantity=1&selling_plan=loyalty-program&ref=PLANETHEROES';
      }

      // Add custom attributes as URL parameters
      if (customAttributes && customAttributes.length > 0) {
        const params = customAttributes.map((attr: { key: string; value: string }) => `${attr.key}=${encodeURIComponent(attr.value)}`);
        checkoutUrl += (checkoutUrl.includes('?') ? '&' : '?') + params.join('&');
      }

      console.log('Checkout session created:', {
        checkoutId,
        itemCount: lineItems.length,
        checkoutUrl
      });

      res.json({
        checkoutId,
        checkoutUrl,
        lineItems,
        message: 'Checkout created successfully'
      });

    } catch (error: any) {
      console.error('Checkout creation error:', error);
      res.status(500).json({ 
        error: "Failed to create checkout",
        details: error.message 
      });
    }
  });
  
  // User profile routes
  app.get("/api/user/profile", async (req, res) => {
    try {
      // For demo purposes, return a sample user. In production, this would get user from authentication session
      const sampleUser = await storage.createUser({
        username: "demo_user",
        password: "temp_password",
        email: "user@example.com",
        firstName: "John", 
        lastName: "Doe",
        phone: "+971 50 123 4567",
        address: "123 Main St",
        city: "Dubai"
      });
      res.json(sampleUser);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch user profile" });
    }
  });

  app.put("/api/user/profile", async (req, res) => {
    try {
      // For demo purposes, use a fixed user ID. In production, get from auth session
      const userId = "demo-user-id";
      const updatedUser = await storage.updateUser(userId, req.body);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update profile" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json(contact);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid contact data" });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Quote routes
  app.post("/api/quotes", async (req, res) => {
    try {
      const validatedData = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(validatedData);
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid quote data" });
    }
  });

  app.get("/api/quotes/:userId", async (req, res) => {
    try {
      const quotes = await storage.getQuotesByUser(req.params.userId);
      res.json(quotes);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch quotes" });
    }
  });

  app.patch("/api/quotes/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const quote = await storage.updateQuoteStatus(req.params.id, status);
      if (!quote) {
        return res.status(404).json({ error: "Quote not found" });
      }
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update quote status" });
    }
  });
  
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

  // Corporate Lead Management
  app.post("/api/corporate/inquiry", async (req, res) => {
    try {
      const validatedData = insertCorporateLeadSchema.parse(req.body);
      const lead = await storage.createCorporateLead(validatedData);
      
      // Send welcome email
      try {
        await sendCorporateWelcomeEmail(lead.email, lead.companyName);
        console.log('Welcome email sent to:', lead.email);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail the request if email fails
      }
      
      res.json(lead);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create corporate inquiry" });
    }
  });

  app.get("/api/corporate/leads", async (req, res) => {
    try {
      const { status, industry, priority } = req.query;
      const leads = await storage.getCorporateLeads({
        status: status as string,
        industry: industry as string,
        priority: priority as string
      });
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch corporate leads" });
    }
  });

  app.patch("/api/corporate/leads/:id", async (req, res) => {
    try {
      const { status, priority, assignedTo, estimatedValue } = req.body;
      const lead = await storage.updateCorporateLead(req.params.id, {
        status,
        priority,
        assignedTo,
        estimatedValue,
        lastContactAt: new Date()
      });
      
      if (!lead) {
        return res.status(404).json({ error: "Corporate lead not found" });
      }
      
      res.json(lead);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update corporate lead" });
    }
  });

  // Email Campaign Management
  app.post("/api/email/campaigns", async (req, res) => {
    try {
      const validatedData = insertEmailCampaignSchema.parse(req.body);
      const campaign = await storage.createEmailCampaign(validatedData);
      res.json(campaign);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create email campaign" });
    }
  });

  app.get("/api/email/campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getEmailCampaigns();
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch email campaigns" });
    }
  });

  app.post("/api/email/campaigns/:id/send", async (req, res) => {
    try {
      const campaign = await storage.getEmailCampaign(req.params.id);
      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }

      // Get target recipients based on campaign criteria
      const recipients = await storage.getEmailSubscribers({
        subscriberType: campaign.targetAudience,
        industry: campaign.industry || undefined
      });

      if (recipients.length === 0) {
        return res.status(400).json({ error: "No recipients found for this campaign" });
      }

      const emailAddresses = recipients.map(r => r.email);
      
      // Send campaign emails
      const results = await sendBulkEmail(emailAddresses, {
        from: 'corporate@deliwer.com',
        subject: campaign.subject,
        html: campaign.content
      });

      // Update campaign stats
      await storage.updateEmailCampaign(req.params.id, {
        status: 'sent',
        sentAt: new Date(),
        totalRecipients: recipients.length,
        emailsSent: results.sent
      });

      res.json({
        success: true,
        campaignId: req.params.id,
        totalRecipients: recipients.length,
        emailsSent: results.sent,
        emailsFailed: results.failed
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to send campaign" });
    }
  });

  // Email Subscriber Management
  app.post("/api/email/subscribers", async (req, res) => {
    try {
      const subscriber = await storage.createEmailSubscriber(req.body);
      res.json(subscriber);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create subscriber" });
    }
  });

  app.get("/api/email/subscribers", async (req, res) => {
    try {
      const { subscriberType, industry } = req.query;
      const subscribers = await storage.getEmailSubscribers({
        subscriberType: subscriberType as string,
        industry: industry as string
      });
      res.json(subscribers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch email subscribers" });
    }
  });

  // Send targeted corporate outreach
  app.post("/api/email/corporate-outreach", async (req, res) => {
    try {
      const { targetIndustry, customMessage } = req.body;
      
      // Get corporate leads for targeted outreach
      const leads = await storage.getCorporateLeads({
        industry: targetIndustry,
        status: 'new'
      });

      if (leads.length === 0) {
        return res.status(400).json({ error: "No corporate leads found for target industry" });
      }

      let emailsSent = 0;
      let emailsFailed = 0;

      for (const lead of leads) {
        try {
          const success = await sendCorporateCampaignEmail(
            lead.email,
            lead.companyName,
            { customMessage, industry: targetIndustry }
          );
          
          if (success) {
            emailsSent++;
            // Update lead status to contacted
            await storage.updateCorporateLead(lead.id, {
              status: 'contacted',
              lastContactAt: new Date()
            });
          } else {
            emailsFailed++;
          }
        } catch (error) {
          console.error(`Failed to send email to ${lead.email}:`, error);
          emailsFailed++;
        }
      }

      res.json({
        success: true,
        targetIndustry,
        totalLeads: leads.length,
        emailsSent,
        emailsFailed
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to send corporate outreach" });
    }
  });

  // User Profile Management with Shopify Integration
  app.get("/api/user/profile", async (req, res) => {
    try {
      // In production, this would fetch from Shopify Customer API
      // For now, return mock user data that matches our schema
      const mockUser = {
        id: "user_123",
        username: "demo_user", 
        email: "demo@deliwer.com",
        firstName: "Demo",
        lastName: "User",
        phone: "+971 50 123 4567",
        address: "Business Bay",
        city: "Dubai",
        shopifyCustomerId: "gid://shopify/Customer/123456789",
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      res.json(mockUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user profile" });
    }
  });

  app.put("/api/user/profile", async (req, res) => {
    try {
      const { username, email, firstName, lastName, phone, address, city } = req.body;
      
      // In production, this would update the Shopify customer profile
      // For now, return the updated mock data
      const updatedUser = {
        id: "user_123",
        username,
        email,
        firstName,
        lastName,
        phone,
        address,
        city,
        shopifyCustomerId: "gid://shopify/Customer/123456789",
        updatedAt: new Date()
      };
      
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user profile" });
    }
  });

  // SendGrid Configuration Verification
  app.get("/api/email/verify-sendgrid", async (req, res) => {
    try {
      const hasApiKey = !!process.env.SENDGRID_API_KEY;
      const keyLength = process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.length : 0;
      
      if (!hasApiKey) {
        return res.json({
          configured: false,
          error: "SENDGRID_API_KEY environment variable not found",
          status: "missing_api_key"
        });
      }

      // Test basic SendGrid API connectivity
      const { sendEmail } = await import('./sendgrid-service.js');
      const testResult = await sendEmail({
        to: 'test@deliwer.com',
        from: 'corporate@deliwer.com',
        subject: 'SendGrid Verification Test',
        text: 'This is a test to verify SendGrid configuration.'
      });

      res.json({
        configured: true,
        keyLength: keyLength,
        testEmailSent: testResult,
        status: "configured",
        shopifyIntegration: "ready"
      });
    } catch (error) {
      console.error('SendGrid verification error:', error);
      res.status(500).json({
        configured: false,
        error: error.message,
        status: "configuration_error"
      });
    }
  });

  // Test Email Campaign Endpoint
  app.post("/api/email/test-campaign", async (req, res) => {
    try {
      const { testEmail } = req.body;
      
      if (!testEmail) {
        return res.status(400).json({ error: "Test email address is required" });
      }

      // Send test email using the sendgrid service
      const testCampaign = {
        to: testEmail,
        from: 'corporate@deliwer.com',
        subject: 'DeliWer Corporate Trade-in Test Campaign',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Welcome to DeliWer Corporate Trade-in</h1>
            <p>This is a test email from your DeliWer corporate trade-in campaign system.</p>
            <p>Our corporate trade-in program offers:</p>
            <ul>
              <li>Competitive rates for bulk device exchanges</li>
              <li>Environmental impact tracking</li>
              <li>Seamless integration with your procurement process</li>
              <li>Dedicated account management</li>
            </ul>
            <p>Contact us at corporate@deliwer.com to learn more.</p>
            <p style="color: #666; font-size: 12px;">This is a test email sent from the DeliWer platform.</p>
          </div>
        `
      };

      // Import and use the sendEmail function
      const { sendEmail } = await import('./sendgrid-service.js');
      const result = await sendEmail(testCampaign);
      
      if (result) {
        res.json({ 
          success: true, 
          message: "Test campaign email sent successfully",
          sentTo: testEmail
        });
      } else {
        res.status(500).json({ error: "Failed to send test campaign email" });
      }
    } catch (error) {
      console.error('Test campaign error:', error);
      res.status(500).json({ error: "Failed to send test campaign email" });
    }
  });

  // Shopify Admin + SendGrid Integration Test
  app.post("/api/admin/test-sendgrid-integration", async (req, res) => {
    try {
      const { shopDomain, adminEmail } = req.body;
      
      if (!shopDomain || !adminEmail) {
        return res.status(400).json({ 
          error: "shopDomain and adminEmail are required" 
        });
      }

      // Test SendGrid configuration
      const { sendEmail } = await import('./sendgrid-service.js');
      
      // Send test email to Shopify admin
      const result = await sendEmail({
        to: adminEmail,
        from: 'corporate@deliwer.com',
        subject: `SendGrid Integration Test for ${shopDomain}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">✅ SendGrid + Shopify Integration Verified</h2>
            <p>Hello Shopify Admin,</p>
            <p>This email confirms that your SendGrid integration is working correctly for your Shopify store: <strong>${shopDomain}</strong></p>
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #0369a1; margin-top: 0;">Available Features:</h3>
              <ul style="color: #0369a1;">
                <li>Email campaign management</li>
                <li>Corporate lead automation</li>
                <li>Customer segmentation</li>
                <li>Bulk email sending</li>
              </ul>
            </div>
            <p style="color: #666; font-size: 12px;">
              Sent from DeliWer SendGrid Service at ${new Date().toISOString()}
            </p>
          </div>
        `
      });

      if (result) {
        res.json({
          success: true,
          message: "SendGrid + Shopify integration verified",
          shopDomain,
          emailSent: true,
          timestamp: new Date().toISOString()
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Failed to send verification email"
        });
      }
    } catch (error) {
      console.error('Integration test error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        status: "integration_test_failed"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
