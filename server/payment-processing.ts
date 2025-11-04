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

    // Step 4: Grant FREE AquaCafe Loyalty Membership for all package orders
    const isWaterPackage = data.productId.includes('aquacafe') || 
                          data.productId.includes('kangen') || 
                          data.productId.includes('ispring') || 
                          data.productId.includes('express-water');
    
    if (isWaterPackage) {
      console.log(`Granting FREE AquaCafe Loyalty membership to customer ${customer.email} for ${data.productName}`);
    }

    // Step 5: Generate digital vouchers for qualifying products
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to process purchase: ${errorMessage}`);
  }
}

/**
 * Create D99 Loyalty Membership with referral benefits
 * When a customer refers a friend, they get upgraded to D99 tier with vouchers
 */
export async function createD99LoyaltyMembership(customerId: string, refereeEmail: string): Promise<any> {
  try {
    const customer = await storage.getCustomer(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    // Get or create loyalty membership
    let loyaltyMembership = await storage.getLoyaltyMembershipByCustomer(customerId);
    
    if (!loyaltyMembership) {
      // Create new D99 membership
      const membershipNumber = `D99${Date.now()}${Math.floor(Math.random() * 1000)}`;
      const membershipData: InsertLoyaltyMembership = {
        customerId,
        membershipNumber,
        tier: 'gold', // D99 members get gold tier
        points: 990, // D99 in points
        lifetimePoints: 990,
        status: 'active',
        totalOrders: 0,
        totalSpentAED: 9900, // D99 membership value
        welcomeGiftRedeemed: false,
        welcomeGiftType: 'd99-referral-vouchers',
        enrolledAt: new Date(),
        lastActivityAt: new Date(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      };
      loyaltyMembership = await storage.createLoyaltyMembership(membershipData);
    } else {
      // Upgrade existing membership to D99 tier
      await storage.updateLoyaltyMembership(loyaltyMembership.id, {
        tier: 'gold',
        points: loyaltyMembership.points + 990,
        lifetimePoints: loyaltyMembership.lifetimePoints + 990,
        welcomeGiftType: 'd99-referral-vouchers',
      });
    }

    // Generate D99 Chill & Grill vouchers
    const vouchers = [];
    
    // Voucher 1: D99 Chill & Grill Restaurant voucher
    const voucherCode1 = `D99CHILL${randomUUID().substring(0, 6).toUpperCase()}`;
    const voucher1Data: InsertDigitalVoucher = {
      voucherCode: voucherCode1,
      customerId,
      orderId: null,
      voucherType: 'd99-chill-grill',
      title: 'Chill & Grill - D99 Restaurant Voucher',
      description: 'D99 credit for dining at Chill & Grill - Thank you for referring a friend!',
      valueAED: 9900, // D99 in fils
      status: 'active',
      redeemedAt: null,
      redeemedLocation: null,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days
      terms: 'Valid at all Chill & Grill locations. One voucher per visit. Cannot be combined with other offers.',
      redemptionInstructions: 'Show this code to your server at Chill & Grill. Voucher activated after your friend completes their first order.',
    };
    const voucher1 = await storage.createDigitalVoucher(voucher1Data);
    vouchers.push(voucher1);

    // Voucher 2: Partner voucher (can be rotated among partners)
    const voucherCode2 = `D99PART${randomUUID().substring(0, 6).toUpperCase()}`;
    const voucher2Data: InsertDigitalVoucher = {
      voucherCode: voucherCode2,
      customerId,
      orderId: null,
      voucherType: 'd99-partner',
      title: 'Partner Network - D99 Voucher',
      description: 'D99 credit for partner services - Valid at select DeliWer partners',
      valueAED: 9900, // D99 in fils
      status: 'active',
      redeemedAt: null,
      redeemedLocation: null,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days
      terms: 'Valid at participating DeliWer partner locations. Check partner list for details.',
      redemptionInstructions: 'Present this code at any participating partner location.',
    };
    const voucher2 = await storage.createDigitalVoucher(voucher2Data);
    vouchers.push(voucher2);

    console.log(`D99 Loyalty Membership created for ${customer.email} (referred ${refereeEmail})`);

    return {
      success: true,
      loyaltyMembership,
      vouchers,
      message: 'Congratulations! Your D99 Loyalty Membership is active with exclusive vouchers!',
    };

  } catch (error) {
    console.error('D99 membership creation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to create D99 membership: ${errorMessage}`);
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
