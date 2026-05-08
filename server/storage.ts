import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { brokers, type Broker, type InsertBroker, users, heroes, tradeIns, impactStats, referrals, contacts, conciergeConversations, founderStreaks } from "@shared/schema";
import { type User, type InsertUser, type ConciergeConversation, type InsertConciergeConversation, type FounderStreak, type InsertFounderStreak } from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getConciergeConversation(phoneNumber: string): Promise<ConciergeConversation | undefined>;
  createConciergeConversation(conv: InsertConciergeConversation): Promise<ConciergeConversation>;
  updateConciergeConversation(id: string, updates: Partial<ConciergeConversation>): Promise<ConciergeConversation>;
  getFounderStreaks(): Promise<FounderStreak[]>;
  updateFounderStreak(name: string, streak: number, lastPosted: string): Promise<FounderStreak>;
  initializeFounders(founders: { name: string; phone: string }[]): Promise<void>;
  getBrokers(): Promise<Broker[]>;
  addBroker(broker: InsertBroker): Promise<Broker>;
  createLeadApplication(lead: any): Promise<any>;
  getLeadApplications(): Promise<any[]>;
  updateLeadRequirements(id: string, requirements: string, whatsappResponses: any[]): Promise<any>;
  logBrokerFunnelEvent(event: { event: string; page?: string; stage?: string; utmSource?: string; sessionId?: string }): Promise<void>;
  getBrokerFunnelReport(): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private conciergeConversations: Map<string, ConciergeConversation>;
  private leadApplications: Map<string, any>;
  private founderStreaks: Map<string, FounderStreak>;
  private brokers: Map<string, Broker>;
  private brokerFunnelEventsList: Array<{ id: string; event: string; page?: string; stage?: string; utmSource?: string; sessionId?: string; createdAt: Date }>;
  sessionStore: any;

  constructor() {
    this.users = new Map();
    this.conciergeConversations = new Map();
    this.leadApplications = new Map();
    this.founderStreaks = new Map();
    this.brokers = new Map();
    this.brokerFunnelEventsList = [];
  }

  async getBrokers(): Promise<Broker[]> {
    return Array.from(this.brokers.values()).sort((a, b) => b.tier - a.tier);
  }

  async addBroker(insertBroker: InsertBroker): Promise<Broker> {
    const id = Math.random().toString(36).substring(7);
    const broker: Broker = { 
      ...insertBroker, 
      id, 
      createdAt: new Date(),
      isVerified: insertBroker.isVerified ?? false,
      tier: insertBroker.tier ?? 3,
      agency: insertBroker.agency ?? null,
      area: insertBroker.area ?? null,
      category: insertBroker.category ?? "brokerage",
      contactInfo: insertBroker.contactInfo ?? {},
      notes: insertBroker.notes ?? null
    };
    this.brokers.set(id, broker);
    return broker;
  }

  async getFounderStreaks(): Promise<FounderStreak[]> {
    return Array.from(this.founderStreaks.values());
  }

  async updateFounderStreak(name: string, streak: number, lastPosted: string): Promise<FounderStreak> {
    const existing = Array.from(this.founderStreaks.values()).find(s => s.name === name);
    if (!existing) throw new Error(`Founder ${name} not found`);
    const updated = { ...existing, streak, lastPosted, updatedAt: new Date() };
    this.founderStreaks.set(existing.id, updated);
    return updated;
  }

  async initializeFounders(founders: { name: string; phone: string }[]): Promise<void> {
    for (const f of founders) {
      const existing = Array.from(this.founderStreaks.values()).find(s => s.name === f.name);
      if (!existing) {
        const id = Math.random().toString(36).substring(7);
        this.founderStreaks.set(id, {
          id,
          name: f.name,
          phone: f.phone,
          streak: 0,
          lastPosted: null,
          updatedAt: new Date()
        });
      }
    }
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

  async createLeadApplication(lead: any): Promise<any> {
    const id = Math.random().toString(36).substring(7);
    const newLead = { ...lead, id, createdAt: new Date() };
    this.leadApplications.set(id, newLead);
    return newLead;
  }

  async getLeadApplications(): Promise<any[]> {
    return Array.from(this.leadApplications.values());
  }

  async updateLeadRequirements(id: string, requirements: string, whatsappResponses: any[]): Promise<any> {
    const lead = this.leadApplications.get(id);
    if (!lead) return undefined;
    const updated = { ...lead, requirements, whatsappResponses };
    this.leadApplications.set(id, updated);
    return updated;
  }

  async logBrokerFunnelEvent(evt: { event: string; page?: string; stage?: string; utmSource?: string; sessionId?: string }): Promise<void> {
    const id = `fe_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    this.brokerFunnelEventsList.push({ ...evt, id, createdAt: new Date() });
    if (this.brokerFunnelEventsList.length > 2000) this.brokerFunnelEventsList.shift();
  }

  async getBrokerFunnelReport(): Promise<any> {
    const events = this.brokerFunnelEventsList;
    const byEvent: Record<string, number> = {};
    const byStage: Record<string, number> = {};
    const uniqueSessions = new Set<string>();

    for (const e of events) {
      byEvent[e.event] = (byEvent[e.event] || 0) + 1;
      if (e.sessionId) uniqueSessions.add(e.sessionId);
      if (e.event === "stage_selected" && e.stage) {
        byStage[e.stage] = (byStage[e.stage] || 0) + 1;
      }
    }

    const FUNNEL_STEPS = [
      "trust_strip_click",
      "partners_broker_auto_scroll",
      "partners_broker_cta",
      "academy_join_cta",
      "brokers_page_view",
      "stage_selected",
      "stage_whatsapp",
      "funnel_submitted",
      "funnel_goto_brokers",
      "urgency_get_slot",
    ];

    const funnel = FUNNEL_STEPS.map(step => ({ step, count: byEvent[step] || 0 }));

    return {
      total: events.length,
      uniqueSessions: uniqueSessions.size,
      byEvent,
      byStage,
      funnel,
      recentEvents: [...events].reverse().slice(0, 30),
    };
  }
}

export const storage = new MemStorage();