import { Router } from "express";
import { storage } from "../storage";
import { randomUUID } from "crypto";
import QRCode from "qrcode";

const router = Router();

// Claim the Chill & Grill Pizza + Kulfi deal
router.post("/claim-deal", async (req, res) => {
  try {
    const { dealType = 'chill-grill-pizza-kulfi', heroId } = req.body;

    // Generate unique voucher code
    const voucherCode = `CG-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 6).toUpperCase()}`;

    // Get or create the coupon template
    let template = (await storage.getCouponTemplates()).find(t => t.brand === "Chill & Grill");
    
    if (!template) {
      // Create template if it doesn't exist
      template = await storage.createCouponTemplate({
        brand: "Chill & Grill",
        title: "Pizza for Two + 2x Kulfi",
        description: "Healthy and refreshing meal when you refer one friend - AED 99 value. Delivered via AquaCafe platform.",
        faceValue: 9900, // in fils
        discountPercent: 0,
        usageLimit: 1,
        validityDays: 30,
        terms: "Valid for one-time use. Home delivery only. Must order through AquaCafe platform.",
        category: "food",
      });
    }

    // Create and persist issued coupon
    const issuedCoupon = await storage.createIssuedCoupon({
      heroId: heroId || "anonymous", // Default to anonymous if no heroId provided
      templateId: template.id,
      couponCode: voucherCode,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    // Generate QR code
    const qrCodeData = JSON.stringify({
      code: voucherCode,
      type: dealType,
      value: 99,
      currency: "AED",
    });
    
    const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

    res.json({
      success: true,
      code: voucherCode,
      qrCodeUrl,
      expiresAt: issuedCoupon.expiresAt,
      template: {
        title: template.title,
        description: template.description,
        value: template.faceValue / 100, // Convert back to AED
      },
    });
  } catch (error: any) {
    console.error("Error claiming voucher:", error);
    res.status(500).json({ error: error.message || "Failed to claim voucher" });
  }
});

// Get user's vouchers
router.get("/my-vouchers", async (req, res) => {
  try {
    const { heroId } = req.query;

    if (!heroId || typeof heroId !== 'string') {
      return res.status(400).json({ error: "Hero ID is required" });
    }

    const coupons = await storage.getIssuedCoupons(heroId);
    
    // Enhance with template data
    const enhancedCoupons = await Promise.all(
      coupons.map(async (coupon) => {
        const template = await storage.getCouponTemplate(coupon.templateId);
        return {
          ...coupon,
          template,
        };
      })
    );

    res.json(enhancedCoupons);
  } catch (error: any) {
    console.error("Error fetching vouchers:", error);
    res.status(500).json({ error: error.message || "Failed to fetch vouchers" });
  }
});

// Track referral and issue reward
router.post("/track-referral", async (req, res) => {
  try {
    const { referrerId, newUserId, referralCode } = req.body;

    if (!referrerId || !newUserId) {
      return res.status(400).json({ error: "Referrer ID and new user ID are required" });
    }

    // Check if referral already exists
    const existingReferrals = await storage.getReferralsByHero(referrerId);
    const duplicate = existingReferrals.find(
      (r: any) => r.referrerId === referrerId && r.refereeId === newUserId
    );

    if (duplicate) {
      return res.status(400).json({ error: "Referral already tracked" });
    }

    // Create referral record
    const referral = await storage.createReferral(referrerId, newUserId);

    // Issue D100 Chill & Grill voucher to referrer
    const voucherCode = `CG-REF-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 6).toUpperCase()}`;

    // Get or create the D100 referral reward template
    let template = (await storage.getCouponTemplates()).find(
      t => t.brand === "Chill & Grill" && t.faceValue === 10000
    );
    
    if (!template) {
      template = await storage.createCouponTemplate({
        brand: "Chill & Grill",
        title: "D100 Referral Reward",
        description: "Thank you for referring a friend! Use this D100 credit for any Chill & Grill items via AquaCafe.",
        faceValue: 10000, // D100 in fils
        discountPercent: 0,
        usageLimit: 1,
        validityDays: 90,
        terms: "Valid for 90 days. Can be used for any Chill & Grill menu items. Home delivery only.",
        category: "credit",
      });
    }

    // Create and persist the reward coupon
    const issuedCoupon = await storage.createIssuedCoupon({
      heroId: referrerId,
      templateId: template.id,
      couponCode: voucherCode,
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    });

    // Generate QR code
    const qrCodeData = JSON.stringify({
      code: voucherCode,
      type: "referral-reward",
      value: 100,
      currency: "D",
    });
    
    const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

    res.json({
      success: true,
      referral,
      reward: {
        code: voucherCode,
        qrCodeUrl,
        expiresAt: issuedCoupon.expiresAt,
        value: 100,
      },
    });
  } catch (error: any) {
    console.error("Error tracking referral:", error);
    res.status(500).json({ error: error.message || "Failed to track referral" });
  }
});

export default router;
