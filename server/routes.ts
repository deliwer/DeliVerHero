import { Express } from "express";
import { createServer, type Server } from "http";
import fs from "fs";
import path from "path";

// Log lead to Google Sheets (serverless endpoint for referral tracking)
async function handleLogLead(req: any, res: any) {
  try {
    const { partner, agent, campaign, service, page, customerName, building, saleValue, status } = req.body;

    if (!partner || !saleValue) {
      return res.status(400).json({ error: 'Missing required fields: partner, saleValue' });
    }

    const commission = saleValue * 0.20;
    const leadData = {
      date: new Date().toISOString().split('T')[0],
      partner: partner || 'Direct',
      agent: agent || '',
      campaign: campaign || 'Direct',
      service: service || 'move_in_concierge',
      page: page || '/start',
      customerName: customerName || 'Unknown',
      building: building || 'Unknown',
      saleValue: saleValue,
      status: status || 'Pending',
      commission: commission,
      timestamp: new Date().toISOString()
    };

    console.log('Lead logged:', leadData);
    res.json({ success: true, message: 'Lead logged', commission, data: leadData });
  } catch (error) {
    console.error('Error logging lead:', error);
    res.status(500).json({ error: 'Failed to log lead' });
  }
}
import { storage } from "./storage";
import { insertHeroSchema, insertTradeInSchema, updateHeroSchema, insertSponsorSchema, insertSponsoredMissionSchema, insertMissionSponsorshipSchema, insertContactSchema, insertQuoteSchema, insertCorporateLeadSchema, insertEmailCampaignSchema, insertOrderSchema, insertCustomerSchema, insertTombolaSpinSchema, insertCouponTemplateSchema, redeemCouponSchema, insertPlanetMissionSchema, acceptMissionSchema, updateMissionProgressSchema, completeMissionSchema, insertMetaverseRewardSchema, redeemRewardSchema, insertAchievementBadgeSchema, updateAvatarSchema, insertDailyQuestSchema, insertWellnessPassportSchema, progressStepSchema, phoneRequestSchema, redeemPassportSchema, insertWellnessJourneySchema, insertWellnessJourneyStepSchema, insertAquaShowPerkSchema, insertLuxuryHotelPartnerSchema, insertRestaurantPartnerSchema, insertWellnessJourneyParticipantSchema, aiDeliPriceRequestSchema, sellRequestSchema, insertStarsPurchaseSchema, insertWaterFiltrationProjectSchema, insertWaterFiltrationContributionSchema, insertLeadApplicationSchema, insertCommissionClaimSchema } from "@shared/schema";
import { processLead, trackCTAEvent } from "./lead-service";
import { generateRefCode, generatePartnerLink, runCampaign } from "./broker-campaign-service";
import { brokerCampaigns, brokerCampaignEntries, brokerMaster, brokerAutomationLog } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, lt, sql as drizzleSql } from "drizzle-orm";
import { runBrokerFetch, getLocalFileStats } from "./services/broker-fetch-service";
import * as path from "path";
import { runFollowUpEngine } from "./services/broker-followup-service";
import { getAutomationStatus, isDailyRunning, isFollowUpRunning } from "./services/broker-automation";
import OpenAI from "openai";
import Stripe from "stripe";
import QRCode from "qrcode";
import { randomUUID } from "crypto";
import { sendCorporateWelcomeEmail, sendCorporateCampaignEmail, sendBulkEmail } from "./sendgrid-service";
import adminCampaignRoutes from "./routes/admin-campaigns";
import adminRoleRoutes from "./routes/admin-roles";
import wellnessJourneyRoutes from "./routes/wellness-journey";
import dubaiMarathonRoutes from "./routes/dubai-marathon";
import voucherRoutes from "./routes/vouchers";
import chaintrackRoutes from "./routes/chaintrack";
import fulfillmentRoutes from "./routes/fulfillment";
import membershipRoutes from "./routes/memberships";
import relocateRoutes from "./routes/relocate";
import tenantCaptureRoutes from "./routes/tenant-capture";
import marketingReferralRoutes from "./routes/marketing-referral";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";
import { processPurchase, aedToFils } from "./payment-processing";
import { sendWhatsApp } from "./utils/sendWhatsApp";

// Initialize Stripe only if API key is available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-08-27.basil",
  });
} else {
  console.log("STRIPE_SECRET_KEY not set - payment functionality will be disabled");
}

// Initialize OpenAI only if API key is available
let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || "",
  });
} else {
  console.log("OPENAI_API_KEY not set - AI chat functionality will be disabled");
}

// Temporary token storage for QR codes (use Redis in production)
const qrTokens = new Map<string, { passportId: string; expiresAt: Date; used: boolean }>();

import { handleConciergeInput } from "./concierge";

export async function registerRoutes(app: Express): Promise<Server> {
  // Log lead endpoint for referral tracking
  app.post("/api/log-lead", handleLogLead);

  // Broker Engine event logger (DBE) — in-memory ring buffer for founder attribution view
  const ATTRIBUTION_BUFFER: any[] = [];
  const ATTRIBUTION_MAX = 500;
  app.post("/api/log", (req, res) => {
    const { ref, page, timestamp, action } = req.body || {};
    const entry = {
      ref: ref || "direct",
      page: page || "",
      timestamp: timestamp || new Date().toISOString(),
      action: action || "page_visit",
      userAgent: (req.headers["user-agent"] as string) || "",
      ip: (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "",
    };
    console.log("[DBE]", entry);
    ATTRIBUTION_BUFFER.unshift(entry);
    if (ATTRIBUTION_BUFFER.length > ATTRIBUTION_MAX) ATTRIBUTION_BUFFER.length = ATTRIBUTION_MAX;
    res.json({ ok: true });
  });

  // Founder-only attribution feed (consumed by /marketing/attribution).
  // Crawlers blocked at HTTP layer via X-Robots-Tag noindex middleware in server/index.ts.
  app.get("/api/attribution", (_req, res) => {
    res.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.set("Cache-Control", "no-store");
    const totals = ATTRIBUTION_BUFFER.reduce(
      (acc: any, e: any) => {
        acc.total++;
        if (e.action === "whatsapp_click") acc.whatsapp++;
        if (e.action === "page_visit") acc.visits++;
        if (e.action === "link_generated") acc.links++;
        const k = e.ref || "direct";
        acc.byRef[k] = (acc.byRef[k] || 0) + 1;
        return acc;
      },
      { total: 0, whatsapp: 0, visits: 0, links: 0, byRef: {} as Record<string, number> }
    );
    res.json({ entries: ATTRIBUTION_BUFFER, totals });
  });

  // Broker Intel Routes
  app.get("/api/brokers", async (_req, res) => {
    try {
      const brokers = await storage.getBrokers();
      res.json(brokers);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch brokers" });
    }
  });

  app.post("/api/brokers", async (req, res) => {
    try {
      const validatedData = insertBrokerSchema.parse(req.body);
      const broker = await storage.addBroker(validatedData);
      res.json(broker);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to add broker" });
    }
  });

  // Initialize founders
  await storage.initializeFounders([
    { name: "Hassan Jawad", phone: "971523946311" },
    { name: "Rubab Hassan", phone: "971567148381" }
  ]);

  app.get("/api/founder-streaks", async (_req, res) => {
    const streaks = await storage.getFounderStreaks();
    res.json(streaks);
  });

  app.post("/api/founder-streaks/post", async (_req, res) => {
    const today = new Date().toISOString().split("T")[0];
    const streaks = await storage.getFounderStreaks();
    
    for (const s of streaks) {
      if (s.lastPosted !== today) {
        await storage.updateFounderStreak(s.name, s.streak + 1, today);
      }
    }
    
    res.json({ message: "Streaks updated" });
  });

  // Ejari Concierge Webhook Simulator / Endpoint
  app.post("/api/concierge/webhook", async (req, res) => {
    try {
      const { phone, message } = req.body;
      if (!phone || !message) {
        return res.status(400).json({ error: "Phone and message are required" });
      }
      const reply = await handleConciergeInput(phone, message);
      res.json({ reply });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/concierge", async (req, res) => {
    try {
      const { phone, message } = req.body;
      const { name, area, moveDate, unitType, category } = req.body;

      if (!phone) {
        return res.status(400).json({
          success: false,
          message: "Phone number is required",
        });
      }

      // If it's a message from the chatbot UI
      if (message) {
        const reply = await handleConciergeInput(phone, message);
        return res.json({
          success: true,
          reply,
          message: "Concierge response generated"
        });
      }

      // If it's a lead form submission
      const leadMessage = `
NEW CONCIERGE LEAD 🚀

Name: ${name || "Not provided"}
Phone: ${phone}
Area: ${area || "Not provided"}
Move Date: ${moveDate || "Not provided"}
Unit Type: ${unitType || "Not provided"}
Category: ${category || "General"}

Source: Website Concierge Page
`;

      console.log("📩 NEW LEAD RECEIVED:");
      console.log(leadMessage);

      if (process.env.WHATSAPP_TOKEN && process.env.PHONE_NUMBER_ID) {
        try {
          const response = await fetch(
            `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                messaging_product: "whatsapp",
                to: process.env.ALERT_PHONE || "971523946311",
                type: "text",
                text: { body: leadMessage },
              }),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            console.error("⚠️ WhatsApp API error:", errorData);
          } else {
            console.log("✅ WhatsApp notification sent");
          }
        } catch (waError: any) {
          console.error("⚠️ WhatsApp failed:", waError.message);
        }
      } else {
        console.log("ℹ️ WhatsApp not configured - skipping notification");
      }

      // Store in database/memory via storage
      try {
        await storage.createConciergeConversation({
          phoneNumber: phone,
          platform: "website",
          area: area || null,
          propertyType: unitType || null,
          status: "ready_for_human",
          moveInTiming: moveDate || null,
          waterCheck: null,
          cleaningCheck: null,
          fixesCheck: null,
          lastAgent: "agent_1"
        });
      } catch (dbError) {
        console.error("⚠️ Failed to store lead in DB:", dbError);
      }

      return res.json({
        success: true,
        message: "Concierge request received successfully",
      });
    } catch (error) {
      console.error("🔥 CRITICAL ERROR:", error);
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    }
  });

  app.get("/api/marketing/assets", (req, res) => {
    res.json({
      checklist: {
        title: "Dubai Newcomer Essentials Checklist",
        sections: [
          {
            title: "Immediate Essentials (Day 1)",
            items: ["Local SIM Card", "Nol Card", "Water & Basic Snacks", "Essential Toiletries", "Power Adapter"]
          },
          {
            title: "Apartment Setup",
            items: ["DEWA Activation", "Home Internet", "Kitchenware", "Bedding", "Cleaning Supplies"]
          }
        ]
      },
      dmTemplates: [
        "Welcome to Dubai! We help new expats stock a full starter basket in 1 day. Want a free checklist on WhatsApp?",
        "Hey! Saw you're new in Dubai. Want our newcomer checklist on WhatsApp?"
      ],
      whatsappScripts: {
        openers: ["Hey, I'm from Deliwer. Want the 10-min starter basket or a custom list?"],
        followUps: ["We can deliver essentials tonight. Want me to prefill a basket?"],
        referral: ["Glad it helped! Do you know one other expat who just moved?"]
      },
      starterBasket: [
        { category: "Water", price: "30-50 AED" },
        { category: "Breakfast", price: "40-60 AED" }
      ]
    });
  });

  // Lead Applications & Instagram Marketing Leads
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadApplicationSchema.parse(req.body);
      const lead = await storage.createLeadApplication(validatedData);
      res.json(lead);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to submit application" });
    }
  });

  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeadApplications();
      res.json(leads);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  // Register admin-only routes (Shopify admin authentication required)
  app.use("/api/admin/campaigns", adminCampaignRoutes);
  app.use("/api/admin/roles", adminRoleRoutes);

  // Register wellness journey routes
  app.use("/api/wellness-journey", wellnessJourneyRoutes);
  
  // Register Dubai Marathon partner support routes
  app.use("/api/dubai-marathon", dubaiMarathonRoutes);

  // Register voucher routes
  app.use("/api/vouchers", voucherRoutes);

  // Register ChainTrack export-import compliance routes
  app.use("/api/chaintrack", chaintrackRoutes);

  // Register Fulfillment by DeliWer routes
  app.use("/api/fulfillment", fulfillmentRoutes);

  // Register membership tier routes
  app.use("/api/memberships", membershipRoutes);

  // Register relocate membership routes
  app.use("/api/relocate", relocateRoutes);
  app.use("/api/tenant-capture", tenantCaptureRoutes);
  app.use("/api/marketing-referral", marketingReferralRoutes);

  // PayPal payment endpoints - referenced from PayPal integration blueprint
  app.get("/api/paypal/setup", async (req, res) => {
    await loadPaypalDefault(req, res);
  });

  app.post("/order", async (req, res) => {
    await createPaypalOrder(req, res);
  });

  app.post("/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });

  // Stars Purchase System - Revenue generation through impact support
  app.post("/api/stars/purchase", async (req, res) => {
    try {
      const { amountUSD, starsAwarded, contributorEmail, contributorName, isAnonymous, displayOnLeaderboard } = req.body;
      
      // Validate input
      const validAmounts = [5, 10, 20, 50, 100];
      if (!validAmounts.includes(amountUSD)) {
        return res.status(400).json({ error: "Invalid amount. Must be 5, 10, 20, 50, or 100 USD" });
      }
      
      if (!contributorEmail) {
        return res.status(400).json({ error: "Contributor email is required" });
      }
      
      if (!contributorName) {
        return res.status(400).json({ error: "Contributor name is required" });
      }
      
      // Create pending purchase in storage first
      const purchaseData: any = {
        amountUSD,
        starsAwarded,
        contributorEmail,
        contributorName,
        isAnonymous: isAnonymous || false,
        displayOnLeaderboard: displayOnLeaderboard !== false,
        currency: "USD",
        paymentGateway: "paypal",
        status: "pending",
        impactCategory: "general_sustainability"
      };
      
      const pendingPurchase = await storage.createStarsPurchase(purchaseData);
      
      // Create PayPal order
      const paypal = await import("./paypal");
      const order = await paypal.createOrder(amountUSD.toString(), "USD");
      
      // Update purchase with PayPal order ID (persist to storage)
      const updatedPurchase = await storage.updateStarsPurchase(pendingPurchase.id, {
        paypalOrderId: order.id
      });
      
      // Get approval URL
      const approvalUrl = order.links?.find((link: any) => link.rel === "approve")?.href;
      
      res.json({
        purchaseId: pendingPurchase.id,
        orderId: order.id,
        approvalUrl,
        message: "Stars order created successfully"
      });
      
    } catch (error: any) {
      console.error("Error creating Stars purchase:", error);
      res.status(500).json({ error: error.message || "Failed to create Stars purchase" });
    }
  });

  app.post("/api/stars/capture/:orderID", async (req, res) => {
    try {
      const { orderID } = req.params;
      const { purchaseId } = req.body;
      
      // Capture the PayPal order
      const paypal = await import("./paypal");
      const captureData = await paypal.captureOrder(orderID);
      
      // Find the pending purchase
      const purchase = await storage.getStarsPurchase(purchaseId);
      
      if (!purchase) {
        return res.status(404).json({ error: "Purchase not found" });
      }
      
      if (purchase.status !== "pending") {
        return res.status(400).json({ error: "Purchase already processed" });
      }
      
      // Validate PayPal amount matches stored amount (security check)
      const capturedAmount = parseFloat(captureData.purchase_units[0]?.amount?.value || "0");
      if (Math.abs(capturedAmount - purchase.amountUSD) > 0.01) {
        console.error("Amount mismatch:", { captured: capturedAmount, stored: purchase.amountUSD });
        return res.status(400).json({ error: "Payment amount mismatch" });
      }
      
      // Update purchase to completed (persist to storage)
      const completedPurchase = await storage.updateStarsPurchase(purchase.id, {
        status: "completed",
        transactionId: captureData.id,
        completedAt: new Date()
      });
      
      console.log("Stars purchase completed:", completedPurchase?.id, "Amount: $" + completedPurchase?.amountUSD, "Stars awarded:", completedPurchase?.starsAwarded);
      
      res.json({
        success: true,
        purchase: completedPurchase,
        message: "Thank you for supporting sustainability! Your Stars have been awarded."
      });
      
    } catch (error: any) {
      console.error("Error capturing Stars order:", error);
      res.status(500).json({ error: error.message || "Failed to capture Stars order" });
    }
  });

  // Get Stars purchase history by email
  app.get("/api/stars/history", async (req, res) => {
    try {
      const { email } = req.query;
      
      if (!email) {
        return res.status(400).json({ error: "Email parameter is required" });
      }
      
      const history = await storage.getStarsPurchasesByEmail(email as string);
      res.json(history);
    } catch (error: any) {
      console.error("Error fetching Stars history:", error);
      res.status(500).json({ error: "Failed to fetch history" });
    }
  });

  // Get Stars leaderboard
  app.get("/api/stars/leaderboard", async (req, res) => {
    try {
      const topContributors = await storage.getStarsLeaderboard(10);
      res.json(topContributors);
    } catch (error: any) {
      console.error("Error fetching Stars leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  // Get total Stars impact
  app.get("/api/stars/stats", async (req, res) => {
    try {
      const stats = await storage.getStarsStats();
      res.json(stats);
    } catch (error: any) {
      console.error("Error fetching Stars stars:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // SEO & Sitemap Routes — serve from static public/ files
  app.get("/robots.txt", (req, res) => {
    const robotsPath = path.resolve(import.meta.dirname, "../public/robots.txt");
    if (fs.existsSync(robotsPath)) {
      res.type("text/plain").sendFile(robotsPath);
    } else {
      res.type("text/plain").send(`User-agent: *\nAllow: /\nSitemap: https://www.deliwer.com/sitemap.xml\n`);
    }
  });

  app.get("/sitemap.xml", (req, res) => {
    const sitemapPath = path.resolve(import.meta.dirname, "../public/sitemap.xml");
    if (fs.existsSync(sitemapPath)) {
      res.type("application/xml").sendFile(sitemapPath);
    } else {
      res.status(404).send("Sitemap not found");
    }
  });

  app.get("/llms.txt", (req, res) => {
    const llmsPath = path.resolve(import.meta.dirname, "../public/llms.txt");
    if (fs.existsSync(llmsPath)) {
      res.type("text/plain").sendFile(llmsPath);
    } else {
      res.status(404).send("Not found");
    }
  });

  // Daily Founder Trigger Route
  app.get("/api/daily-founder-trigger", async (req, res) => {
    // Header validation for security - checking both Authorization header and query param for flexibility
    const authHeader = req.headers.authorization;
    const authQuery = req.query.secret || req.query.key;
    const INTERNAL_CRON_SECRET = process.env.INTERNAL_CRON_SECRET || "deliwer-founder-trigger-2026-secure";

    const isAuthorized = 
      (INTERNAL_CRON_SECRET && authHeader === `Bearer ${INTERNAL_CRON_SECRET}`) ||
      (req.query.hasOwnProperty('deliwer-founder-trigger-2026-secure')) ||
      (req.query.hasOwnProperty('secure')) ||
      (authQuery === INTERNAL_CRON_SECRET);

    if (!isAuthorized) {
      console.log("Unauthorized trigger attempt:", { 
        hasAuthHeader: !!authHeader, 
        hasQueryParam: req.query.hasOwnProperty('deliwer-founder-trigger-2026-secure'),
        queryKeys: Object.keys(req.query)
      });
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      console.log("🔥 Running Daily Founder Trigger with Data Aggregation...");

      // Use try-catch blocks for individual data fetches to ensure resilience
      let impactStats = { totalStars: 0 };
      try {
        // Checking if storage method exists before calling
        if (typeof (storage as any).getStarsStats === 'function') {
          impactStats = await (storage as any).getStarsStats();
        }
      } catch (e) {
        console.warn("Could not fetch impact stats:", e);
      }

      let heroes = [];
      try {
        if (typeof (storage as any).getHeroLeaderboard === 'function') {
          heroes = await (storage as any).getHeroLeaderboard(5);
        } else if (typeof (storage as any).getLeadApplications === 'function') {
           // Fallback to leads if hero leaderboard isn't ready
           heroes = await (storage as any).getLeadApplications();
        }
      } catch (e) {
        console.warn("Could not fetch heroes:", e);
      }

      let challenges = [];
      try {
        if (typeof (storage as any).getDailyQuests === 'function') {
          challenges = await (storage as any).getDailyQuests();
        }
      } catch (e) {
        console.warn("Could not fetch challenges:", e);
      }

      const BASE_URL = process.env.BASE_URL || "https://deliwer.com";
      const FOUNDER_NUMBERS = (process.env.FOUNDER_NUMBERS || "").split(",").filter(Boolean);

      const campaign = "movein_week";
      const utmLink = `${BASE_URL}/?utm_source=broker&utm_medium=whatsapp&utm_campaign=${campaign}&utm_content=founder`;

      const message = `🚀 DELIWER DAILY OUTREACH TASK

Impact Update: ${impactStats.totalStars || 0} Stars Awarded!

Campaign: Move-In Water + Free Shower Filter

Today’s Action:
Send 25 WhatsApp messages to brokers.

Copy & Send:

Hi [Name] 👋
We’re prioritising Move-In water setup this week.

Please share this link with tenants moving:
${utmLink}

Every booking earns commission automatically.

Reply DONE when completed.`;

      const results = await Promise.all(
        FOUNDER_NUMBERS.map((number) => sendWhatsApp(number.trim(), message))
      );

      const successCount = results.filter((r) => r.success).length;
      const failureCount = results.length - successCount;

      console.log(`Daily trigger completed. Success: ${successCount}, Failures: ${failureCount}`);

      return res.status(200).json({
        success: true,
        message: "Daily Founder Trigger executed successfully",
        data: {
          timestamp: new Date(),
          impactStats,
          topHeroes: heroes,
          challenges,
          successCount,
          failureCount
        }
      });
    } catch (error: any) {
      console.error("❌ Founder Trigger Error:", error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  // Stripe payment endpoints
  app.post("/api/create-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ error: "Payment service not configured. Please contact support." });
    }
    
    try {
      const { amount, currency = "aed", customerId, billingDetails, shippingDetails, cartItems } = req.body;
      
      if (!amount || amount < 50) { // Minimum 0.50 AED
        return res.status(400).json({ error: "Invalid amount" });
      }

      let customer;
      if (customerId) {
        customer = await stripe.customers.retrieve(customerId);
      } else if (billingDetails?.email) {
        // Create or retrieve customer by email
        const customers = await stripe.customers.list({ email: billingDetails.email, limit: 1 });
        if (customers.data.length > 0) {
          customer = customers.data[0];
        } else {
          customer = await stripe.customers.create({
            email: billingDetails.email,
            name: `${billingDetails.firstName || ''} ${billingDetails.lastName || ''}`.trim(),
            phone: billingDetails.phone,
            address: billingDetails.address1 ? {
              line1: billingDetails.address1,
              city: billingDetails.city,
              country: billingDetails.country || "AE",
              postal_code: billingDetails.zip,
            } : undefined,
          });
        }
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to fils (AED cents)
        currency,
        customer: customer?.id,
        metadata: {
          source: "deliwer_aquacafe",
          items: JSON.stringify(cartItems?.map((item: any) => ({
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            price: item.price
          })) || []),
          shipping_name: shippingDetails?.firstName ? `${shippingDetails.firstName} ${shippingDetails.lastName}`.trim() : '',
          shipping_address: shippingDetails?.address1 || '',
          shipping_city: shippingDetails?.city || '',
        },
        shipping: shippingDetails ? {
          name: `${shippingDetails.firstName || ''} ${shippingDetails.lastName || ''}`.trim(),
          address: {
            line1: shippingDetails.address1 || '',
            city: shippingDetails.city || '',
            country: shippingDetails.country || "AE",
            postal_code: shippingDetails.zip || '',
          },
        } : undefined,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        customerId: customer?.id,
      });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: error.message || "Failed to create payment intent" });
    }
  });

  app.post("/api/confirm-payment", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ error: "Payment service not configured. Please contact support." });
    }
    
    try {
      const { paymentIntentId, orderData } = req.body;
      
      if (!paymentIntentId) {
        return res.status(400).json({ error: "Payment Intent ID is required" });
      }

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status === "succeeded") {
        // Create order record in database
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Store order in database
        const orderRecord = {
          id: orderId,
          paymentIntentId,
          customerId: paymentIntent.customer as string,
          customerEmail: paymentIntent.receipt_email || '',
          amount: paymentIntent.amount, // Keep in fils (AED cents)
          currency: paymentIntent.currency,
          status: "paid",
          items: JSON.parse(paymentIntent.metadata.items || '[]'),
          billingDetails: JSON.parse(paymentIntent.metadata.billingDetails || '{}'),
          shippingDetails: JSON.parse(paymentIntent.metadata.shippingDetails || '{}'),
          metadata: {
            source: paymentIntent.metadata.source || 'deliwer_checkout',
            processed_at: new Date().toISOString(),
          },
        };

        try {
          const order = await storage.createOrder(orderRecord);
          console.log("Order created in database:", orderId, "Amount:", paymentIntent.amount / 100, "AED");
        } catch (dbError) {
          console.error("Failed to save order to database:", dbError);
          // Continue with success response even if database save fails
        }
        
        res.json({
          success: true,
          orderId,
          paymentIntent: {
            id: paymentIntent.id,
            status: paymentIntent.status,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
          },
        });
      } else {
        res.status(400).json({ error: "Payment not completed", status: paymentIntent.status });
      }
    } catch (error: any) {
      console.error("Error confirming payment:", error);
      res.status(500).json({ error: error.message || "Failed to confirm payment" });
    }
  });

  app.get("/api/stripe-config", async (req, res) => {
    res.json({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  });


  // Water Filtration - AquaCafe Impact Commerce Gateway Routes
  
  // Get all water filtration projects (products)
  app.get("/api/water-filtration/projects", async (req, res) => {
    try {
      const projects = await storage.getAllWaterFiltrationProjects();
      res.json(projects);
    } catch (error: any) {
      console.error("Error fetching water filtration projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // Get single water filtration project
  app.get("/api/water-filtration/projects/:id", async (req, res) => {
    try {
      const project = await storage.getWaterFiltrationProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error: any) {
      console.error("Error fetching water filtration project:", error);
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  // Create water filtration contribution (checkout/purchase)
  app.post("/api/water-filtration/contributions", async (req, res) => {
    try {
      const validatedData = insertWaterFiltrationContributionSchema.parse(req.body);
      const contribution = await storage.createWaterFiltrationContribution(validatedData);
      res.json(contribution);
    } catch (error: any) {
      console.error("Error creating water filtration contribution:", error);
      res.status(400).json({ error: error.message || "Failed to create contribution" });
    }
  });

  // Get contributions by email
  app.get("/api/water-filtration/contributions/email/:email", async (req, res) => {
    try {
      const contributions = await storage.getWaterFiltrationContributionsByEmail(req.params.email);
      res.json(contributions);
    } catch (error: any) {
      console.error("Error fetching contributions:", error);
      res.status(500).json({ error: "Failed to fetch contributions" });
    }
  });

  // Get contributions by hero
  app.get("/api/water-filtration/contributions/hero/:heroId", async (req, res) => {
    try {
      const contributions = await storage.getWaterFiltrationContributionsByHero(req.params.heroId);
      res.json(contributions);
    } catch (error: any) {
      console.error("Error fetching hero contributions:", error);
      res.status(500).json({ error: "Failed to fetch hero contributions" });
    }
  });

  // Legacy AquaCafe product endpoint - redirects to water filtration projects
  app.get("/api/products/aquacafe", async (req, res) => {
    try {
      const projects = await storage.getAllWaterFiltrationProjects();
      res.json(projects[0] || {});
    } catch (error: any) {
      console.error("Error fetching AquaCafe product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Products listing endpoint
  app.get("/api/products", async (req, res) => {
    // ...
  });

  // Commission Claims & Requirements Tracking
  app.post("/api/claims", async (req, res) => {
    try {
      const validatedData = insertCommissionClaimSchema.parse(req.body);
      const claim = await storage.createCommissionClaim(validatedData);
      res.json(claim);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to submit claim" });
    }
  });

  app.patch("/api/leads/:id/requirements", async (req, res) => {
    try {
      const { id } = req.params;
      const { requirements, whatsappResponses } = req.body;
      const lead = await storage.updateLeadRequirements(id, requirements, whatsappResponses);
      res.json(lead);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update lead requirements" });
    }
  });

  // WhatsApp Automation Webhook (Production Ready Setup)
  app.post("/api/webhooks/whatsapp", async (req, res) => {
    const { from, text } = req.body;
    
    // Production-ready setup for DeliWer WhatsApp-first conversion flow
    // WhatsApp Business Number: +971523946311
    
    const response = {
      to: from,
      messages: [] as string[]
    };

    const input = text?.trim();

    // STEP 1 — INSTANT AUTO-REPLY (TRIGGER)
    if (!input || input.toLowerCase() === "hi" || input.toLowerCase() === "hello" || input.toLowerCase() === "start" || input.toLowerCase().includes("ejari")) {
      response.messages.push("Welcome to DeliWer 👋\nWe help people moving into Dubai or fixing life at home.\n\nPlease reply with a number so we can help fast:\n\n1️⃣ Moving into Dubai (Ejari & Biometrics)\n2️⃣ Already living here & need help\n3️⃣ Moving out / furniture disposal\n4️⃣ Something else");
      return res.json(response);
    }

    // STEP 2 & 3 — ROUTING & QUALIFICATION
    switch (input) {
      case "1": // MESSAGE A (Moving into Dubai)
        response.messages.push("Got it 👍\nAs an appointed Trustee Center, we can handle your Ejari & Biometrics instantly.\n\nAre you:\n1️⃣ Tenant needing Ejari registration\n2️⃣ Landlord needing verification\n3️⃣ Just moved in and need home setup");
        break;
      case "2": // MESSAGE B (Already living here)
        response.messages.push("Understood 👍\nWhat do you need help with today?\n\nYou can reply in one line, for example:\n• Fix something at home\n• Furniture removal\n• Cleaning or maintenance\n• General living support");
        break;
      case "3": // MESSAGE C (Moving out / disposal)
        response.messages.push("Thanks 👍\nIs this for:\n1️⃣ Furniture & appliance disposal\n2️⃣ Move-out cleaning\n3️⃣ Full move-out support?");
        break;
      case "4": // MESSAGE D (Something else)
        response.messages.push("No problem 👍\nPlease describe what you need help with in one or two lines.");
        break;
      default:
        // STEP 4 — HANDOFF TO HUMAN
        response.messages.push("Thanks. A DeliWer living support manager will reply shortly.\n\nIf urgent, please mention:\n• Location\n• Timeline\n• Budget range (if known)");
        break;
    }

    res.json(response);
  });

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
      let checkoutUrl = 'https://deliwer.com/products/aquacafe';
      
      // For starter kit specifically, add query params
      const starterKitItem = lineItems.find(item => 
        item.variantId.includes('starter-kit') || 
        (typeof item.variantId === 'string' && item.variantId.includes('starter'))
      );
      
      if (starterKitItem) {
        checkoutUrl += '?starter=true&quantity=1&ref=PLANETHEROES';
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

  // Contact routes with lead notification
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      const serviceType = validatedData.subject?.toLowerCase().includes('housing') ? 'housing'
        : validatedData.subject?.toLowerCase().includes('relocate') ? 'relocate'
        : validatedData.subject?.toLowerCase().includes('home') ? 'home-service'
        : 'enquiry';
      
      const leadResult = await processLead({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || undefined,
        source: '/contact',
        serviceType,
        intent: validatedData.subject,
        message: validatedData.message,
        metadata: { category: (validatedData as any).category, urgency: (validatedData as any).urgency }
      });
      
      trackCTAEvent('contact_form_submit', {
        serviceType,
        emailSent: leadResult.emailSent,
        page: '/contact'
      });
      
      res.json({ ...contact, leadProcessed: leadResult.success });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid contact data" });
    }
  });

  // Consultation booking endpoint
  app.post("/api/consult", async (req, res) => {
    try {
      const { name, email, phone, situation, message } = req.body;
      if (!name || !email || !phone) {
        return res.status(400).json({ error: "Name, email, and phone are required" });
      }
      const leadResult = await processLead({
        name,
        email,
        phone,
        source: '/consult',
        serviceType: 'consultation',
        intent: situation || 'Relocation Consultation',
        message: message || '',
        adminEmail: 'admin@deliwer.com',
        metadata: { situation, bookingType: 'consultation' }
      });
      trackCTAEvent('consult_booking_submit', { situation, emailSent: leadResult.emailSent, page: '/consult' });
      res.json({ success: true, leadProcessed: leadResult.success });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to submit consultation request" });
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
    if (!openai) {
      return res.status(503).json({ 
        error: "AI service not configured",
        fallback: "Hi! I'm the DeliWer AI Concierge 🤖 I can help you calculate your iPhone trade-in value and start your hero journey. What iPhone model would you like to trade?"
      });
    }
    
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

  // AI Deli - Intelligent Pricing Engine  
  app.post("/api/ai-deli/calculate-price", async (req, res) => {
    try {
      const validatedData = aiDeliPriceRequestSchema.parse(req.body);
      const { deviceModel, condition, storage } = validatedData;

      const basePrices: { [key: string]: number } = {
        'iphone 15 pro max': 3600,
        'iphone 15 pro': 3200,
        'iphone 15': 2800,
        'iphone 14 pro max': 3000,
        'iphone 14 pro': 2600,
        'iphone 14': 2200,
        'iphone 13 pro max': 2500,
        'iphone 13 pro': 2100,
        'iphone 13': 1800,
      };

      const storageMultipliers: { [key: string]: number } = {
        '64gb': 0.9,
        '128gb': 1.0,
        '256gb': 1.15,
        '512gb': 1.3,
        '1tb': 1.5
      };

      const conditionMultipliers: { [key: string]: number } = {
        excellent: 1.0,
        good: 0.85,
        fair: 0.65,
        poor: 0.40
      };

      const modelKey = deviceModel.toLowerCase();
      const basePrice = basePrices[modelKey] || 1500;
      const storageMultiplier = storageMultipliers[storage?.toLowerCase() || '128gb'] || 1.0;
      const conditionMultiplier = conditionMultipliers[condition.toLowerCase()] || 0.85;

      const acquisitionCost = 50;
      const logisticsCostPercent = 5;
      const overheadPercent = 10;
      const targetMarginPercent = 25;

      const marketPrice = Math.round(basePrice * storageMultiplier * conditionMultiplier);

      const totalCostPercent = logisticsCostPercent + overheadPercent + targetMarginPercent;
      const offerPrice = Math.round((marketPrice * (100 - totalCostPercent) / 100) - acquisitionCost);

      const margin = Math.round(((marketPrice - offerPrice) / marketPrice) * 100);

      res.json({
        deviceModel,
        condition,
        storage: storage || '128GB',
        marketPriceAED: marketPrice,
        offerPriceAED: offerPrice,
        marginPercent: margin,
        breakdown: {
          basePrice: basePrice,
          storageAdjustment: storageMultiplier,
          conditionAdjustment: conditionMultiplier,
          acquisitionCost: acquisitionCost,
          logisticsCost: logisticsCostPercent,
          overhead: overheadPercent,
          targetMargin: targetMarginPercent
        },
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error("AI Deli pricing error:", error);
      res.status(500).json({ error: "Failed to calculate price" });
    }
  });

  // Save trade-in sell request
  app.post("/api/trade-in/sell-request", async (req, res) => {
    try {
      const validatedData = sellRequestSchema.parse(req.body);
      const { deviceType, model, condition, storage, expectedPrice, description, contactEmail, contactPhone } = validatedData;

      const priceResponse = await fetch('http://localhost:5000/api/ai-deli/calculate-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceModel: model, condition, storage })
      });
      
      const pricing = await priceResponse.json();

      // Persist to storage using the storage layer
      const sellRequest = await storage.createTradeInSellRequest({
        deviceType,
        model,
        condition,
        storage: storage || '128GB',
        expectedPrice: expectedPrice ? parseInt(expectedPrice) : undefined,
        aiOfferPrice: pricing.offerPriceAED,
        description,
        contactEmail,
        contactPhone,
      });

      console.log('Trade-in sell request persisted:', sellRequest.id);

      res.json({
        success: true,
        sellRequest,
        aiPricing: pricing
      });
    } catch (error: any) {
      console.error("Error creating sell request:", error);
      res.status(500).json({ error: "Failed to create sell request" });
    }
  });

  app.post("/api/ai-deli/chat", async (req, res) => {
    if (!openai) {
      return res.status(503).json({ 
        error: "AI service not configured",
        fallback: "Hi! I'm Deli, your AI pricing assistant 🤖 I help ensure you get the best value for your devices. What would you like to know?"
      });
    }
    
    try {
      const { message, deviceContext } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const systemPrompt = `You are Deli, DeliWer's AI pricing assistant. Your role:
1. Help users understand device trade-in pricing
2. Explain market factors affecting device values
3. Provide competitive pricing insights
4. Answer questions about the trade-in process
5. Maintain transparency about our pricing methodology

Current context: ${JSON.stringify(deviceContext || {})}

Be friendly, professional, and data-driven. Use emojis sparingly. Keep responses under 150 words.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 250,
        temperature: 0.7,
      });

      const aiResponse = response.choices[0].message.content;
      res.json({ response: aiResponse });
    } catch (error: any) {
      console.error("AI Deli chat error:", error);
      res.status(500).json({ 
        error: "AI service temporarily unavailable",
        fallback: "Hi! I'm Deli, your AI pricing assistant. I can help answer questions about trade-in pricing, market trends, and the evaluation process. How can I assist you today?"
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

  // AquaCafe Heroes Tombola Gamification Routes
  app.get("/api/tombola/config", async (req, res) => {
    try {
      const config = await storage.getTombolaConfig();
      res.json(config);
    } catch (error) {
      console.error("Error fetching tombola config:", error);
      res.status(500).json({ error: "Failed to fetch tombola configuration" });
    }
  });

  app.get("/api/tombola/prizes", async (req, res) => {
    try {
      const prizes = await storage.getTombolaPrizes();
      res.json(prizes);
    } catch (error) {
      console.error("Error fetching tombola prizes:", error);
      res.status(500).json({ error: "Failed to fetch tombola prizes" });
    }
  });

  app.get("/api/tombola/can-spin/:heroId", async (req, res) => {
    try {
      const heroId = req.params.heroId;
      if (!heroId) {
        return res.status(400).json({ error: "Hero ID is required" });
      }

      const canSpinResult = await storage.canSpin(heroId);
      res.json(canSpinResult);
    } catch (error) {
      console.error("Error checking spin eligibility:", error);
      res.status(500).json({ error: "Failed to check spin eligibility" });
    }
  });

  app.post("/api/tombola/spin", async (req, res) => {
    try {
      const validatedData = insertTombolaSpinSchema.parse(req.body);
      
      // Verify hero exists
      const hero = await storage.getHero(validatedData.heroId);
      if (!hero) {
        return res.status(404).json({ error: "Hero not found" });
      }

      // Pre-check eligibility to provide clear error messages
      const canSpinResult = await storage.canSpin(validatedData.heroId);
      if (!canSpinResult.canSpin) {
        return res.status(409).json({ 
          error: canSpinResult.reason || "Cannot spin at this time",
          canSpin: false,
          spinsLeft: canSpinResult.spinsLeft || 0
        });
      }

      const spinResult = await storage.spinTombola(validatedData.heroId, validatedData.spinType);
      res.json({
        success: true,
        spin: spinResult.spin,
        prize: spinResult.prize,
        coupon: spinResult.coupon,
      });
    } catch (error: any) {
      console.error("Error spinning tombola:", error);
      if (error.message.includes("Cannot spin")) {
        return res.status(409).json({ error: error.message });
      }
      res.status(400).json({ error: error.message || "Failed to spin tombola" });
    }
  });

  app.get("/api/tombola/history/:heroId", async (req, res) => {
    try {
      const heroId = req.params.heroId;
      if (!heroId) {
        return res.status(400).json({ error: "Hero ID is required" });
      }

      const history = await storage.getTombolaHistory(heroId);
      res.json(history);
    } catch (error) {
      console.error("Error fetching tombola history:", error);
      res.status(500).json({ error: "Failed to fetch tombola history" });
    }
  });

  app.get("/api/tombola/spin-count/:heroId", async (req, res) => {
    try {
      const heroId = req.params.heroId;
      if (!heroId) {
        return res.status(400).json({ error: "Hero ID is required" });
      }

      const spinCount = await storage.getHeroSpinCount(heroId);
      res.json(spinCount);
    } catch (error) {
      console.error("Error fetching hero spin count:", error);
      res.status(500).json({ error: "Failed to fetch hero spin count" });
    }
  });

  // Digital Coupons Routes
  app.get("/api/coupons/templates", async (req, res) => {
    try {
      const templates = await storage.getCouponTemplates();
      res.json(templates);
    } catch (error) {
      console.error("Error fetching coupon templates:", error);
      res.status(500).json({ error: "Failed to fetch coupon templates" });
    }
  });

  app.get("/api/coupons/issued/:heroId", async (req, res) => {
    try {
      const heroId = req.params.heroId;
      if (!heroId) {
        return res.status(400).json({ error: "Hero ID is required" });
      }

      const coupons = await storage.getIssuedCoupons(heroId);
      res.json(coupons);
    } catch (error) {
      console.error("Error fetching issued coupons:", error);
      res.status(500).json({ error: "Failed to fetch issued coupons" });
    }
  });

  app.post("/api/coupons/redeem", async (req, res) => {
    try {
      const validatedData = redeemCouponSchema.parse(req.body);
      
      // Verify hero exists and owns the coupon
      const hero = await storage.getHero(validatedData.heroId);
      if (!hero) {
        return res.status(404).json({ error: "Hero not found" });
      }

      // Enforce AquaCafe Loyalty membership requirement for coupon redemption
      if (!hero.isAquaCafeLoyaltyMember) {
        return res.status(403).json({ 
          error: "AquaCafe Loyalty membership required",
          message: "You must be an AquaCafe Loyalty member to redeem coupons. Join our loyalty program to start redeeming your Planet Points!",
          loyaltyRequired: true
        });
      }

      const redeemedCoupon = await storage.redeemCoupon(validatedData);
      res.json({
        success: true,
        coupon: redeemedCoupon,
        message: "Coupon redeemed successfully"
      });
    } catch (error: any) {
      console.error("Error redeeming coupon:", error);
      if (error.message.includes("not found") || error.message.includes("not active") || 
          error.message.includes("expired") || error.message.includes("usage limit")) {
        return res.status(400).json({ error: error.message });
      }
      res.status(400).json({ error: error.message || "Failed to redeem coupon" });
    }
  });

  app.get("/api/coupons/:couponId", async (req, res) => {
    try {
      const couponId = req.params.couponId;
      const coupon = await storage.getIssuedCoupon(couponId);
      
      if (!coupon) {
        return res.status(404).json({ error: "Coupon not found" });
      }
      
      res.json(coupon);
    } catch (error) {
      console.error("Error fetching coupon:", error);
      res.status(500).json({ error: "Failed to fetch coupon" });
    }
  });

  // Loyalty Membership Routes
  app.get("/api/loyalty/status/:heroId", async (req, res) => {
    try {
      const heroId = req.params.heroId;
      if (!heroId) {
        return res.status(400).json({ error: "Hero ID is required" });
      }

      const hero = await storage.getHero(heroId);
      if (!hero) {
        return res.status(404).json({ error: "Hero not found" });
      }

      res.json({
        heroId: heroId,
        isLoyaltyMember: hero.isAquaCafeLoyaltyMember || false,
        membershipDate: hero.aquaCafeMembershipDate,
        level: hero.level,
        points: hero.points
      });
    } catch (error) {
      console.error("Error checking loyalty status:", error);
      res.status(500).json({ error: "Failed to check loyalty status" });
    }
  });

  app.post("/api/loyalty/join", async (req, res) => {
    try {
      const { heroId } = req.body;
      if (!heroId) {
        return res.status(400).json({ error: "Hero ID is required" });
      }

      const hero = await storage.getHero(heroId);
      if (!hero) {
        return res.status(404).json({ error: "Hero not found" });
      }

      if (hero.isAquaCafeLoyaltyMember) {
        return res.status(400).json({ error: "Hero is already an AquaCafe Loyalty member" });
      }

      // Update only the loyalty fields
      await storage.updateHero(heroId, {
        isAquaCafeLoyaltyMember: true,
        aquaCafeMembershipDate: new Date()
      });

      res.json({
        success: true,
        message: "Successfully joined AquaCafe Loyalty program",
        membershipDate: new Date()
      });
    } catch (error) {
      console.error("Error joining loyalty program:", error);
      res.status(500).json({ error: "Failed to join loyalty program" });
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

  // ChainTrack Membership Tiers endpoints
  app.get("/api/chaintrack/tiers", async (req, res) => {
    try {
      const tiers = await storage.getChaintrackMembershipTiers();
      res.json(tiers);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch membership tiers" });
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
        from: 'info@deliwer.com',
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

  // Loyalty Program Registration for Home Service Launch
  app.post("/api/loyalty/register", async (req, res) => {
    try {
      const { email, name, phone, type } = req.body;
      
      if (!email || !name) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      // Create subscriber with loyalty type
      const subscriber = await storage.createEmailSubscriber({
        email,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || '',
        phone: phone || '',
        subscriberType: type === 'partner' ? 'corporate' : 'consumer',
        tags: [type, 'home-service-launch', 'dec-25-2024'],
        acceptsMarketing: true
      });

      // Log loyalty registration
      console.log(`Loyalty registration: ${type} - ${email} - ${name}`);

      res.json({
        success: true,
        message: `Welcome to DeliWer's ${type} program!`,
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
          type
        }
      });
    } catch (error: any) {
      console.error('Loyalty registration error:', error);
      res.status(400).json({ error: error.message || "Registration failed" });
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
        from: 'info@deliwer.com',
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
    } catch (error: any) {
      console.error('SendGrid verification error:', error);
      res.status(500).json({
        configured: false,
        error: error.message,
        status: "configuration_error"
      });
    }
  });

  // Partner onboarding invite email
  app.post("/api/email/send-partner-invite", async (req, res) => {
    try {
      const { to, name = "Partner" } = req.body;
      if (!to) return res.status(400).json({ error: "to is required" });
      const { sendEmail } = await import('./sendgrid-service.js');
      const partnerLink = `https://www.deliwer.com/broker-partner?ref=${Buffer.from(to).toString('base64url')}&utm_source=invite&utm_campaign=partner_onboard`;
      const success = await sendEmail({
        to,
        from: 'partners@deliwer.com',
        subject: "You're invited to join the DeliWer Partner Network",
        html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="font-family:Arial,sans-serif;background:#0f172a;margin:0;padding:0;">
  <div style="max-width:580px;margin:0 auto;background:#ffffff;">

    <div style="background:linear-gradient(135deg,#10b981 0%,#0d9488 100%);padding:44px 36px 40px;">
      <div style="margin-bottom:16px;">
        <span style="background:rgba(255,255,255,0.15);color:#fff;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:5px 14px;border-radius:20px;">Partner Invitation</span>
      </div>
      <h1 style="color:#ffffff;margin:0;font-size:26px;font-weight:800;line-height:1.3;">
        Earn up to 35% commission<br/>on every tenant you already work with.
      </h1>
    </div>

    <div style="padding:40px 36px;">
      <p style="color:#374151;font-size:16px;line-height:1.7;margin:0 0 20px;">Hi ${name},</p>
      <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 24px;">
        You're invited to join <strong>DeliWer's Partner Network</strong> — a referral program built specifically for real estate brokers, typing centers, and building staff across Dubai.
      </p>

      <div style="background:#f0fdf4;border-left:4px solid #10b981;border-radius:4px;padding:20px 24px;margin:0 0 28px;">
        <p style="color:#065f46;font-weight:700;font-size:14px;margin:0 0 12px;">What you earn per referral:</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="color:#047857;font-size:13px;padding:4px 0;">→ Move-in / Move-out package</td>
            <td style="color:#047857;font-size:13px;font-weight:700;text-align:right;">AED 79–150</td>
          </tr>
          <tr>
            <td style="color:#047857;font-size:13px;padding:4px 0;">→ Ejari registration</td>
            <td style="color:#047857;font-size:13px;font-weight:700;text-align:right;">AED 40–60</td>
          </tr>
          <tr>
            <td style="color:#047857;font-size:13px;padding:4px 0;">→ DEWA activation</td>
            <td style="color:#047857;font-size:13px;font-weight:700;text-align:right;">AED 30–50</td>
          </tr>
          <tr>
            <td style="color:#047857;font-size:13px;padding:4px 0;">→ Full relocation bundle</td>
            <td style="color:#047857;font-size:13px;font-weight:700;text-align:right;">up to 35%</td>
          </tr>
        </table>
      </div>

      <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 24px;">
        No upfront cost. No operations on your side. You make the intro — we handle Ejari, DEWA, movers, cleaning, and setup. You earn on every completed service.
      </p>

      <div style="text-align:center;margin:36px 0;">
        <a href="${partnerLink}" style="display:inline-block;background:#10b981;color:#ffffff;font-weight:800;font-size:16px;padding:16px 40px;border-radius:30px;text-decoration:none;letter-spacing:0.3px;">
          Accept Invitation &amp; Get Your Link →
        </a>
      </div>

      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px 24px;margin:0 0 28px;">
        <p style="color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Your personal referral link</p>
        <p style="color:#0d9488;font-size:13px;word-break:break-all;margin:0;font-family:monospace;">${partnerLink}</p>
      </div>

      <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 8px;">Questions? Reach us directly:</p>
      <p style="color:#374151;font-size:15px;margin:0;">
        WhatsApp: <a href="https://wa.me/971523946311" style="color:#10b981;font-weight:700;">+971 52 394 6311</a>
      </p>

      <p style="color:#9ca3af;font-size:13px;margin:32px 0 0;">— DeliWer Partnerships Team</p>
    </div>

    <div style="background:#f1f5f9;padding:20px 36px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#94a3b8;font-size:11px;margin:0;">
        DeliWer · Dubai Airport Freezone ·
        <a href="https://www.deliwer.com" style="color:#10b981;">deliwer.com</a>
      </p>
      <p style="color:#94a3b8;font-size:11px;margin:6px 0 0;">
        You received this invitation because you are a licensed professional in the UAE.
      </p>
    </div>

  </div>
</body>
</html>`,
      });
      if (success) {
        res.json({ success: true, message: `Partner invite sent to ${to}` });
      } else {
        res.status(500).json({ success: false, error: 'Failed to send — check sender identity in SendGrid' });
      }
    } catch (err: any) {
      const detail = err?.response?.body?.errors?.[0]?.message || err.message || 'Unknown error';
      res.status(500).json({ success: false, error: detail });
    }
  });

  // Simple test email — uses partners@deliwer.com (the broker sender)
  app.post("/api/email/send-test", async (req, res) => {
    try {
      const { to } = req.body;
      if (!to) return res.status(400).json({ error: "to is required" });
      const { sendEmail } = await import('./sendgrid-service.js');
      const success = await sendEmail({
        to,
        from: 'info@deliwer.com',
        subject: 'DeliWer ✅ SendGrid test confirmed',
        html: `
<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="font-family:Arial,sans-serif;background:#f9fafb;margin:0;padding:0;">
  <div style="max-width:520px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
    <div style="background:linear-gradient(135deg,#10b981,#0d9488);padding:28px 32px;">
      <h1 style="color:#fff;margin:0;font-size:20px;">DeliWer — SendGrid Working ✅</h1>
    </div>
    <div style="padding:32px;">
      <p style="color:#374151;font-size:15px;line-height:1.7;">Your SendGrid integration is <strong>live and confirmed</strong>.</p>
      <p style="color:#374151;font-size:15px;line-height:1.7;">The broker recruitment engine is ready to send emails to RERA brokers.</p>
      <p style="color:#6b7280;font-size:13px;margin-top:28px;">— DeliWer Partnerships System</p>
    </div>
    <div style="background:#f3f4f6;padding:16px 32px;text-align:center;">
      <p style="color:#9ca3af;font-size:11px;margin:0;">DeliWer · Dubai Airport Freezone · <a href="https://www.deliwer.com" style="color:#10b981;">deliwer.com</a></p>
    </div>
  </div>
</body></html>`,
      });
      if (success) {
        res.json({ success: true, message: `Test email sent to ${to}` });
      } else {
        res.status(500).json({ success: false, error: 'SendGrid rejected the email — check sender identity verification' });
      }
    } catch (err: any) {
      const detail = err?.response?.body?.errors?.[0]?.message || err.message || 'Unknown error';
      res.status(500).json({ success: false, error: detail });
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
        from: 'info@deliwer.com',
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
        from: 'info@deliwer.com',
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
    } catch (error: any) {
      console.error('Integration test error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        status: "integration_test_failed"
      });
    }
  });

  // Products API endpoint with AquaCafe products
  app.get("/api/products", async (req, res) => {
    try {
      const products = [
        {
          id: "aquacafe-hero-minimal",
          title: "AquaCafe Hero Minimal - PLANET HERO ENTRY",
          handle: "aquacafe-hero-minimal",
          price: 1299,
          originalPrice: 1599,
          category: "aquacafe",
          image: "🌊",
          features: [
            "💧 Premium 3-stage filtration system",
            "📦 12-month filter supply included",
            "⭐ Instant Planet Hero Level 2 status",
            "🎯 1000 starter points + 2X Hero multiplier",
            "📞 24/7 Planet Hero priority support",
            "📱 Smart monitoring app with Hero dashboard",
            "🏆 Exclusive Hero member badge",
            "💰 20% discount on ALL future plans",
            "🍰 AED 100 Baker's Kitchen voucher when friend signs up via referral"
          ],
          badge: "🚀 PLANET HERO GATEWAY",
          isHeroEntry: true,
          available: true
        },
        {
          id: "aquacafe-hero-premium",
          title: "AquaCafe Hero Premium",
          handle: "aquacafe-hero-premium",
          price: 1499,
          originalPrice: 1999,
          category: "aquacafe",
          image: "🌊",
          features: [
            "Advanced 5-stage filtration",
            "18-month filter supply",
            "Planet Hero Level 3 status",
            "2500 starter points + 2X multiplier",
            "24/7 priority phone support",
            "Smart water quality monitoring",
            "Exclusive Hero premium badge",
            "Discounted installation for loyalty members"
          ],
          badge: "⚡ MOST POPULAR",
          popular: true,
          available: true
        },
        {
          id: "aquacafe-hero-elite",
          title: "AquaCafe Hero Elite",
          handle: "aquacafe-hero-elite",
          price: 2299,
          originalPrice: 2999,
          category: "aquacafe",
          image: "🌊",
          features: [
            "Ultimate 7-stage whole-home system",
            "36-month filter supply",
            "Planet Hero Level 4 Elite status",
            "5000 starter points + 3X multiplier",
            "24/7 VIP concierge support",
            "AI-powered smart home integration",
            "Premium Hero Elite badge",
            "White-glove installation + training"
          ],
          badge: "🏆 ULTIMATE HERO",
          available: true
        }
      ];
      
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Pakistan Flood Relief Mission API Routes
  app.get("/api/missions/pakistan-flood/stats", async (req, res) => {
    try {
      const missionStats = {
        filtersDeployed: 47,
        targetFilters: 500,
        peopleServed: 1175,
        fundingRaised: 235000,
        targetFunding: 2500000,
        devicesContributed: Math.floor(Math.random() * 10) + 150, // Simulate real-time updates
        daysRemaining: Math.ceil((new Date('2025-04-15').getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
        topContributors: [
          { name: "Dubai Tech Hub", devices: 23, points: 5750 },
          { name: "Emirates Financial", devices: 18, points: 4500 },
          { name: "Sarah Ahmed", devices: 12, points: 3000 }
        ]
      };
      res.json(missionStats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch mission stats" });
    }
  });

  app.post("/api/missions/pakistan-flood/contribute", async (req, res) => {
    try {
      const { type, amount, missionId } = req.body;
      
      let contribution = {
        type,
        amount: type === 'device' ? 1 : amount,
        pointsEarned: type === 'device' ? 250 : Math.floor(amount),
        peopleHelped: type === 'device' ? 25 : Math.floor(amount / 200),
        contributionId: `contrib_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString()
      };
      
      console.log('Pakistan flood relief contribution:', contribution);
      
      res.json({
        success: true,
        ...contribution,
        message: `Thank you! Your ${type === 'device' ? 'device' : `AED ${amount} donation`} will help provide clean water to ${contribution.peopleHelped} people in Pakistan.`
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to process contribution" });
    }
  });

  // Restaurant Rewards API Routes
  app.get("/api/users/points", async (req, res) => {
    try {
      // In production, get from authenticated user session
      const userPoints = {
        total: 1250,
        available: 850,
        donated: 400,
        earned: Math.floor(Math.random() * 100) + 150, // Simulate daily earnings
        missionContributions: 3,
        restaurantRedemptions: 2
      };
      res.json(userPoints);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user points" });
    }
  });

  app.post("/api/restaurants/redeem", async (req, res) => {
    try {
      const { restaurantId, rewardIndex, pointsUsed } = req.body;
      
      // Generate voucher code
      const voucherCode = `${restaurantId.toUpperCase().substr(0,3)}${Date.now().toString().substr(-6)}`;
      
      const redemption = {
        voucherCode,
        restaurantId,
        rewardIndex,
        pointsUsed,
        redemptionId: `redeem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'active',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        timestamp: new Date().toISOString()
      };
      
      console.log('Restaurant reward redeemed:', redemption);
      
      // In production: Send email with voucher code via SendGrid
      res.json({
        success: true,
        ...redemption,
        message: `Reward redeemed successfully! Present code ${voucherCode} at the restaurant.`
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to redeem reward" });
    }
  });

  // ============================================================================
  // METAVERSE GAMING SYSTEM - ULTIMATE PLANET MISSIONS API
  // ============================================================================

  // Planet Mission Routes
  app.get("/api/metaverse/missions", async (req, res) => {
    try {
      const missions = await storage.getPlanetMissions();
      res.json(missions);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch missions" });
    }
  });

  app.get("/api/metaverse/missions/:code", async (req, res) => {
    try {
      const mission = await storage.getPlanetMission(req.params.code);
      if (!mission) {
        return res.status(404).json({ error: "Mission not found" });
      }
      res.json(mission);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch mission" });
    }
  });

  app.post("/api/metaverse/missions", async (req, res) => {
    try {
      const validatedData = insertPlanetMissionSchema.parse(req.body);
      const mission = await storage.createPlanetMission(validatedData);
      res.json(mission);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create mission" });
    }
  });

  // Hero Mission Progress Routes
  app.get("/api/metaverse/heroes/:heroId/missions", async (req, res) => {
    try {
      const progress = await storage.getHeroMissionProgress(req.params.heroId);
      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch mission progress" });
    }
  });

  app.post("/api/metaverse/heroes/:heroId/missions/accept", async (req, res) => {
    try {
      const validatedData = acceptMissionSchema.parse(req.body);
      const progress = await storage.acceptMission(req.params.heroId, validatedData);
      res.json(progress);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to accept mission" });
    }
  });

  app.patch("/api/metaverse/heroes/:heroId/missions/:missionInstanceId", async (req, res) => {
    try {
      const validatedData = updateMissionProgressSchema.parse(req.body);
      const progress = await storage.updateMissionProgress(req.params.heroId, req.params.missionInstanceId, validatedData);
      if (!progress) {
        return res.status(404).json({ error: "Mission progress not found" });
      }
      res.json(progress);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update mission progress" });
    }
  });

  app.post("/api/metaverse/heroes/:heroId/missions/:missionInstanceId/complete", async (req, res) => {
    try {
      const validatedData = completeMissionSchema.parse(req.body);
      const result = await storage.completeMission(req.params.heroId, req.params.missionInstanceId, validatedData);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to complete mission" });
    }
  });

  // Planet Points Routes
  app.get("/api/metaverse/heroes/:heroId/planet-points", async (req, res) => {
    try {
      const balance = await storage.getPlanetPointsBalance(req.params.heroId);
      res.json({ balance });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch planet points balance" });
    }
  });

  app.get("/api/metaverse/heroes/:heroId/planet-points/ledger", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const transactions = await storage.getPlanetPointsLedger(req.params.heroId, limit);
      res.json(transactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch planet points ledger" });
    }
  });

  // Metaverse Avatar Routes
  app.get("/api/metaverse/heroes/:heroId/avatar", async (req, res) => {
    try {
      const avatar = await storage.getMetaverseAvatar(req.params.heroId);
      if (!avatar) {
        return res.status(404).json({ error: "Avatar not found" });
      }
      res.json(avatar);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch avatar" });
    }
  });

  app.patch("/api/metaverse/heroes/:heroId/avatar", async (req, res) => {
    try {
      const validatedData = updateAvatarSchema.parse(req.body);
      const avatar = await storage.updateMetaverseAvatar(req.params.heroId, validatedData);
      if (!avatar) {
        return res.status(404).json({ error: "Avatar not found" });
      }
      res.json(avatar);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update avatar" });
    }
  });

  // Achievement Badge Routes
  app.get("/api/metaverse/badges", async (req, res) => {
    try {
      const badges = await storage.getAchievementBadges();
      res.json(badges);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch achievement badges" });
    }
  });

  // ============================================================================
  // GLOBAL SUSTAINABILITY FRAMEWORK API ROUTES
  // ============================================================================
  
  // Cities API
  app.get("/api/sustainability/cities", async (req, res) => {
    try {
      const cities = await storage.getCities();
      res.json(cities);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch cities" });
    }
  });

  app.get("/api/sustainability/cities/:id", async (req, res) => {
    try {
      const city = await storage.getCity(req.params.id);
      if (!city) {
        return res.status(404).json({ error: "City not found" });
      }
      res.json(city);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch city" });
    }
  });

  // Seasons API
  app.get("/api/sustainability/seasons", async (req, res) => {
    try {
      const cityId = req.query.cityId as string;
      const seasons = cityId 
        ? await storage.getSeasonsByCity(cityId)
        : await storage.getSeasons();
      res.json(seasons);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch seasons" });
    }
  });

  app.get("/api/sustainability/seasons/active", async (req, res) => {
    try {
      const activeSeasons = await storage.getActiveSeasons();
      res.json(activeSeasons);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch active seasons" });
    }
  });

  // Enhanced Mission Submission API (Real-world verification)
  app.post("/api/metaverse/missions/:missionCode/submit-activity", async (req, res) => {
    try {
      const { heroId, submissionType, proofData, locationData, metadata } = req.body;
      
      if (!heroId || !submissionType || !proofData) {
        return res.status(400).json({ 
          error: "Missing required fields: heroId, submissionType, proofData" 
        });
      }

      const result = await storage.submitMissionActivity(heroId, req.params.missionCode, {
        submissionType,
        proofData,
        locationData: locationData || {},
        metadata: metadata || {},
        status: "pending",
        verifiedBy: null,
        verificationScore: 0,
        impactCalculated: {},
        pointsAwarded: 0,
        bonusMultipliers: {},
        cityId: req.body.cityId || "dubai",
        seasonId: req.body.seasonId || null,
      });

      res.json({
        success: true,
        submission: result.submission,
        verified: result.verified,
        pointsAwarded: result.pointsAwarded,
        message: result.verified 
          ? `Activity verified! You earned ${result.pointsAwarded} planet points!`
          : "Activity submitted for verification. You'll be notified once reviewed."
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to submit activity" });
    }
  });

  // Activity Submissions API
  app.get("/api/sustainability/submissions", async (req, res) => {
    try {
      const heroId = req.query.heroId as string;
      const submissions = await storage.getActivitySubmissions(heroId);
      res.json(submissions);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch submissions" });
    }
  });

  app.get("/api/sustainability/submissions/:id", async (req, res) => {
    try {
      const submission = await storage.getActivitySubmission(req.params.id);
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }
      res.json(submission);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch submission" });
    }
  });

  // Verification API (Admin/Partner use)
  app.post("/api/sustainability/submissions/:id/verify", async (req, res) => {
    try {
      const { result, verifiedBy, confidence } = req.body;
      
      if (!result || !verifiedBy) {
        return res.status(400).json({ 
          error: "Missing required fields: result, verifiedBy" 
        });
      }

      if (!["approved", "rejected"].includes(result)) {
        return res.status(400).json({ 
          error: "Invalid result. Must be 'approved' or 'rejected'" 
        });
      }

      const submission = await storage.verifyActivitySubmission(
        req.params.id, 
        verifiedBy, 
        result, 
        confidence
      );

      res.json({
        success: true,
        submission,
        message: result === "approved" 
          ? `Submission approved! ${submission.pointsAwarded} points awarded.`
          : "Submission rejected."
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to verify submission" });
    }
  });

  // Verification Events API
  app.get("/api/sustainability/verification-events", async (req, res) => {
    try {
      const submissionId = req.query.submissionId as string;
      const events = await storage.getVerificationEvents(submissionId);
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch verification events" });
    }
  });

  app.post("/api/metaverse/badges", async (req, res) => {
    try {
      const validatedData = insertAchievementBadgeSchema.parse(req.body);
      const badge = await storage.createAchievementBadge(validatedData);
      res.json(badge);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create achievement badge" });
    }
  });

  // Hero Badge Routes
  app.get("/api/metaverse/heroes/:heroId/badges", async (req, res) => {
    try {
      const badges = await storage.getHeroBadges(req.params.heroId);
      res.json(badges);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch hero badges" });
    }
  });

  app.post("/api/metaverse/heroes/:heroId/badges/:badgeCode/equip", async (req, res) => {
    try {
      const success = await storage.equipBadge(req.params.heroId, req.params.badgeCode);
      if (!success) {
        return res.status(404).json({ error: "Badge not found or not unlocked" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to equip badge" });
    }
  });

  // Metaverse Rewards Routes
  app.get("/api/metaverse/rewards", async (req, res) => {
    try {
      const category = req.query.category as string;
      const rewards = await storage.getMetaverseRewards(category);
      res.json(rewards);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch metaverse rewards" });
    }
  });

  app.post("/api/metaverse/rewards", async (req, res) => {
    try {
      const validatedData = insertMetaverseRewardSchema.parse(req.body);
      const reward = await storage.createMetaverseReward(validatedData);
      res.json(reward);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create metaverse reward" });
    }
  });

  app.post("/api/metaverse/heroes/:heroId/rewards/redeem", async (req, res) => {
    try {
      const validatedData = redeemRewardSchema.parse(req.body);
      const redemption = await storage.redeemMetaverseReward(req.params.heroId, validatedData);
      res.json(redemption);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to redeem reward" });
    }
  });

  app.get("/api/metaverse/heroes/:heroId/redemptions", async (req, res) => {
    try {
      const redemptions = await storage.getRewardRedemptions(req.params.heroId);
      res.json(redemptions);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch reward redemptions" });
    }
  });

  // Daily Quest Routes
  app.get("/api/metaverse/heroes/:heroId/daily-quests", async (req, res) => {
    try {
      const quests = await storage.getDailyQuests(req.params.heroId);
      res.json(quests);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch daily quests" });
    }
  });

  app.post("/api/metaverse/heroes/:heroId/daily-quests/generate", async (req, res) => {
    try {
      const quests = await storage.generateDailyQuests(req.params.heroId);
      res.json(quests);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to generate daily quests" });
    }
  });

  app.post("/api/metaverse/daily-quests/:questId/complete", async (req, res) => {
    try {
      const quest = await storage.completeDailyQuest(req.params.questId);
      if (!quest) {
        return res.status(404).json({ error: "Daily quest not found" });
      }
      res.json(quest);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to complete daily quest" });
    }
  });

  // Wellness Passport Routes
  app.post("/api/wellness-passports", async (req, res) => {
    try {
      const validatedData = insertWellnessPassportSchema.parse(req.body);
      const passport = await storage.createWellnessPassport(validatedData);
      res.json(passport);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create wellness passport" });
    }
  });

  app.get("/api/wellness-passports/:id", async (req, res) => {
    try {
      const passport = await storage.getWellnessPassport(req.params.id);
      if (!passport) {
        return res.status(404).json({ error: "Wellness passport not found" });
      }
      res.json(passport);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch wellness passport" });
    }
  });

  app.post("/api/wellness-passports/by-phone", async (req, res) => {
    try {
      const validatedData = phoneRequestSchema.parse(req.body);
      const passport = await storage.getWellnessPassportByPhone(validatedData.phone);
      if (!passport) {
        return res.status(404).json({ error: "No active wellness passport found for this phone number" });
      }
      res.json(passport);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to fetch wellness passport" });
    }
  });

  app.post("/api/wellness-passports/:id/share", async (req, res) => {
    try {
      const passport = await storage.recordShare(req.params.id);
      if (!passport) {
        return res.status(404).json({ error: "Wellness passport not found" });
      }
      res.json(passport);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to record social share" });
    }
  });

  app.post("/api/wellness-passports/:id/progress", async (req, res) => {
    try {
      const validatedData = progressStepSchema.parse(req.body);
      const passport = await storage.progressStep(req.params.id, validatedData.step);
      if (!passport) {
        return res.status(404).json({ error: "Wellness passport not found" });
      }
      res.json(passport);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to progress wellness journey step" });
    }
  });

  app.post("/api/wellness-passports/:id/redeem", async (req, res) => {
    try {
      const validatedData = redeemPassportSchema.parse(req.body);
      
      // Simple partner PIN verification (in production, use hashed PINs)
      const validPartnerPins = ['BK2024', 'BAKERS', 'MAZAYA'];
      if (!validPartnerPins.includes(validatedData.partnerPin)) {
        return res.status(403).json({ error: "Invalid partner PIN" });
      }
      
      const passport = await storage.redeemPassport(req.params.id);
      if (!passport) {
        return res.status(404).json({ error: "Wellness passport not found" });
      }
      
      // Log redemption for audit trail
      console.log(`Wellness passport redeemed: ${req.params.id} by staff: ${validatedData.staffId || 'unknown'} at: ${validatedData.location || 'Baker\'s Kitchen'}`);
      
      res.json(passport);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to redeem wellness passport" });
    }
  });

  app.post("/api/wellness-passports/:id/qr", async (req, res) => {
    try {
      // Add basic authorization - require phone number ownership verification
      const { phone } = req.body;
      if (!phone || typeof phone !== 'string') {
        return res.status(401).json({ error: "Phone number required for authorization" });
      }

      const passport = await storage.getWellnessPassport(req.params.id);
      if (!passport) {
        return res.status(404).json({ error: "Wellness passport not found" });
      }
      
      // Verify ownership by phone number
      if (passport.phone !== phone) {
        return res.status(403).json({ error: "Unauthorized: Phone number does not match passport" });
      }
      
      if (passport.status !== "active") {
        return res.status(400).json({ error: "Passport is not active" });
      }
      
      // Generate secure token with 10-minute expiry
      const token = randomUUID();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      
      // Store token securely (no PII in storage)
      qrTokens.set(token, {
        passportId: passport.id,
        expiresAt,
        used: false
      });
      
      // Create secure redemption URL (only contains token)
      const baseUrl = process.env.REPLIT_DEV_DOMAIN 
        ? `https://${process.env.REPLIT_DEV_DOMAIN}`
        : `${req.protocol}://${req.get('host')}`;
      const redemptionUrl = `${baseUrl}/redeem?token=${token}`;
      
      // Generate QR code with ONLY the redemption URL (no PII)
      const qrCodeDataURL = await QRCode.toDataURL(redemptionUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF"
        }
      });
      
      // Clean up expired tokens
      const now = new Date();
      qrTokens.forEach((tokenData, tokenKey) => {
        if (tokenData.expiresAt < now) {
          qrTokens.delete(tokenKey);
        }
      });
      
      // Return minimal data (no PII, no full passport)
      res.json({
        qrCode: qrCodeDataURL,
        redemptionUrl,
        expiresAt,
        status: "active"
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to generate QR code" });
    }
  });

  // Secure token verification endpoint (read-only)
  app.get("/api/wellness-passports/verify-token/:token", async (req, res) => {
    try {
      const tokenData = qrTokens.get(req.params.token);
      if (!tokenData) {
        return res.status(404).json({ error: "Invalid or expired redemption token" });
      }
      
      if (tokenData.expiresAt < new Date()) {
        qrTokens.delete(req.params.token);
        return res.status(404).json({ error: "Redemption token has expired" });
      }
      
      if (tokenData.used) {
        return res.status(409).json({ error: "Redemption token has already been used" });
      }
      
      const passport = await storage.getWellnessPassport(tokenData.passportId);
      if (!passport) {
        qrTokens.delete(req.params.token);
        return res.status(404).json({ error: "Wellness passport not found" });
      }
      
      // Return minimal passport info for redemption validation (no PII, read-only)
      res.json({
        id: passport.id,
        referralCode: passport.referralCode,
        status: passport.status,
        currentStep: passport.currentStep,
        stepsCompleted: passport.stepsCompleted,
        totalValue: passport.totalValue,
        partnerLocation: passport.partnerLocation,
        expiresAt: passport.expiresAt,
        tokenValid: true
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to verify redemption token" });
    }
  });

  // Secure token redemption endpoint (state-changing)
  app.post("/api/wellness-passports/redeem-token/:token", async (req, res) => {
    try {
      const validatedData = redeemPassportSchema.parse(req.body);
      
      // Verify partner PIN
      const validPartnerPins = ['BK2024', 'BAKERS', 'MAZAYA'];
      if (!validPartnerPins.includes(validatedData.partnerPin)) {
        return res.status(403).json({ error: "Invalid partner PIN" });
      }

      const tokenData = qrTokens.get(req.params.token);
      if (!tokenData) {
        return res.status(404).json({ error: "Invalid or expired redemption token" });
      }
      
      if (tokenData.expiresAt < new Date()) {
        qrTokens.delete(req.params.token);
        return res.status(404).json({ error: "Redemption token has expired" });
      }
      
      if (tokenData.used) {
        return res.status(409).json({ error: "Redemption token has already been used" });
      }
      
      // Mark token as used to prevent replay
      tokenData.used = true;
      
      const passport = await storage.redeemPassport(tokenData.passportId);
      if (!passport) {
        qrTokens.delete(req.params.token);
        return res.status(404).json({ error: "Wellness passport not found" });
      }
      
      // Clean up used token
      qrTokens.delete(req.params.token);
      
      // Log redemption for audit trail
      console.log(`Wellness passport redeemed via QR: ${passport.id} by staff: ${validatedData.staffId || 'unknown'} at: ${validatedData.location || 'Baker\'s Kitchen'}`);
      
      res.json({
        id: passport.id,
        status: passport.status,
        redeemedAt: passport.redeemedAt,
        totalValue: passport.totalValue,
        success: true
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to redeem via token" });
    }
  });

  // ===============================================
  // CHAINTRACK B2B WHOLESALE INVENTORY ROUTES
  // ===============================================

  // Get all inventory sources
  app.get("/api/chaintrack/sources", async (req, res) => {
    try {
      const sources = await storage.getInventorySources();
      res.json(sources);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create inventory source
  app.post("/api/chaintrack/sources", async (req, res) => {
    try {
      const source = await storage.createInventorySource(req.body);
      res.json(source);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get inventory uploads
  app.get("/api/chaintrack/uploads", async (req, res) => {
    try {
      const { sourceId } = req.query;
      const uploads = await storage.getInventoryUploads(sourceId as string | undefined);
      res.json(uploads);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get wholesale inventory with filters
  app.get("/api/chaintrack/inventory", async (req, res) => {
    try {
      const { sourceId, brand, model, grade, isAvailable, search } = req.query;
      
      // Start with search or all inventory
      let inventory;
      if (search) {
        inventory = await storage.searchWholesaleInventory(search as string);
      } else {
        inventory = await storage.getWholesaleInventory({
          sourceId: sourceId as string | undefined,
          brand: brand as string | undefined,
          model: model as string | undefined,
          grade: grade as string | undefined,
          isAvailable: isAvailable ? isAvailable === 'true' : undefined,
        });
      }
      
      // Apply additional filters on top of search results if they exist
      if (search && (sourceId || brand || model || grade || isAvailable)) {
        if (sourceId) inventory = inventory.filter(item => item.sourceId === sourceId);
        if (brand) inventory = inventory.filter(item => item.brand.toLowerCase().includes((brand as string).toLowerCase()));
        if (model) inventory = inventory.filter(item => item.model.toLowerCase().includes((model as string).toLowerCase()));
        if (grade) inventory = inventory.filter(item => item.grade === grade);
        if (isAvailable !== undefined) inventory = inventory.filter(item => item.isAvailable === (isAvailable === 'true'));
      }
      
      // Include source info for each item
      const sources = await storage.getInventorySources();
      const sourceMap = new Map(sources.map(s => [s.id, s]));
      
      const inventoryWithSource = inventory.map(item => ({
        ...item,
        source: sourceMap.get(item.sourceId),
      }));
      
      res.json(inventoryWithSource);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single inventory item
  app.get("/api/chaintrack/inventory/:id", async (req, res) => {
    try {
      const item = await storage.getWholesaleInventoryItem(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Inventory item not found" });
      }
      
      const source = await storage.getInventorySource(item.sourceId);
      res.json({ ...item, source });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create inventory item (for manual entry or testing)
  app.post("/api/chaintrack/inventory", async (req, res) => {
    try {
      const item = await storage.createWholesaleInventoryItem(req.body);
      res.json(item);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update inventory item
  app.put("/api/chaintrack/inventory/:id", async (req, res) => {
    try {
      const updated = await storage.updateWholesaleInventoryItem(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Inventory item not found" });
      }
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete inventory item
  app.delete("/api/chaintrack/inventory/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteWholesaleInventoryItem(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Inventory item not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get B2B buyers
  app.get("/api/chaintrack/buyers", async (req, res) => {
    try {
      const { verificationStatus, buyerTier } = req.query;
      const buyers = await storage.getB2bBuyers({
        verificationStatus: verificationStatus as string | undefined,
        buyerTier: buyerTier as string | undefined,
      });
      res.json(buyers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create B2B buyer
  app.post("/api/chaintrack/buyers", async (req, res) => {
    try {
      const buyer = await storage.createB2bBuyer(req.body);
      res.json(buyer);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ============================================================================
  // CHAINTRACK REVERSE BIDDING SYSTEM API ROUTES
  // ============================================================================

  // Auctions
  app.get("/api/chaintrack/auctions", async (req, res) => {
    try {
      const { status, buyerId } = req.query;
      const auctions = await storage.getChaintrackAuctions({
        status: status as string | undefined,
        buyerId: buyerId as string | undefined,
      });
      res.json(auctions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/chaintrack/auctions/:id", async (req, res) => {
    try {
      const auction = await storage.getChaintrackAuction(req.params.id);
      if (!auction) {
        return res.status(404).json({ error: "Auction not found" });
      }
      res.json(auction);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/chaintrack/auctions", async (req, res) => {
    try {
      const auction = await storage.createChaintrackAuction(req.body);
      res.json(auction);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/chaintrack/auctions/:id", async (req, res) => {
    try {
      const updated = await storage.updateChaintrackAuction(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Auction not found" });
      }
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/chaintrack/auctions/:id/close", async (req, res) => {
    try {
      const closed = await storage.closeChaintrackAuction(req.params.id);
      if (!closed) {
        return res.status(404).json({ error: "Auction not found" });
      }
      res.json(closed);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/chaintrack/auctions/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteChaintrackAuction(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Auction not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Bids
  app.get("/api/chaintrack/bids", async (req, res) => {
    try {
      const { auctionId, supplierId, status } = req.query;
      const bids = await storage.getChaintrackBids({
        auctionId: auctionId as string | undefined,
        supplierId: supplierId as string | undefined,
        status: status as string | undefined,
      });
      res.json(bids);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/chaintrack/bids/:id", async (req, res) => {
    try {
      const bid = await storage.getChaintrackBid(req.params.id);
      if (!bid) {
        return res.status(404).json({ error: "Bid not found" });
      }
      res.json(bid);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/chaintrack/bids", async (req, res) => {
    try {
      const bid = await storage.placeChaintrackBid(req.body);
      res.json(bid);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/chaintrack/bids/:id/withdraw", async (req, res) => {
    try {
      const withdrawn = await storage.withdrawChaintrackBid(req.params.id);
      if (!withdrawn) {
        return res.status(404).json({ error: "Bid not found" });
      }
      res.json(withdrawn);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/chaintrack/bids/:id/accept", async (req, res) => {
    try {
      const { buyerId } = req.body;
      if (!buyerId) {
        return res.status(400).json({ error: "buyerId is required" });
      }
      const result = await storage.acceptChaintrackBid(req.params.id, buyerId);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/chaintrack/bids/:id/reject", async (req, res) => {
    try {
      const rejected = await storage.rejectChaintrackBid(req.params.id);
      if (!rejected) {
        return res.status(404).json({ error: "Bid not found" });
      }
      res.json(rejected);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Suppliers
  app.get("/api/chaintrack/suppliers", async (req, res) => {
    try {
      const { verificationStatus } = req.query;
      const suppliers = await storage.getChaintrackSuppliers({
        verificationStatus: verificationStatus as string | undefined,
      });
      res.json(suppliers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/chaintrack/suppliers/:id", async (req, res) => {
    try {
      const supplier = await storage.getChaintrackSupplier(req.params.id);
      if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
      }
      res.json(supplier);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/chaintrack/suppliers/by-user/:userId", async (req, res) => {
    try {
      const supplier = await storage.getChaintrackSupplierByUserId(req.params.userId);
      if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
      }
      res.json(supplier);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/chaintrack/suppliers", async (req, res) => {
    try {
      const supplier = await storage.createChaintrackSupplier(req.body);
      res.json(supplier);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/chaintrack/suppliers/:id", async (req, res) => {
    try {
      const updated = await storage.updateChaintrackSupplier(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Supplier not found" });
      }
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/chaintrack/suppliers/:id/verify", async (req, res) => {
    try {
      const verified = await storage.verifyChaintrackSupplier(req.params.id);
      if (!verified) {
        return res.status(404).json({ error: "Supplier not found" });
      }
      res.json(verified);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Inventory
  app.get("/api/chaintrack/supplier-inventory", async (req, res) => {
    try {
      const { supplierId, status } = req.query;
      const inventory = await storage.getChaintrackInventory({
        supplierId: supplierId as string | undefined,
        status: status as string | undefined,
      });
      res.json(inventory);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/chaintrack/supplier-inventory/:id", async (req, res) => {
    try {
      const item = await storage.getChaintrackInventoryItem(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Inventory item not found" });
      }
      res.json(item);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/chaintrack/supplier-inventory", async (req, res) => {
    try {
      const item = await storage.createChaintrackInventoryItem(req.body);
      res.json(item);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/chaintrack/supplier-inventory/:id", async (req, res) => {
    try {
      const updated = await storage.updateChaintrackInventoryItem(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Inventory item not found" });
      }
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/chaintrack/supplier-inventory/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteChaintrackInventoryItem(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Inventory item not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Inspections
  app.get("/api/chaintrack/inspections", async (req, res) => {
    try {
      const { auctionId } = req.query;
      const inspections = await storage.getChaintrackInspections({
        auctionId: auctionId as string | undefined,
      });
      res.json(inspections);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/chaintrack/inspections/:id", async (req, res) => {
    try {
      const inspection = await storage.getChaintrackInspection(req.params.id);
      if (!inspection) {
        return res.status(404).json({ error: "Inspection not found" });
      }
      res.json(inspection);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/chaintrack/inspections", async (req, res) => {
    try {
      const inspection = await storage.createChaintrackInspection(req.body);
      res.json(inspection);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/chaintrack/inspections/:id", async (req, res) => {
    try {
      const updated = await storage.updateChaintrackInspection(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Inspection not found" });
      }
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Transactions
  app.get("/api/chaintrack/transactions", async (req, res) => {
    try {
      const { buyerId, supplierId } = req.query;
      const transactions = await storage.getChaintrackTransactions({
        buyerId: buyerId as string | undefined,
        supplierId: supplierId as string | undefined,
      });
      res.json(transactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/chaintrack/transactions/:id", async (req, res) => {
    try {
      const transaction = await storage.getChaintrackTransaction(req.params.id);
      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.json(transaction);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/chaintrack/transactions", async (req, res) => {
    try {
      const transaction = await storage.createChaintrackTransaction(req.body);
      res.json(transaction);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/chaintrack/transactions/:id/status", async (req, res) => {
    try {
      const { paymentStatus, shippingStatus } = req.body;
      const updated = await storage.updateChaintrackTransactionStatus(
        req.params.id,
        paymentStatus,
        shippingStatus
      );
      if (!updated) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Ratings
  app.get("/api/chaintrack/ratings", async (req, res) => {
    try {
      const { ratedUserId, transactionId } = req.query;
      const ratings = await storage.getChaintrackRatings({
        ratedUserId: ratedUserId as string | undefined,
        transactionId: transactionId as string | undefined,
      });
      res.json(ratings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/chaintrack/ratings/:id", async (req, res) => {
    try {
      const rating = await storage.getChaintrackRating(req.params.id);
      if (!rating) {
        return res.status(404).json({ error: "Rating not found" });
      }
      res.json(rating);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/chaintrack/ratings", async (req, res) => {
    try {
      const rating = await storage.createChaintrackRating(req.body);
      res.json(rating);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Membership Tiers
  app.get("/api/chaintrack/membership-tiers", async (req, res) => {
    try {
      const tiers = await storage.getChaintrackMembershipTiers();
      res.json(tiers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================================================
  // PAYMENT PROCESSING - PayPal & Stripe with Complete Purchase Flow
  // ==================================================

  // Complete PayPal purchase flow
  app.post("/api/payments/paypal/complete", async (req, res) => {
    try {
      const { orderID, customerEmail, customerName, customerPhone, productId, productName, amount } = req.body;

      if (!orderID || !customerEmail || !productId || !productName || !amount) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Process complete purchase (customer + order + loyalty + vouchers)
      const result = await processPurchase({
        customerEmail,
        customerName,
        customerPhone,
        productId,
        productName,
        amount: parseFloat(amount),
        currency: 'AED',
        paymentMethod: 'paypal',
        paymentIntentId: orderID,
      });

      res.json(result);
    } catch (error: any) {
      console.error("PayPal purchase processing error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Complete Stripe purchase flow
  app.post("/api/payments/stripe/complete", async (req, res) => {
    try {
      const { paymentIntentId, customerEmail, customerName, customerPhone, productId, productName, amount } = req.body;

      if (!paymentIntentId || !customerEmail || !productId || !productName || !amount) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      if (!stripe) {
        return res.status(503).json({ error: "Stripe not configured" });
      }

      // Verify payment intent
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (paymentIntent.status !== 'succeeded') {
        return res.status(400).json({ error: "Payment not completed" });
      }

      // Process complete purchase
      const result = await processPurchase({
        customerEmail,
        customerName,
        customerPhone,
        productId,
        productName,
        amount: parseFloat(amount),
        currency: 'AED',
        paymentMethod: 'stripe',
        paymentIntentId,
      });

      res.json(result);
    } catch (error: any) {
      console.error("Stripe purchase processing error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get customer details including loyalty membership and vouchers
  app.get("/api/customers/me", async (req, res) => {
    try {
      const { email } = req.query;
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: "Email required" });
      }

      const customer = await storage.getCustomerByEmail(email);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      const loyaltyMembership = await storage.getLoyaltyMembershipByCustomer(customer.id);
      const orders = await storage.getOrdersByCustomer(customer.id);
      const vouchers = await storage.getVouchersByCustomer(customer.id);

      res.json({
        customer,
        loyaltyMembership,
        orders,
        vouchers,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get loyalty membership by customer email
  app.get("/api/loyalty/membership", async (req, res) => {
    try {
      const { email } = req.query;
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: "Email required" });
      }

      const customer = await storage.getCustomerByEmail(email);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      const membership = await storage.getLoyaltyMembershipByCustomer(customer.id);
      res.json(membership || null);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get digital vouchers for customer
  app.get("/api/vouchers/my-vouchers", async (req, res) => {
    try {
      const { email } = req.query;
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: "Email required" });
      }

      const customer = await storage.getCustomerByEmail(email);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      const vouchers = await storage.getVouchersByCustomer(customer.id);
      res.json(vouchers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Redeem a digital voucher
  app.post("/api/vouchers/redeem", async (req, res) => {
    try {
      const { voucherCode, location } = req.body;
      if (!voucherCode) {
        return res.status(400).json({ error: "Voucher code required" });
      }

      const voucher = await storage.redeemVoucher(voucherCode, location);
      res.json({
        success: true,
        voucher,
        message: "Voucher redeemed successfully!",
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // =============================================
  // AFFILIATE / PARTNER TRACKING ENDPOINTS
  // =============================================

  // Track an affiliate lead (called when a tenant submits via an affiliate's link)
  app.post("/api/affiliate/track", async (req, res) => {
    try {
      const { affiliateCode, tenantName, tenantPhone, unitSize } = req.body;
      if (!affiliateCode) return res.status(400).json({ error: "affiliateCode required" });

      // Estimate vendor cost based on unit size
      const costMap: Record<string, number> = {
        studio: 3250,
        "1br": 3600,
        "2br": 4000,
        "3br_villa": 4500,
      };
      const serviceValue = costMap[unitSize] ?? 3600;
      const deliwerFeeRate = 0.12; // 12% embedded coordination fee
      const deliwerFee = Math.round(serviceValue * deliwerFeeRate);

      // Find affiliate by code (in-memory lookup since DB may not be provisioned)
      const affiliateCommissionRate = 0.30; // 30% of deliwer fee
      const affiliateCommission = Math.round(deliwerFee * affiliateCommissionRate);

      const leadData = {
        affiliateCode,
        tenantName: tenantName || "Unknown",
        tenantPhone: tenantPhone || "",
        unitSize: unitSize || "1br",
        serviceValue,
        deliwerFee,
        affiliateCommission,
        status: "pending",
      };

      console.log("[Affiliate Lead]", leadData);
      res.json({
        success: true,
        message: "Lead tracked successfully",
        estimatedCost: serviceValue,
        deliwerFee,
        affiliateCommission,
      });
    } catch (error: any) {
      console.error("Affiliate track error:", error);
      res.status(500).json({ error: "Failed to track lead" });
    }
  });

  // Get affiliate dashboard stats by code
  app.get("/api/affiliate/dashboard/:code", async (req, res) => {
    try {
      const { code } = req.params;
      // Return mock stats for demo; replace with DB query once db:push is run
      res.json({
        code,
        name: "Partner",
        totalLeads: 0,
        confirmedLeads: 0,
        totalEarnings: 0,
        pendingEarnings: 0,
        commissionPercent: 30,
        referralLink: `https://deliwer.com/start?ref=${code}`,
        leads: [],
      });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch dashboard" });
    }
  });

  // ─── Broker Recruitment Campaign API ──────────────────────────────────────

  // POST /api/marketing/broker-campaign — create campaign + start sending
  app.post("/api/marketing/broker-campaign", async (req, res) => {
    try {
      const { name, brokers } = req.body;
      if (!name || !Array.isArray(brokers) || brokers.length === 0) {
        return res.status(400).json({ error: "Campaign name and broker list are required" });
      }

      // Deduplicate by email
      const seen = new Set<string>();
      const unique = brokers.filter((b: any) => {
        if (!b.email || seen.has(b.email.toLowerCase())) return false;
        seen.add(b.email.toLowerCase());
        return true;
      });

      const [campaign] = await db.insert(brokerCampaigns).values({
        name,
        status: 'idle',
        totalBrokers: unique.length,
        sentCount: 0,
        failedCount: 0,
      }).returning();

      // Build entries with ref codes
      const usedCodes = new Set<string>();
      const entries = unique.map((b: any) => {
        let refCode = generateRefCode(b.name || '', b.email);
        let attempt = 0;
        while (usedCodes.has(refCode)) {
          attempt++;
          refCode = generateRefCode(b.name || '', b.email) + attempt;
        }
        usedCodes.add(refCode);
        return {
          campaignId: campaign.id,
          name: b.name || 'Partner',
          email: b.email,
          phone: b.phone || null,
          license: b.license || null,
          refCode,
          partnerLink: generatePartnerLink(refCode),
          status: 'pending' as const,
          errorMessage: null,
        };
      });

      await db.insert(brokerCampaignEntries).values(entries);

      // Start campaign asynchronously — don't block the response
      setImmediate(() => {
        runCampaign(campaign.id).catch((err) =>
          console.error('[CAMPAIGN] Background error:', err)
        );
      });

      res.json({ success: true, campaignId: campaign.id, total: unique.length });
    } catch (err: any) {
      console.error('[CAMPAIGN] Create error:', err);
      res.status(500).json({ error: err.message || 'Failed to create campaign' });
    }
  });

  // GET /api/marketing/broker-campaigns — list all campaigns
  app.get("/api/marketing/broker-campaigns", async (_req, res) => {
    try {
      const campaigns = await db.select().from(brokerCampaigns)
        .orderBy(brokerCampaigns.createdAt);
      res.json(campaigns.reverse());
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch campaigns' });
    }
  });

  // GET /api/marketing/broker-campaign/:id — campaign + entry details
  app.get("/api/marketing/broker-campaign/:id", async (req, res) => {
    try {
      const [campaign] = await db.select().from(brokerCampaigns)
        .where(eq(brokerCampaigns.id, req.params.id)).limit(1);
      if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

      const entries = await db.select().from(brokerCampaignEntries)
        .where(eq(brokerCampaignEntries.campaignId, req.params.id));

      res.json({ campaign, entries });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch campaign' });
    }
  });

  // POST /api/marketing/broker-campaign/:id/start — start/resume an idle campaign
  app.post("/api/marketing/broker-campaign/:id/start", async (req, res) => {
    try {
      const [campaign] = await db.select().from(brokerCampaigns)
        .where(eq(brokerCampaigns.id, req.params.id)).limit(1);
      if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
      if (campaign.status === 'running') return res.status(409).json({ error: 'Campaign already running' });
      await db.update(brokerCampaigns).set({ status: 'idle' }).where(eq(brokerCampaigns.id, campaign.id));
      setImmediate(() => runCampaign(campaign.id).catch(err => console.error('[CAMPAIGN] Start error:', err)));
      res.json({ started: true, campaignId: campaign.id, total: campaign.totalBrokers });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to start campaign' });
    }
  });

  // POST /api/marketing/broker-campaign/:id/pause — pause running campaign
  app.post("/api/marketing/broker-campaign/:id/pause", async (req, res) => {
    try {
      await db.update(brokerCampaigns)
        .set({ status: 'paused' })
        .where(eq(brokerCampaigns.id, req.params.id));
      res.json({ success: true, status: 'paused' });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to pause campaign' });
    }
  });

  // POST /api/marketing/broker-campaign/:id/resume — resume paused campaign
  app.post("/api/marketing/broker-campaign/:id/resume", async (req, res) => {
    try {
      await db.update(brokerCampaigns)
        .set({ status: 'running' })
        .where(eq(brokerCampaigns.id, req.params.id));
      // Restart background processor
      setImmediate(() => {
        runCampaign(req.params.id).catch((err) =>
          console.error('[CAMPAIGN] Resume error:', err)
        );
      });
      res.json({ success: true, status: 'running' });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to resume campaign' });
    }
  });

  // GET /api/marketing/broker-campaign/:id/export — download entries as Excel
  app.get("/api/marketing/broker-campaign/:id/export", async (req, res) => {
    try {
      const XLSX = await import('xlsx');
      const [campaign] = await db.select().from(brokerCampaigns)
        .where(eq(brokerCampaigns.id, req.params.id)).limit(1);
      if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

      const entries = await db.select().from(brokerCampaignEntries)
        .where(eq(brokerCampaignEntries.campaignId, req.params.id));

      const rows = entries.map((e) => ({
        Name: e.name,
        Email: e.email,
        Phone: e.phone || '',
        License: e.license || '',
        RefCode: e.refCode,
        PartnerLink: e.partnerLink,
        Status: e.status,
        SentAt: e.sentAt ? new Date(e.sentAt).toLocaleString('en-AE', { timeZone: 'Asia/Dubai' }) : '',
        Error: e.errorMessage || '',
      }));

      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Brokers');

      const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
      const safeName = campaign.name.replace(/[^a-z0-9]/gi, '_').substring(0, 40);
      res.setHeader('Content-Disposition', `attachment; filename="${safeName}_brokers.xlsx"`);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(buf);
    } catch (err: any) {
      console.error('[EXPORT] Error:', err);
      res.status(500).json({ error: 'Export failed' });
    }
  });

  // GET /api/marketing/broker-campaigns/latest/export — download latest campaign entries
  app.get("/api/marketing/broker-campaigns/latest/export", async (_req, res) => {
    try {
      const XLSX = await import('xlsx');
      const campaigns = await db.select().from(brokerCampaigns)
        .orderBy(brokerCampaigns.createdAt);
      const latest = campaigns[campaigns.length - 1];
      if (!latest) {
        // Return empty template if no campaigns yet
        const ws = XLSX.utils.aoa_to_sheet([['Name', 'Email', 'Phone', 'License', 'RefCode', 'PartnerLink', 'Status']]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Brokers');
        const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
        res.setHeader('Content-Disposition', 'attachment; filename="broker_template.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        return res.send(buf);
      }

      const entries = await db.select().from(brokerCampaignEntries)
        .where(eq(brokerCampaignEntries.campaignId, latest.id));

      const rows = entries.map((e) => ({
        Name: e.name,
        Email: e.email,
        Phone: e.phone || '',
        License: e.license || '',
        RefCode: e.refCode,
        PartnerLink: e.partnerLink,
        Status: e.status,
        SentAt: e.sentAt ? new Date(e.sentAt).toLocaleString('en-AE', { timeZone: 'Asia/Dubai' }) : '',
        Error: e.errorMessage || '',
      }));

      const ws = XLSX.utils.json_to_sheet(rows.length ? rows : [{ Name: '', Email: '', Phone: '', License: '', RefCode: '', PartnerLink: '', Status: '' }]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Brokers');
      const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
      const safeName = latest.name.replace(/[^a-z0-9]/gi, '_').substring(0, 40);
      res.setHeader('Content-Disposition', `attachment; filename="${safeName}_brokers.xlsx"`);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(buf);
    } catch (err: any) {
      console.error('[EXPORT] Latest error:', err);
      res.status(500).json({ error: 'Export failed' });
    }
  });

  // ─── Broker Master & Automation Routes ──────────────────────────────────────

  // GET /api/marketing/broker-master — list brokers in master with pagination + search
  app.get("/api/marketing/broker-master", async (req, res) => {
    try {
      const page = parseInt(String(req.query.page || '1'));
      const limit = parseInt(String(req.query.limit || '50'));
      const offset = (page - 1) * limit;
      const search = String(req.query.search || '').trim().toLowerCase();

      const baseWhere = eq(brokerMaster.deleted, false);
      const whereClause = search
        ? and(baseWhere, drizzleSql`(lower(${brokerMaster.name}) like ${'%' + search + '%'} or lower(${brokerMaster.email}) like ${'%' + search + '%'} or lower(coalesce(${brokerMaster.company}, '')) like ${'%' + search + '%'})`)
        : baseWhere;

      const brokers = await db.select()
        .from(brokerMaster)
        .where(whereClause)
        .orderBy(desc(brokerMaster.createdAt))
        .limit(limit)
        .offset(offset);

      const [totalRow] = await db.select({ count: drizzleSql<number>`count(*)` }).from(brokerMaster).where(whereClause);
      const statusCounts = await db.select({
        status: brokerMaster.status,
        count: drizzleSql<number>`count(*)`,
      }).from(brokerMaster).where(baseWhere).groupBy(brokerMaster.status);

      res.json({
        brokers,
        total: Number(totalRow?.count || 0),
        page,
        limit,
        statusCounts,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch broker master' });
    }
  });

  // DELETE /api/marketing/broker-master/:id — soft-delete (remove from active list)
  app.delete("/api/marketing/broker-master/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db.update(brokerMaster)
        .set({ deleted: true, updatedAt: new Date() })
        .where(eq(brokerMaster.id, id));
      res.json({ success: true, id });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to remove broker' });
    }
  });

  // POST /api/marketing/broker-master/:id/restore — restore a deleted broker
  app.post("/api/marketing/broker-master/:id/restore", async (req, res) => {
    try {
      const { id } = req.params;
      await db.update(brokerMaster)
        .set({ deleted: false, updatedAt: new Date() })
        .where(eq(brokerMaster.id, id));
      res.json({ success: true, id });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to restore broker' });
    }
  });

  // GET /api/marketing/automation/status — get automation engine status + stats
  app.get("/api/marketing/automation/status", async (_req, res) => {
    try {
      const status = await getAutomationStatus();
      res.json({
        ...status,
        isRunning: isDailyRunning() || isFollowUpRunning(),
        isDailyRunning: isDailyRunning(),
        isFollowUpRunning: isFollowUpRunning(),
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to get automation status' });
    }
  });

  // POST /api/marketing/broker-daily/run — manually trigger daily email send cycle
  app.post("/api/marketing/broker-daily/run", async (_req, res) => {
    try {
      if (isDailyRunning()) {
        return res.status(409).json({ error: 'Daily cycle already running' });
      }
      const { runDailyAutomation } = await import('./services/broker-automation.js');
      runDailyAutomation(); // fire-and-forget so the response returns immediately
      res.json({ started: true, message: 'Daily campaign started — up to 300 emails will be sent from partners@deliwer.com' });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to start daily cycle' });
    }
  });

  // POST /api/marketing/broker-fetch — manually trigger RERA broker fetch
  app.post("/api/marketing/broker-fetch", async (_req, res) => {
    try {
      const result = await runBrokerFetch('manual_fetch');
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Fetch failed' });
    }
  });

  // GET /api/marketing/rera-file/stats — local RERA file stats
  app.get("/api/marketing/rera-file/stats", (_req, res) => {
    try {
      const stats = getLocalFileStats();
      res.json(stats);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to get file stats' });
    }
  });

  // GET /api/marketing/rera-file/download — download the saved RERA XLS
  app.get("/api/marketing/rera-file/download", (_req, res) => {
    const filePath = path.join(process.cwd(), 'server/data/RERA_Brokers.xls');
    res.download(filePath, 'RERA_Brokers.xls', (err) => {
      if (err) res.status(404).json({ error: 'File not found' });
    });
  });

  // POST /api/marketing/broker-followup/run — manually trigger follow-up engine
  app.post("/api/marketing/broker-followup/run", async (_req, res) => {
    try {
      const result = await runFollowUpEngine('manual_followup');
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Follow-up run failed' });
    }
  });

  // GET /api/marketing/automation/logs — recent automation run logs
  app.get("/api/marketing/automation/logs", async (req, res) => {
    try {
      const limit = parseInt(String(req.query.limit || '20'));
      const logs = await db.select()
        .from(brokerAutomationLog)
        .orderBy(desc(brokerAutomationLog.startedAt))
        .limit(limit);
      res.json(logs);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch logs' });
    }
  });

  // POST /api/marketing/broker-master/seed — seed master from existing campaign entries
  app.post("/api/marketing/broker-master/seed", async (_req, res) => {
    try {
      const entries = await db.select().from(brokerCampaignEntries);
      let added = 0;

      for (const entry of entries) {
        const existing = await db.select({ id: brokerMaster.id })
          .from(brokerMaster)
          .where(eq(brokerMaster.email, entry.email))
          .limit(1);

        if (existing.length === 0) {
          await db.insert(brokerMaster).values({
            email: entry.email,
            name: entry.name,
            phone: entry.phone || null,
            license: entry.license || null,
            refCode: entry.refCode,
            partnerLink: entry.partnerLink,
            status: entry.status === 'sent' ? 'sent' : 'new',
            firstContactedAt: entry.sentAt || null,
            lastContactedAt: entry.sentAt || null,
            source: 'manual',
          });
          added++;
        }
      }

      res.json({ success: true, added });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Seed failed' });
    }
  });

  // ── Daily Tips & Alerts Subscription System ──────────────────────────────────

  // POST /api/subscribe — subscribe an email to tips/alerts
  app.post("/api/subscribe", async (req, res) => {
    try {
      const { emailSubscribers } = await import('@shared/schema.js');
      const { email, firstName, source } = req.body;
      if (!email || !email.includes('@')) return res.status(400).json({ error: 'Valid email required' });

      const existing = await db.select().from(emailSubscribers).where(eq(emailSubscribers.email, email.toLowerCase())).limit(1);
      if (existing.length > 0) {
        if (!existing[0].isActive) {
          await db.update(emailSubscribers).set({ isActive: true, unsubscribedAt: null }).where(eq(emailSubscribers.email, email.toLowerCase()));
          return res.json({ success: true, reactivated: true, message: 'Welcome back! You\'ve been resubscribed.' });
        }
        return res.json({ success: true, alreadySubscribed: true, message: 'You\'re already subscribed!' });
      }

      await db.insert(emailSubscribers).values({
        email: email.toLowerCase(),
        firstName: firstName || null,
        subscriberType: 'consumer',
        source: source || 'emergency_prep',
        isActive: true,
        metadata: {},
      });

      res.json({ success: true, message: `Subscribed! Daily Dubai tips will arrive in ${email}` });
    } catch (err: any) {
      console.error('[Subscribe] Error:', err);
      res.status(500).json({ error: err.message || 'Subscription failed' });
    }
  });

  // POST /api/unsubscribe — unsubscribe by email
  app.post("/api/unsubscribe", async (req, res) => {
    try {
      const { emailSubscribers } = await import('@shared/schema.js');
      const { email } = req.body;
      await db.update(emailSubscribers).set({ isActive: false, unsubscribedAt: new Date() }).where(eq(emailSubscribers.email, email.toLowerCase()));
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Unsubscribe failed' });
    }
  });

  // GET /api/tips/stats — subscriber stats + recent send log
  app.get("/api/tips/stats", async (_req, res) => {
    try {
      const { getSubscriberStats } = await import('./services/tips-alert-service.js');
      const stats = await getSubscriberStats();
      res.json(stats);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /api/tips/library — list all tips in the library
  app.get("/api/tips/library", async (_req, res) => {
    try {
      const { TIPS_LIBRARY } = await import('./services/tips-alert-service.js');
      res.json(TIPS_LIBRARY);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /api/tips/send-now — manually trigger a tip broadcast (admin)
  app.post("/api/tips/send-now", async (req, res) => {
    try {
      const { runDailyTipsBroadcast } = await import('./services/tips-alert-service.js');
      const result = await runDailyTipsBroadcast(req.body.tipId);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /api/tips/alert — send emergency alert to all subscribers (admin)
  app.post("/api/tips/alert", async (req, res) => {
    try {
      const { sendEmergencyAlert } = await import('./services/tips-alert-service.js');
      const { alertLevel, message } = req.body;
      if (!alertLevel || !message) return res.status(400).json({ error: 'alertLevel and message required' });
      const result = await sendEmergencyAlert(alertLevel, message);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /api/tips/next — preview the next tip
  app.get("/api/tips/next", async (_req, res) => {
    try {
      const { getNextTip } = await import('./services/tips-alert-service.js');
      res.json(getNextTip());
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ── Wartime Readiness Network ─────────────────────────────────────────────────

  app.post("/api/wartime/register", async (req, res) => {
    try {
      const { wartimeMembers } = await import('@shared/schema.js');
      const { customAlphabet } = await import('nanoid');
      const genCode = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 8);
      const memberCode = `WRM-${genCode()}`;

      const member = {
        memberCode,
        fullName: req.body.fullName,
        phone: req.body.phone,
        whatsapp: req.body.whatsapp || req.body.phone,
        area: req.body.area,
        skills: Array.isArray(req.body.skills) ? req.body.skills : [],
        familyCount: parseInt(req.body.familyCount) || 1,
        hasPets: !!req.body.hasPets,
        medicalNeeds: req.body.medicalNeeds || null,
        alertPreference: req.body.alertPreference || 'whatsapp',
        hasSupplyKit: !!req.body.hasSupplyKit,
        hasEvacPlan: !!req.body.hasEvacPlan,
        status: 'active',
      };

      const [inserted] = await db.insert(wartimeMembers).values(member).returning();
      res.json({ success: true, memberCode: inserted.memberCode, id: inserted.id });
    } catch (err: any) {
      console.error('[Wartime] Register error:', err);
      res.status(500).json({ error: err.message || 'Registration failed' });
    }
  });

  app.get("/api/wartime/count", async (_req, res) => {
    try {
      const { wartimeMembers } = await import('@shared/schema.js');
      const result = await db.select({ count: drizzleSql<number>`count(*)` }).from(wartimeMembers);
      res.json({ count: Number(result[0]?.count ?? 0) });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Count failed' });
    }
  });

  // ── Emergency Evacuation Exit Strategy ───────────────────────────────────────

  // POST /api/emergency-exit/register — register an evacuation profile
  app.post("/api/emergency-exit/register", async (req, res) => {
    try {
      const { emergencyEvacuationProfiles } = await import('@shared/schema.js');
      const { customAlphabet } = await import('nanoid');
      const genCode = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 8);
      const planCode = `EVX-${genCode()}`;

      const profile = {
        planCode,
        fullName: req.body.fullName,
        nationality: req.body.nationality,
        currentArea: req.body.currentArea,
        visaType: req.body.visaType,
        familyCount: parseInt(req.body.familyCount) || 1,
        hasPets: !!req.body.hasPets,
        medicalNeeds: req.body.medicalNeeds || null,
        emergencyContactName: req.body.emergencyContactName,
        emergencyContactPhone: req.body.emergencyContactPhone,
        emergencyContactCountry: req.body.emergencyContactCountry,
        preferredExitRoute: req.body.preferredExitRoute,
        vehicleAvailable: !!req.body.vehicleAvailable,
        whatsapp: req.body.whatsapp || null,
        status: 'active',
      };

      const [inserted] = await db.insert(emergencyEvacuationProfiles).values(profile).returning();
      res.json({ success: true, planCode: inserted.planCode, id: inserted.id });
    } catch (err: any) {
      console.error('[Emergency Exit] Register error:', err);
      res.status(500).json({ error: err.message || 'Registration failed' });
    }
  });

  // GET /api/emergency-exit/plan/:code — retrieve a profile by plan code
  app.get("/api/emergency-exit/plan/:code", async (req, res) => {
    try {
      const { emergencyEvacuationProfiles } = await import('@shared/schema.js');
      const { eq } = await import('drizzle-orm');
      const [profile] = await db.select().from(emergencyEvacuationProfiles)
        .where(eq(emergencyEvacuationProfiles.planCode, req.params.code.toUpperCase()))
        .limit(1);
      if (!profile) return res.status(404).json({ error: 'Plan not found' });
      res.json(profile);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Lookup failed' });
    }
  });

  // GET /api/emergency-exit/count — total registrations
  app.get("/api/emergency-exit/count", async (_req, res) => {
    try {
      const { emergencyEvacuationProfiles } = await import('@shared/schema.js');
      const result = await db.select({ count: drizzleSql<number>`count(*)` }).from(emergencyEvacuationProfiles);
      res.json({ count: Number(result[0]?.count ?? 0) });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Count failed' });
    }
  });

  // ── SendGrid Live Stats & Campaign Control ───────────────────────────────────

  // GET /api/sendgrid/stats — fetch live stats from SendGrid Stats API
  app.get("/api/sendgrid/stats", async (req, res) => {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      return res.json({
        configured: false,
        error: "SENDGRID_API_KEY not set",
        stats: null,
        dailyStats: []
      });
    }

    try {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 29); // last 30 days

      const fmt = (d: Date) => d.toISOString().split('T')[0];

      // Fetch aggregated global stats
      const [globalResp, dailyResp] = await Promise.all([
        fetch(`https://api.sendgrid.com/v3/stats?start_date=${fmt(startDate)}&end_date=${fmt(today)}`, {
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }
        }),
        fetch(`https://api.sendgrid.com/v3/stats?start_date=${fmt(startDate)}&end_date=${fmt(today)}&aggregated_by=day`, {
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }
        })
      ]);

      const globalData = await globalResp.json() as any[];
      const dailyData = await dailyResp.json() as any[];

      // Aggregate global totals
      const totals = {
        requests: 0, delivered: 0, opens: 0, unique_opens: 0,
        clicks: 0, unique_clicks: 0, bounces: 0, spam_reports: 0,
        unsubscribes: 0, blocks: 0, deferred: 0
      };

      if (Array.isArray(globalData)) {
        for (const day of globalData) {
          const m = day.stats?.[0]?.metrics || {};
          totals.requests += m.requests || 0;
          totals.delivered += m.delivered || 0;
          totals.opens += m.opens || 0;
          totals.unique_opens += m.unique_opens || 0;
          totals.clicks += m.clicks || 0;
          totals.unique_clicks += m.unique_clicks || 0;
          totals.bounces += m.bounces || 0;
          totals.spam_reports += m.spam_reports || 0;
          totals.unsubscribes += m.unsubscribes || 0;
          totals.blocks += m.blocks || 0;
          totals.deferred += m.deferred || 0;
        }
      }

      const deliveredRate = totals.requests > 0 ? ((totals.delivered / totals.requests) * 100).toFixed(2) : '0.00';
      const openRate = totals.delivered > 0 ? ((totals.unique_opens / totals.delivered) * 100).toFixed(2) : '0.00';
      const clickRate = totals.delivered > 0 ? ((totals.unique_clicks / totals.delivered) * 100).toFixed(2) : '0.00';
      const bounceRate = totals.requests > 0 ? ((totals.bounces / totals.requests) * 100).toFixed(2) : '0.00';
      const spamRate = totals.delivered > 0 ? ((totals.spam_reports / totals.delivered) * 100).toFixed(2) : '0.00';

      // Build daily chart data
      const dailyChart = Array.isArray(dailyData) ? dailyData.map((d: any) => ({
        date: d.date,
        requests: d.stats?.[0]?.metrics?.requests || 0,
        delivered: d.stats?.[0]?.metrics?.delivered || 0,
        opens: d.stats?.[0]?.metrics?.opens || 0,
        clicks: d.stats?.[0]?.metrics?.clicks || 0,
        bounces: d.stats?.[0]?.metrics?.bounces || 0,
      })) : [];

      res.json({
        configured: true,
        period: { start: fmt(startDate), end: fmt(today) },
        totals,
        rates: { deliveredRate, openRate, clickRate, bounceRate, spamRate },
        dailyChart,
      });
    } catch (error: any) {
      console.error('[SendGrid Stats] Error:', error);
      res.status(500).json({ configured: true, error: error.message, stats: null, dailyStats: [] });
    }
  });

  // POST /api/sendgrid/trigger-daily — manually trigger the daily broker email campaign
  app.post("/api/sendgrid/trigger-daily", async (_req, res) => {
    try {
      const { isDailyRunning, runDailyAutomation } = await import('./services/broker-automation.js');
      if (isDailyRunning()) {
        return res.status(409).json({ error: 'Daily campaign already running — check back shortly' });
      }
      runDailyAutomation();
      res.json({ started: true, message: 'Daily broker campaign triggered — up to 300 emails queued via SendGrid' });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to trigger campaign' });
    }
  });

  // POST /api/sendgrid/trigger-followup — manually trigger follow-up email sequences
  app.post("/api/sendgrid/trigger-followup", async (_req, res) => {
    try {
      const { isFollowUpRunning, runFollowUpAutomation } = await import('./services/broker-automation.js');
      if (isFollowUpRunning()) {
        return res.status(409).json({ error: 'Follow-up engine already running' });
      }
      runFollowUpAutomation();
      res.json({ started: true, message: 'Follow-up sequences triggered for Day 2, Day 5, and Day 10 recipients' });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to trigger follow-ups' });
    }
  });

  // ── Intent Signal Interception System ────────────────────────────────────
  app.get("/api/marketing/intent-signals/communities", async (_req, res) => {
    try {
      const { REAL_COMMUNITIES } = await import('./services/intent-interceptor-service.js');
      res.json(REAL_COMMUNITIES);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/marketing/intent-signals", async (req, res) => {
    try {
      const { getIntentSignals } = await import('./services/intent-interceptor-service.js');
      const { status, source, intentType, captureType } = req.query as Record<string, string>;
      const signals = await getIntentSignals({ status, source, intentType, captureType, limit: 100 });
      res.json(signals);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/marketing/intent-signals", async (req, res) => {
    try {
      const { createManualSignal } = await import('./services/intent-interceptor-service.js');
      const signal = await createManualSignal(req.body);
      res.json(signal);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/marketing/intent-signals/stats", async (_req, res) => {
    try {
      const { getIntentStats } = await import('./services/intent-interceptor-service.js');
      const stats = await getIntentStats();
      res.json(stats);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/marketing/intent-signals/generate", async (req, res) => {
    try {
      const { generateNewSignals } = await import('./services/intent-interceptor-service.js');
      const count = Number(req.body?.count) || 5;
      const inserted = await generateNewSignals(count);
      res.json({ inserted, message: `Generated ${inserted} new intent signals from broker channels` });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/marketing/intent-signals/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const { updateSignalStatus } = await import('./services/intent-interceptor-service.js');
      await updateSignalStatus(id, status);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/marketing/intent-signals/:id/respond", async (req, res) => {
    try {
      const { id } = req.params;
      const { generateAIResponse } = await import('./services/intent-interceptor-service.js');
      const message = await generateAIResponse(id);
      res.json({ message });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ── Social Handle Discovery Agent ─────────────────────────────────────────
  app.get("/api/marketing/social-discovery/stats", async (_req, res) => {
    try {
      const { getSocialDiscoveryStats, getDiscoveryStatus, isDiscoveryRunning } = await import('./services/social-discovery-service.js');
      const stats = await getSocialDiscoveryStats();
      const status = getDiscoveryStatus();
      res.json({
        isRunning: isDiscoveryRunning(),
        progress: status.progress,
        stats,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/marketing/social-discovery/run", async (req, res) => {
    try {
      const { isDiscoveryRunning, runSocialDiscovery } = await import('./services/social-discovery-service.js');
      if (isDiscoveryRunning()) {
        return res.status(409).json({ error: 'Social discovery already running' });
      }
      const limit = Number(req.body?.limit) || 50;
      runSocialDiscovery(limit).catch(err => console.error('[SOCIAL DISCOVERY] Run error:', err.message));
      res.json({ started: true, message: `Social handle discovery started for up to ${limit} brokers` });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/marketing/broker-master/:id/social", async (req, res) => {
    try {
      const { id } = req.params;
      const { linkedinUrl, instagramHandle, twitterHandle, facebookUrl, gmbUrl, socialNotes } = req.body;
      const { updateBrokerSocial } = await import('./services/social-discovery-service.js');
      await updateBrokerSocial(id, { linkedinUrl, instagramHandle, twitterHandle, facebookUrl, gmbUrl, socialNotes });
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /api/marketing/broker-master/:id/social — fetch social data for a broker
  app.get("/api/marketing/broker-master/:id/social", async (req, res) => {
    try {
      const { id } = req.params;
      const [broker] = await db
        .select({
          id: brokerMaster.id,
          name: brokerMaster.name,
          company: brokerMaster.company,
          linkedinUrl: brokerMaster.linkedinUrl,
          instagramHandle: brokerMaster.instagramHandle,
          twitterHandle: brokerMaster.twitterHandle,
          facebookUrl: brokerMaster.facebookUrl,
          gmbUrl: brokerMaster.gmbUrl,
          socialDiscoveryStatus: brokerMaster.socialDiscoveryStatus,
          socialDiscoveredAt: brokerMaster.socialDiscoveredAt,
          socialNotes: brokerMaster.socialNotes,
        })
        .from(brokerMaster)
        .where(eq(brokerMaster.id, id));
      if (!broker) return res.status(404).json({ error: 'Broker not found' });
      res.json(broker);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /api/marketing/broker-master/:id/direct-message — generate direct outreach message
  app.post("/api/marketing/broker-master/:id/direct-message", async (req, res) => {
    try {
      const { id } = req.params;
      const { platform } = req.body;
      const [broker] = await db
        .select()
        .from(brokerMaster)
        .where(eq(brokerMaster.id, id));
      if (!broker) return res.status(404).json({ error: 'Broker not found' });
      const { generateBrokerDirectMessage } = await import('./services/community-outreach-service.js');
      const message = await generateBrokerDirectMessage({
        name: broker.name,
        company: broker.company,
        linkedinUrl: broker.linkedinUrl,
        instagramHandle: broker.instagramHandle,
        platform: platform || 'whatsapp',
      });
      res.json(message);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /api/marketing/communities — list Dubai RE communities
  app.get("/api/marketing/communities", async (_req, res) => {
    try {
      const { DUBAI_RE_COMMUNITIES } = await import('./services/community-outreach-service.js');
      res.json(DUBAI_RE_COMMUNITIES);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /api/marketing/communities/:id/message — generate outreach message for a community
  app.post("/api/marketing/communities/:id/message", async (req, res) => {
    try {
      const { id } = req.params;
      const { style = 'value_prop' } = req.body;
      const { DUBAI_RE_COMMUNITIES, generateCommunityMessage } = await import('./services/community-outreach-service.js');
      const community = DUBAI_RE_COMMUNITIES.find(c => c.id === id);
      if (!community) return res.status(404).json({ error: 'Community not found' });
      const message = await generateCommunityMessage(community, style);
      res.json(message);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /api/marketing/broker-master — with social fields included
  app.get("/api/marketing/broker-social-list", async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 50;
      const offset = (page - 1) * limit;
      const status = req.query.status as string | undefined;

      const whereClause = status
        ? and(eq(brokerMaster.deleted, false), eq(brokerMaster.socialDiscoveryStatus, status))
        : eq(brokerMaster.deleted, false);

      const brokers = await db
        .select({
          id: brokerMaster.id,
          name: brokerMaster.name,
          email: brokerMaster.email,
          phone: brokerMaster.phone,
          company: brokerMaster.company,
          license: brokerMaster.license,
          linkedinUrl: brokerMaster.linkedinUrl,
          instagramHandle: brokerMaster.instagramHandle,
          twitterHandle: brokerMaster.twitterHandle,
          facebookUrl: brokerMaster.facebookUrl,
          gmbUrl: brokerMaster.gmbUrl,
          socialDiscoveryStatus: brokerMaster.socialDiscoveryStatus,
          socialDiscoveredAt: brokerMaster.socialDiscoveredAt,
          socialNotes: brokerMaster.socialNotes,
        })
        .from(brokerMaster)
        .where(whereClause)
        .orderBy(desc(brokerMaster.createdAt))
        .limit(limit)
        .offset(offset);

      const [totalRow] = await db
        .select({ count: drizzleSql<number>`count(*)` })
        .from(brokerMaster)
        .where(whereClause);

      res.json({ brokers, total: Number(totalRow?.count || 0), page, limit });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

