import { Router, Request, Response } from "express";
import { db } from "../db";
import { chaintrackMembershipTiers, userSubscriptions, users } from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";
import Stripe from "stripe";
import { z } from "zod";

const router = Router();

// Initialize Stripe
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-08-27.basil",
  });
}

// Subscription request schema
const subscribeSchema = z.object({
  tierId: z.string(),
  paymentMethodId: z.string().optional(),
});

// Get all active membership tiers
router.get("/tiers", async (req: Request, res: Response) => {
  try {
    const tiers = await db
      .select()
      .from(chaintrackMembershipTiers)
      .where(and(
        eq(chaintrackMembershipTiers.isActive, true),
        eq(chaintrackMembershipTiers.isPublic, true)
      ))
      .orderBy(chaintrackMembershipTiers.priority);

    res.json(tiers);
  } catch (error: any) {
    console.error("Error fetching membership tiers:", error);
    res.status(500).json({ message: "Failed to fetch membership tiers" });
  }
});

// Get user's current subscription
router.get("/my-subscription", async (req: Request, res: Response) => {
  try {
    if (!(req as any).isAuthenticated || !(req as any).isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User ID not found" });
    }

    const subscription = await db
      .select()
      .from(userSubscriptions)
      .where(and(
        eq(userSubscriptions.userId, userId),
        eq(userSubscriptions.status, "active")
      ))
      .orderBy(desc(userSubscriptions.createdAt))
      .limit(1);

    if (subscription.length === 0) {
      return res.json(null);
    }

    res.json(subscription[0]);
  } catch (error: any) {
    console.error("Error fetching user subscription:", error);
    res.status(500).json({ message: "Failed to fetch subscription" });
  }
});

// Get subscription details with tier info
router.get("/my-subscription/details", async (req: Request, res: Response) => {
  try {
    if (!(req as any).isAuthenticated || !(req as any).isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User ID not found" });
    }

    const result = await db
      .select({
        subscription: userSubscriptions,
        tier: chaintrackMembershipTiers,
      })
      .from(userSubscriptions)
      .innerJoin(
        chaintrackMembershipTiers,
        eq(userSubscriptions.tierId, chaintrackMembershipTiers.id)
      )
      .where(and(
        eq(userSubscriptions.userId, userId),
        eq(userSubscriptions.status, "active")
      ))
      .orderBy(desc(userSubscriptions.createdAt))
      .limit(1);

    if (result.length === 0) {
      return res.json(null);
    }

    res.json(result[0]);
  } catch (error: any) {
    console.error("Error fetching subscription details:", error);
    res.status(500).json({ message: "Failed to fetch subscription details" });
  }
});

// Create new subscription
router.post("/subscribe", async (req: Request, res: Response) => {
  try {
    if (!(req as any).isAuthenticated || !(req as any).isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User ID not found" });
    }

    if (!stripe) {
      return res.status(503).json({ message: "Payment processing unavailable" });
    }

    // Validate request body
    const result = subscribeSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid request", errors: result.error.errors });
    }

    const { tierId } = result.data;

    // Get tier details
    const tier = await db
      .select()
      .from(chaintrackMembershipTiers)
      .where(eq(chaintrackMembershipTiers.id, tierId))
      .limit(1);

    if (tier.length === 0) {
      return res.status(404).json({ message: "Tier not found" });
    }

    const selectedTier = tier[0];

    // Check if user already has active subscription
    const existingSub = await db
      .select()
      .from(userSubscriptions)
      .where(and(
        eq(userSubscriptions.userId, userId),
        eq(userSubscriptions.status, "active")
      ))
      .limit(1);

    if (existingSub.length > 0) {
      return res.status(400).json({ message: "User already has an active subscription" });
    }

    // Create or get Stripe customer
    const user = (req as any).user;
    let stripeCustomerId = user.stripeCustomerId;
    
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId },
      });
      stripeCustomerId = customer.id;
      
      // Persist customer ID to user record
      await db
        .update(users)
        .set({ stripeCustomerId })
        .where(eq(users.id, userId));
    }

    // For free tier (Pay-As-You-Go), create subscription without payment
    if (selectedTier.monthlyFeeUSD === 0) {
      const now = new Date();
      const periodEnd = new Date();
      periodEnd.setMonth(periodEnd.getMonth() + 1);

      const [newSubscription] = await db
        .insert(userSubscriptions)
        .values({
          userId,
          tierId,
          status: 'active',
          stripeSubscriptionId: null,
          stripeCustomerId,
          currentPeriodStart: now,
          currentPeriodEnd: periodEnd,
        })
        .returning();

      return res.json({ subscription: newSubscription, checkoutUrl: null });
    }

    // For paid tiers, create Stripe Checkout Session
    const baseUrl = process.env.REPL_SLUG 
      ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
      : 'http://localhost:5000';

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: 'subscription',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `ChainTrack ${selectedTier.tierName} Membership`,
            description: `Monthly membership - ${selectedTier.features[0]}`,
          },
          unit_amount: selectedTier.monthlyFeeUSD,
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      }],
      success_url: `${baseUrl}/membership-plans?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/membership-plans`,
      metadata: {
        userId,
        tierId,
      },
    });

    res.json({ checkoutUrl: session.url });
  } catch (error: any) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ message: "Failed to create subscription" });
  }
});

// Upgrade subscription to higher tier
router.put("/upgrade", async (req: Request, res: Response) => {
  try {
    if (!(req as any).isAuthenticated || !(req as any).isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User ID not found" });
    }

    if (!stripe) {
      return res.status(503).json({ message: "Payment processing unavailable" });
    }

    const { newTierId } = req.body;
    if (!newTierId) {
      return res.status(400).json({ message: "New tier ID is required" });
    }

    // Get current subscription
    const currentSub = await db
      .select()
      .from(userSubscriptions)
      .where(and(
        eq(userSubscriptions.userId, userId),
        eq(userSubscriptions.status, "active")
      ))
      .orderBy(desc(userSubscriptions.createdAt))
      .limit(1);

    if (currentSub.length === 0) {
      return res.status(404).json({ message: "No active subscription found" });
    }

    const subscription = currentSub[0];

    // Get new tier details
    const newTier = await db
      .select()
      .from(chaintrackMembershipTiers)
      .where(eq(chaintrackMembershipTiers.id, newTierId))
      .limit(1);

    if (newTier.length === 0) {
      return res.status(404).json({ message: "New tier not found" });
    }

    const targetTier = newTier[0];

    // Update Stripe subscription if it exists
    if (subscription.stripeSubscriptionId && targetTier.monthlyFeeUSD > 0) {
      // Retrieve the current subscription to get the item ID
      const stripeSubscription = await stripe.subscriptions.retrieve(subscription.stripeSubscriptionId);
      
      if (stripeSubscription.items.data.length === 0) {
        return res.status(400).json({ message: "Invalid subscription - no items found" });
      }

      const currentItemId = stripeSubscription.items.data[0].id;

      // Update the subscription with new price using existing item ID
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        items: [{
          id: currentItemId,
          price_data: {
            currency: 'usd',
            product_data: {
              name: `ChainTrack ${targetTier.tierName} Membership`,
              description: `Monthly membership - ${targetTier.features[0]}`,
            },
            unit_amount: targetTier.monthlyFeeUSD,
            recurring: {
              interval: 'month',
            },
          },
        }],
        proration_behavior: 'create_prorations',
      });
    }

    // Update subscription record
    const [updatedSubscription] = await db
      .update(userSubscriptions)
      .set({
        tierId: newTierId,
        updatedAt: new Date(),
      })
      .where(eq(userSubscriptions.id, subscription.id))
      .returning();

    res.json(updatedSubscription);
  } catch (error: any) {
    console.error("Error upgrading subscription:", error);
    res.status(500).json({ message: "Failed to upgrade subscription" });
  }
});

export default router;
