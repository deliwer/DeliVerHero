import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { users, heroes, tradeIns, impactStats, referrals, contacts, ejariConversations, conciergeConversations } from "@shared/schema";
import { type User, type InsertUser, type ConciergeConversation, type InsertConciergeConversation, type EjariConversation, type InsertEjariConversation, type LeadApplication, type InsertLeadApplication } from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getConciergeConversation(phoneNumber: string): Promise<ConciergeConversation | undefined>;
  createConciergeConversation(conv: InsertConciergeConversation): Promise<ConciergeConversation>;
  updateConciergeConversation(id: string, updates: Partial<ConciergeConversation>): Promise<ConciergeConversation>;

  getEjariConversation(phone: string): Promise<EjariConversation | undefined>;
  createEjariConversation(conv: InsertEjariConversation): Promise<EjariConversation>;
  updateEjariConversation(id: string, updates: Partial<EjariConversation>): Promise<EjariConversation | undefined>;

  createLeadApplication(lead: InsertLeadApplication): Promise<LeadApplication>;
  getLeadApplications(): Promise<LeadApplication[]>;
  updateLeadRequirements(id: string, requirements: string, whatsappResponses: any[]): Promise<LeadApplication | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private conciergeConversations: Map<string, ConciergeConversation>;
  private ejariConversations: Map<string, EjariConversation>;
  private leadApplications: Map<string, LeadApplication>;
  sessionStore: any;

  constructor() {
    this.users = new Map();
    this.conciergeConversations = new Map();
    this.ejariConversations = new Map();
    this.leadApplications = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = Math.random().toString(36).substring(7);
    const user: User = { ...insertUser, id, createdAt: new Date(), updatedAt: new Date(), email: insertUser.email || null, firstName: insertUser.firstName || null, lastName: insertUser.lastName || null, phone: insertUser.phone || null, address: insertUser.address || null, city: insertUser.city || "Dubai", userType: insertUser.userType || "consumer", companyName: insertUser.companyName || null, businessLicense: insertUser.businessLicense || null, tradeLicense: insertUser.tradeLicense || null, isB2BVerified: insertUser.isB2BVerified || false, b2bVerifiedAt: insertUser.b2bVerifiedAt || null, membershipTierId: insertUser.membershipTierId || null, stripeCustomerId: insertUser.stripeCustomerId || null };
    this.users.set(id, user);
    return user;
  }

  async getConciergeConversation(phoneNumber: string): Promise<ConciergeConversation | undefined> {
    return Array.from(this.conciergeConversations.values()).find(c => c.phoneNumber === phoneNumber);
  }

  async createConciergeConversation(conv: InsertConciergeConversation): Promise<ConciergeConversation> {
    const id = Math.random().toString(36).substring(7);
    const newConv: ConciergeConversation = { ...conv, id, moveInTiming: conv.moveInTiming || null, area: conv.area || null, propertyType: conv.propertyType || null, waterCheck: conv.waterCheck || null, cleaningCheck: conv.cleaningCheck || null, fixesCheck: conv.fixesCheck || null, lastMessageAt: new Date(), createdAt: new Date() };
    this.conciergeConversations.set(id, newConv);
    return newConv;
  }

  async updateConciergeConversation(id: string, updates: Partial<ConciergeConversation>): Promise<ConciergeConversation> {
    const conv = this.conciergeConversations.get(id);
    if (!conv) throw new Error("Not found");
    const updated = { ...conv, ...updates, lastMessageAt: new Date() };
    this.conciergeConversations.set(id, updated);
    return updated;
  }

  async getEjariConversation(phone: string): Promise<EjariConversation | undefined> {
    return Array.from(this.ejariConversations.values()).find(c => c.phone === phone);
  }

  async createEjariConversation(conv: InsertEjariConversation): Promise<EjariConversation> {
    const id = Math.random().toString(36).substring(7);
    const newConv: EjariConversation = { ...conv, id, platform: conv.platform || "whatsapp", moveInTiming: conv.moveInTiming || null, area: conv.area || null, propertyType: conv.propertyType || null, waterChecked: conv.waterChecked || null, cleaningNeeded: conv.cleaningNeeded || null, fixesNeeded: conv.fixesNeeded || null, status: conv.status || "QUALIFYING", lastMessageSentAt: new Date(), reminderSent: false, createdAt: new Date(), updatedAt: new Date() };
    this.ejariConversations.set(id, newConv);
    return newConv;
  }

  async updateEjariConversation(id: string, updates: Partial<EjariConversation>): Promise<EjariConversation | undefined> {
    const conv = this.ejariConversations.get(id);
    if (!conv) return undefined;
    const updated = { ...conv, ...updates, updatedAt: new Date() };
    this.ejariConversations.set(id, updated);
    return updated;
  }

  async createLeadApplication(lead: InsertLeadApplication): Promise<LeadApplication> {
    const id = Math.random().toString(36).substring(7);
    const newLead: LeadApplication = { ...lead, id, status: lead.status || "pending", createdAt: new Date() };
    this.leadApplications.set(id, newLead);
    return newLead;
  }

  async getLeadApplications(): Promise<LeadApplication[]> {
    return Array.from(this.leadApplications.values());
  }

  async updateLeadRequirements(id: string, requirements: string, whatsappResponses: any[]): Promise<LeadApplication | undefined> {
    const lead = this.leadApplications.get(id);
    if (!lead) return undefined;
    const updated = { ...lead, requirements, whatsappResponses };
    this.leadApplications.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();