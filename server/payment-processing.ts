// Payment Processing Module - Handles complete purchase flow
// Auto-creates customers, enrolls in loyalty, generates vouchers

import { storage } from "./storage";
import { randomUUID } from "crypto";
import type { InsertOrder, InsertCustomer, InsertLoyaltyMembership, InsertDigitalVoucher } from "@shared/schema";

export interface PurchaseData {
  customerEmail: string;
  customerName?: string;
  customerPhone?: string;
  productId: string;
  productName: string;
  amount: number; // in AED (not fils)
  currency: string;
  paymentMethod: 'paypal' | 'stripe';
  paymentIntentId: string;
}

export interface PurchaseResult {
  success: boolean;
  order: any;
  customer: any;
  loyaltyMembership: any;
  vouchers: any[];
  message: string;
}

/**
 * Complete purchase processing flow:
 * 1. Create or get existing customer
 * 2. Create order
 * 3. Auto-enroll in loyalty membership (if first purchase)
 * 4. Generate digital vouchers for qualifying products
 */
export async function processPurchase(data: PurchaseData): Promise<PurchaseResult> {
  try {
    // Step 1: Get or create customer
    let customer = await storage.getCustomerByEmail(data.customerEmail);
    
    if (!customer) {
      const customerData: InsertCustomer = {
        email: data.customerEmail,
        firstName: data.customerName?.split(' ')[0] || null,
        lastName: data.customerName?.split(' ').slice(1).join(' ') || null,
        phone: data.customerPhone || null,
        shopifyCustomerId: null,
        stripeCustomerId: data.paymentMethod === 'stripe' ? data.paymentIntentId : null,
        defaultAddress: null,
        metadata: {},
      };
      customer = await storage.createCustomer(customerData);
    }

    // Step 2: Create order
    const orderData: InsertOrder = {
      paymentIntentId: data.paymentIntentId,
      customerId: customer.id,
      customerEmail: data.customerEmail,
      amount: Math.round(data.amount * 100), // Convert to fils
      currency: data.currency.toLowerCase(),
      status: 'completed',
      items: [
        {
          productId: data.productId,
          productName: data.productName,
          quantity: 1,
          price: data.amount,
        }
      ],
      billingDetails: {
        email: data.customerEmail,
        name: data.customerName || '',
      },
      shippingDetails: {
        email: data.customerEmail,
        name: data.customerName || '',
      },
      metadata: {
        paymentMethod: data.paymentMethod,
        processedAt: new Date().toISOString(),
      },
    };
    const order = await storage.createOrder(orderData);

    // Step 3: Auto-enroll in loyalty membership (if new customer or no membership)
    let loyaltyMembership = await storage.getLoyaltyMembershipByCustomer(customer.id);
    
    if (!loyaltyMembership) {
      const membershipNumber = `ACL${Date.now()}${Math.floor(Math.random() * 1000)}`;
      const membershipData: InsertLoyaltyMembership = {
        customerId: customer.id,
        membershipNumber,
        tier: 'bronze',
        points: 0,
        lifetimePoints: 0,
        status: 'active',
        totalOrders: 1,
        totalSpentAED: Math.round(data.amount * 100),
        welcomeGiftRedeemed: false,
        welcomeGiftType: null,
        enrolledAt: new Date(),
        lastActivityAt: new Date(),
        expiresAt: null,
      };
      loyaltyMembership = await storage.createLoyaltyMembership(membershipData);
    } else {
      // Update existing membership
      await storage.updateLoyaltyMembership(loyaltyMembership.id, {
        totalOrders: loyaltyMembership.totalOrders + 1,
        totalSpentAED: loyaltyMembership.totalSpentAED + Math.round(data.amount * 100),
      });
    }

    // Award loyalty points (1 point per AED spent)
    const pointsEarned = Math.floor(data.amount);
    await storage.addLoyaltyPoints(customer.id, pointsEarned);

    // Step 4: Generate digital vouchers for qualifying products
    const vouchers = [];
    
    // AED 99 Starter Kit = Free Chill & Grill D100 voucher
    if (data.productId === 'aquacafe-starter-kit' && data.amount === 99) {
      const voucherCode = `CHILL${randomUUID().substring(0, 8).toUpperCase()}`;
      const voucherData: InsertDigitalVoucher = {
        voucherCode,
        customerId: customer.id,
        orderId: order.id,
        voucherType: 'chill-grill-d100',
        title: 'Chill & Grill - D100 Voucher',
        description: 'Complimentary D100 voucher for Pizza for Two + Kulfi at Chill & Grill',
        valueAED: 10000, // D100 in fils
        status: 'active',
        redeemedAt: null,
        redeemedLocation: null,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
        terms: 'Valid at Chill & Grill locations. Cannot be combined with other offers.',
        redemptionInstructions: 'Show this code to the server at Chill & Grill to redeem your Pizza for Two + Kulfi.',
      };
      const voucher = await storage.createDigitalVoucher(voucherData);
      vouchers.push(voucher);
    }

    // Kangen K8 Machine = Premium loyalty benefits
    if (data.productId === 'kangen-k8-machine') {
      // Award bonus points for premium purchase
      await storage.addLoyaltyPoints(customer.id, 500); // Bonus 500 points
    }

    return {
      success: true,
      order,
      customer,
      loyaltyMembership,
      vouchers,
      message: `Purchase successful! ${vouchers.length > 0 ? 'Digital vouchers have been sent to your email.' : 'Thank you for your purchase!'}`,
    };

  } catch (error) {
    console.error('Purchase processing error:', error);
    throw new Error(`Failed to process purchase: ${error.message}`);
  }
}

/**
 * Convert AED to fils (cents)
 */
export function aedToFils(aed: number): number {
  return Math.round(aed * 100);
}

/**
 * Convert fils to AED
 */
export function filsToAed(fils: number): number {
  return fils / 100;
}
