import { Router } from "express";
import { z } from "zod";
import { storage } from "../storage";
import {
  insertFulfillmentResellerSchema,
  insertFulfillmentOrderSchema,
  insertResellerInventorySubscriptionSchema,
  insertFulfillmentPricingSchema,
} from "@shared/schema";

const router = Router();

// ============================================================================
// RESELLER MANAGEMENT
// ============================================================================

// Get all resellers (admin)
router.get("/resellers", async (req, res) => {
  try {
    const { status, kycStatus } = req.query;
    const resellers = await storage.getAllFulfillmentResellers(
      status as string | undefined,
      kycStatus as string | undefined
    );
    res.json(resellers);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch resellers" });
  }
});

// Get reseller by ID
router.get("/resellers/:id", async (req, res) => {
  try {
    const reseller = await storage.getFulfillmentReseller(req.params.id);
    if (!reseller) {
      return res.status(404).json({ error: "Reseller not found" });
    }
    res.json(reseller);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch reseller" });
  }
});

// Get reseller by user ID
router.get("/resellers/by-user/:userId", async (req, res) => {
  try {
    const reseller = await storage.getFulfillmentResellerByUserId(req.params.userId);
    if (!reseller) {
      return res.status(404).json({ error: "Reseller not found" });
    }
    res.json(reseller);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch reseller" });
  }
});

// Create new reseller (onboarding)
router.post("/resellers", async (req, res) => {
  try {
    const validatedData = insertFulfillmentResellerSchema.parse(req.body);
    const reseller = await storage.createFulfillmentReseller(validatedData);
    res.json(reseller);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid reseller data" });
  }
});

// Update reseller
router.patch("/resellers/:id", async (req, res) => {
  try {
    const updates = req.body;
    const reseller = await storage.updateFulfillmentReseller(req.params.id, updates);
    if (!reseller) {
      return res.status(404).json({ error: "Reseller not found" });
    }
    res.json(reseller);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to update reseller" });
  }
});

// Verify reseller KYC
router.post("/resellers/:id/verify", async (req, res) => {
  try {
    const { verifiedBy } = req.body;
    const reseller = await storage.updateFulfillmentReseller(req.params.id, {
      kycStatus: "verified",
      verifiedAt: new Date(),
      verifiedBy,
    });
    
    if (!reseller) {
      return res.status(404).json({ error: "Reseller not found" });
    }
    
    res.json(reseller);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to verify reseller" });
  }
});

// ============================================================================
// FULFILLMENT ORDERS
// ============================================================================

// Get all fulfillment orders
router.get("/orders", async (req, res) => {
  try {
    const { resellerId, paymentStatus, fulfillmentStatus } = req.query;
    const orders = await storage.getAllFulfillmentOrders(
      resellerId as string | undefined,
      paymentStatus as string | undefined,
      fulfillmentStatus as string | undefined
    );
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Get order by ID
router.get("/orders/:id", async (req, res) => {
  try {
    const order = await storage.getFulfillmentOrder(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

// Create new fulfillment order
router.post("/orders", async (req, res) => {
  try {
    const validatedData = insertFulfillmentOrderSchema.parse(req.body);
    
    // Generate order number
    const year = new Date().getFullYear();
    const random = String(Math.floor(Math.random() * 100000)).padStart(5, '0');
    const orderNumber = `FBD-${year}-${random}`;
    
    const orderData = {
      ...validatedData,
      orderNumber,
    };
    
    const order = await storage.createFulfillmentOrder(orderData);
    res.json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid order data" });
  }
});

// Update order
router.patch("/orders/:id", async (req, res) => {
  try {
    const updates = req.body;
    const order = await storage.updateFulfillmentOrder(req.params.id, updates);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to update order" });
  }
});

// Mark order as paid
router.post("/orders/:id/mark-paid", async (req, res) => {
  try {
    const { paymentMethod, paymentReference } = req.body;
    const order = await storage.updateFulfillmentOrder(req.params.id, {
      paymentStatus: "paid",
      paidAt: new Date(),
      paymentMethod,
      paymentReference,
      fulfillmentStatus: "processing",
    });
    
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    res.json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to mark order as paid" });
  }
});

// Mark order as shipped
router.post("/orders/:id/mark-shipped", async (req, res) => {
  try {
    const { shippingCarrier, trackingNumber, trackingUrl } = req.body;
    const order = await storage.updateFulfillmentOrder(req.params.id, {
      fulfillmentStatus: "shipped",
      shippedAt: new Date(),
      shippingCarrier,
      trackingNumber,
      trackingUrl,
    });
    
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    res.json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to mark order as shipped" });
  }
});

// Mark order as delivered
router.post("/orders/:id/mark-delivered", async (req, res) => {
  try {
    const order = await storage.updateFulfillmentOrder(req.params.id, {
      fulfillmentStatus: "delivered",
      deliveredAt: new Date(),
    });
    
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    // Update reseller statistics
    const reseller = await storage.getFulfillmentReseller(order.resellerId);
    if (reseller) {
      await storage.updateFulfillmentReseller(order.resellerId, {
        totalOrders: reseller.totalOrders + 1,
        totalRevenue: reseller.totalRevenue + order.totalAmount,
        monthlyOrderVolume: (reseller.monthlyOrderVolume || 0) + 1,
      });
    }
    
    res.json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to mark order as delivered" });
  }
});

// Cancel order
router.post("/orders/:id/cancel", async (req, res) => {
  try {
    const { cancellationReason } = req.body;
    const order = await storage.updateFulfillmentOrder(req.params.id, {
      fulfillmentStatus: "cancelled",
      cancelledAt: new Date(),
      cancellationReason,
    });
    
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    res.json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to cancel order" });
  }
});

// ============================================================================
// INVENTORY SUBSCRIPTIONS
// ============================================================================

// Get inventory subscriptions for reseller
router.get("/inventory-subscriptions", async (req, res) => {
  try {
    const { resellerId } = req.query;
    const subscriptions = await storage.getResellerInventorySubscriptions(
      resellerId as string | undefined
    );
    res.json(subscriptions);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch subscriptions" });
  }
});

// Create inventory subscription
router.post("/inventory-subscriptions", async (req, res) => {
  try {
    const validatedData = insertResellerInventorySubscriptionSchema.parse(req.body);
    const subscription = await storage.createResellerInventorySubscription(validatedData);
    res.json(subscription);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid subscription data" });
  }
});

// Update inventory subscription
router.patch("/inventory-subscriptions/:id", async (req, res) => {
  try {
    const updates = req.body;
    const subscription = await storage.updateResellerInventorySubscription(req.params.id, updates);
    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }
    res.json(subscription);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to update subscription" });
  }
});

// ============================================================================
// FULFILLMENT PRICING
// ============================================================================

// Get available inventory with pricing for reseller
router.get("/inventory-feed", async (req, res) => {
  try {
    const { resellerId, productType, condition, sourceCountry } = req.query;
    
    // Get reseller to determine their tier
    let resellerTier = "starter";
    if (resellerId) {
      const reseller = await storage.getFulfillmentReseller(resellerId as string);
      if (reseller) {
        resellerTier = reseller.resellerTier;
      }
    }
    
    // Get available pricing
    const pricingData = await storage.getAvailableFulfillmentPricing({
      productType: productType as string | undefined,
      condition: condition as string | undefined,
      sourceCountry: sourceCountry as string | undefined,
    });
    
    // Map pricing based on reseller tier
    const inventoryFeed = pricingData.map(item => ({
      ...item,
      resellerPrice: resellerTier === "starter" ? item.starterPrice :
                     resellerTier === "growth" ? item.growthPrice :
                     item.enterprisePrice,
      resellerTier,
    }));
    
    res.json(inventoryFeed);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch inventory feed" });
  }
});

// Get pricing for specific product
router.get("/pricing", async (req, res) => {
  try {
    const { productType, condition, storage: storageSize, color, grade } = req.query;
    
    const pricing = await storage.getAvailableFulfillmentPricing({
      productType: productType as string | undefined,
      condition: condition as string | undefined,
      storage: storageSize as string | undefined,
      color: color as string | undefined,
      grade: grade as string | undefined,
    });
    
    res.json(pricing);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch pricing" });
  }
});

// Create/Update pricing (admin)
router.post("/pricing", async (req, res) => {
  try {
    const validatedData = insertFulfillmentPricingSchema.parse(req.body);
    const pricing = await storage.createFulfillmentPricing(validatedData);
    res.json(pricing);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid pricing data" });
  }
});

// ============================================================================
// ANALYTICS & REPORTING
// ============================================================================

// Get reseller dashboard statistics
router.get("/resellers/:id/stats", async (req, res) => {
  try {
    const reseller = await storage.getFulfillmentReseller(req.params.id);
    if (!reseller) {
      return res.status(404).json({ error: "Reseller not found" });
    }
    
    // Get orders for this reseller
    const orders = await storage.getAllFulfillmentOrders(req.params.id);
    
    // Calculate statistics
    const stats = {
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.fulfillmentStatus === "pending").length,
      processingOrders: orders.filter(o => o.fulfillmentStatus === "processing").length,
      shippedOrders: orders.filter(o => o.fulfillmentStatus === "shipped").length,
      deliveredOrders: orders.filter(o => o.fulfillmentStatus === "delivered").length,
      cancelledOrders: orders.filter(o => o.fulfillmentStatus === "cancelled").length,
      totalRevenue: reseller.totalRevenue,
      averageOrderValue: reseller.averageOrderValue,
      reputationScore: reseller.reputationScore,
      resellerTier: reseller.resellerTier,
    };
    
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

export default router;
