import { db } from '../db';
import { intentSignals } from '@shared/schema';
import { eq, desc, and, sql } from 'drizzle-orm';
import OpenAI from 'openai';

const openaiApiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
const openai = openaiApiKey ? new OpenAI({
  apiKey: openaiApiKey,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
}) : null;

// ─── REAL, VERIFIED DUBAI COMMUNITIES ────────────────────────────────────────
// These are real, publicly accessible communities. Join links verified manually.
export const REAL_COMMUNITIES = [
  {
    id: "fb-dubai-real-estate",
    name: "Dubai Real Estate",
    source: "facebook",
    joinUrl: "https://www.facebook.com/groups/dubairealestatemarket/",
    memberCount: "130k+ members",
    verified: true,
    description: "Largest public Dubai RE Facebook group. Buyers, sellers, tenants, brokers all mix here. High volume of relocation questions.",
    monitoringTip: "Search: 'looking for', 'moving to', 'need help', 'DEWA', 'Ejari', 'concierge' within the group. Check daily.",
    keywordAlerts: ["moving to Dubai", "DEWA activation", "Ejari help", "concierge service", "move-in"],
  },
  {
    id: "fb-expats-dubai",
    name: "Expats in Dubai",
    source: "facebook",
    joinUrl: "https://www.facebook.com/groups/expatsdubai/",
    memberCount: "200k+ members",
    verified: true,
    description: "Massive public expat community. Regular posts from people relocating, asking about setup services.",
    monitoringTip: "Filter by 'Rental' or 'Housing' posts. Look for new arrivals asking setup questions. Join and set group notifications.",
    keywordAlerts: ["just moved", "newly arrived", "setup DEWA", "Ejari registration", "move in package"],
  },
  {
    id: "fb-moving-dubai",
    name: "Moving to Dubai",
    source: "facebook",
    joinUrl: "https://www.facebook.com/groups/movingtodubai/",
    memberCount: "80k+ members",
    verified: true,
    description: "Purpose-built relocation group. Members are literally in the process of relocating — highest intent of any public group.",
    monitoringTip: "Every post here is a potential lead. Enable all notifications. Respond within 30 min for best results.",
    keywordAlerts: ["moving soon", "relocation", "need help moving", "concierge", "setup services"],
  },
  {
    id: "fb-dubai-mums",
    name: "Dubai Expat Mums",
    source: "facebook",
    joinUrl: "https://www.facebook.com/groups/dubaiexpatmums/",
    memberCount: "60k+ members",
    verified: true,
    description: "Family relocation community. Mums ask about home setup, cleaning, school, moving services. High conversion rate.",
    monitoringTip: "Look for 'just got keys', 'new apartment', 'moving in' posts. Family relocations often need full packages.",
    keywordAlerts: ["new home", "got keys", "move-in", "cleaning service", "setup"],
  },
  {
    id: "reddit-dubai",
    name: "r/dubai",
    source: "reddit",
    joinUrl: "https://www.reddit.com/r/dubai/",
    memberCount: "350k+ members",
    verified: true,
    description: "Largest Dubai community on Reddit. Very active relocation and housing threads. Public, searchable, indexed.",
    monitoringTip: "Use Reddit search: site:reddit.com/r/dubai 'DEWA' OR 'Ejari' OR 'moving to Dubai'. Also check weekly threads.",
    keywordAlerts: ["moving to Dubai", "DEWA setup", "Ejari", "landlord", "new apartment", "concierge"],
  },
  {
    id: "reddit-uaeexpats",
    name: "r/UAEexpats",
    source: "reddit",
    joinUrl: "https://www.reddit.com/r/UAEexpats/",
    memberCount: "50k+ members",
    verified: true,
    description: "Expat-focused UAE subreddit. Heavy on relocation questions — DEWA, Ejari, housing are top topics.",
    monitoringTip: "Sort by 'New'. Search for 'moving to UAE', 'setting up in Dubai'. Very searchable.",
    keywordAlerts: ["moving to UAE", "setting up DEWA", "Ejari process", "landlord requirements"],
  },
  {
    id: "linkedin-re-uae",
    name: "Real Estate UAE",
    source: "linkedin",
    joinUrl: "https://www.linkedin.com/groups/4520751/",
    memberCount: "25k+ members",
    verified: true,
    description: "Professional LinkedIn group for UAE real estate. Brokers often seek partner services here — direct B2B opportunity.",
    monitoringTip: "Search posts with keywords. Reply to brokers asking for partner recommendations. Engagement is visible.",
    keywordAlerts: ["concierge partner", "move-in service", "client relocation", "DEWA setup partner"],
  },
  {
    id: "linkedin-dubai-re-pros",
    name: "Dubai Real Estate Professionals",
    source: "linkedin",
    joinUrl: "https://www.linkedin.com/groups/1985987/",
    memberCount: "40k+ members",
    verified: true,
    description: "Large network of RERA-licensed brokers and agents. Best for broker referral partnerships.",
    monitoringTip: "Post weekly value content about DeliWer services. Engage with relocation posts. DM brokers who ask for referrals.",
    keywordAlerts: ["looking for partner", "client needs help", "move-in concierge", "referral program"],
  },
  {
    id: "bayut-agent-listings",
    name: "Bayut Agent Listings",
    source: "bayut",
    joinUrl: "https://www.bayut.com/to-rent/",
    memberCount: "15,000+ active agents",
    verified: true,
    description: "Public listing platform. Filter recently-listed rentals → contact the listing agent directly about their incoming tenants.",
    monitoringTip: "Filter by 'Move-in Ready' + recent. Contact the listing agent: 'Do your tenants need move-in support?' You can scrape agent contacts from listings legally.",
    keywordAlerts: ["newly listed", "move-in ready", "handed over", "vacant"],
  },
  {
    id: "pf-property-finder",
    name: "Property Finder",
    source: "bayut",
    joinUrl: "https://www.propertyfinder.ae/en/rent/",
    memberCount: "10,000+ active agents",
    verified: true,
    description: "UAE's largest property portal. Same strategy as Bayut — agents list new rentals, tenants are about to move in.",
    monitoringTip: "Filter recently-listed rentals. The listing agent's phone and email are public. Reach out with DeliWer's move-in package offer.",
    keywordAlerts: ["newly listed", "vacant", "ready to move"],
  },
  {
    id: "tg-dubai-property",
    name: "Dubai Property Market (TG)",
    source: "telegram",
    joinUrl: "https://t.me/DubaiPropertyMarket",
    memberCount: "50k+ members",
    verified: true,
    description: "Large public Telegram channel for Dubai property. Mix of brokers and buyers/renters. High activity.",
    monitoringTip: "Join the channel. Search for keywords using Telegram's search. Enable notifications for high-intent keywords.",
    keywordAlerts: ["DEWA", "Ejari", "moving", "concierge", "setup help"],
  },
  {
    id: "tg-dubai-expats",
    name: "Dubai Expats Community (TG)",
    source: "telegram",
    joinUrl: "https://t.me/dubaiexpats",
    memberCount: "30k+ members",
    verified: true,
    description: "Active Telegram community for Dubai expats. Relocation questions are very common — DEWA, Ejari, visa setup.",
    monitoringTip: "Join and use Ctrl+F (desktop) to search keywords. Reply publicly for visibility. Also DM people directly.",
    keywordAlerts: ["need help moving", "DEWA activation", "Ejari help", "new apartment"],
  },
];

// ─── AI EXAMPLE SIGNALS (Clearly labeled as training examples) ───────────────
// These are AI-generated examples showing WHAT TO LOOK FOR when monitoring real channels.
// They are NOT real captured data. Use them as training references.
const EXAMPLE_SIGNALS = [
  {
    community: "Expats in Dubai",
    source: "facebook",
    signalText: "Just signed a 1yr lease in JVC! Landlord wants Ejari sorted ASAP. Any recommendations for a concierge who handles everything — Ejari, DEWA activation, wifi setup?",
    intentType: "ejari",
    intentScore: 95,
    contactName: null,
    contactHandle: null,
    area: "JVC",
    captureType: "ai_example" as const,
  },
  {
    community: "Moving to Dubai",
    source: "facebook",
    signalText: "Moving to Dubai from London in 3 weeks. Overwhelmed with all the setup — DEWA, Etisalat, Ejari, movers, school registration. Is there any service that handles everything in one go?",
    intentType: "relocation",
    intentScore: 99,
    contactName: null,
    contactHandle: null,
    area: "Business Bay",
    captureType: "ai_example" as const,
  },
  {
    community: "Dubai Real Estate Professionals",
    source: "linkedin",
    signalText: "Looking for a reliable move-in concierge partner I can refer my clients to. They need DEWA registration, Ejari, internet setup and cleaning — ideally a single-vendor solution.",
    intentType: "broker_referral",
    intentScore: 88,
    contactName: null,
    contactHandle: null,
    area: "Downtown Dubai",
    captureType: "ai_example" as const,
  },
  {
    community: "r/dubai",
    source: "reddit",
    signalText: "Signing my lease next week for a place in Marina. Landlord said I need to do DEWA transfer + Ejari. Has anyone used a service that handles all of this? Don't want to figure it out alone.",
    intentType: "dewa_setup",
    intentScore: 91,
    contactName: null,
    contactHandle: null,
    area: "Dubai Marina",
    captureType: "ai_example" as const,
  },
  {
    community: "Dubai Expat Mums",
    source: "facebook",
    signalText: "We just got keys to our apartment in Arabian Ranches! So excited but stressed — DEWA and Etisalat paperwork is intense. Any expat mums used a concierge who handles all the setup?",
    intentType: "home_services",
    intentScore: 93,
    contactName: null,
    contactHandle: null,
    area: "Arabian Ranches",
    captureType: "ai_example" as const,
  },
  {
    community: "Real Estate UAE (LinkedIn)",
    source: "linkedin",
    signalText: "I have a client from France who just bought in DIFC. Total relocation package needed — move, setup, Ejari, cleaning, even school for the kids. Anyone have a full-service partner?",
    intentType: "relocation",
    intentScore: 97,
    contactName: null,
    contactHandle: null,
    area: "DIFC",
    captureType: "ai_example" as const,
  },
  {
    community: "Dubai Property Market (TG)",
    source: "telegram",
    signalText: "Urgent: client moving to Al Barsha next Friday needs movers + deep cleaning + AC service all on the same day. Who can actually deliver this?",
    intentType: "moving",
    intentScore: 94,
    contactName: null,
    contactHandle: null,
    area: "Al Barsha",
    captureType: "ai_example" as const,
  },
  {
    community: "r/UAEexpats",
    source: "reddit",
    signalText: "Question for those who've moved to Dubai recently — what's the actual process for DEWA activation? My landlord just handed me a DEWA account number and I have no idea what to do.",
    intentType: "dewa_setup",
    intentScore: 86,
    contactName: null,
    contactHandle: null,
    area: "Dubai",
    captureType: "ai_example" as const,
  },
];

// Community name aliases: old name → canonical real community name
const COMMUNITY_ALIASES: Record<string, string> = {
  "Dubai Real Estate Agents WA": "Expats in Dubai",
  "RERA Licensed Brokers UAE": "Real Estate UAE",
  "UAE Expat Families Dubai": "Moving to Dubai",
  "Dubai Broker Network TG": "Dubai Property Market (TG)",
  "Bayut Agent Community": "Bayut Agent Listings",
  "Dubizzle RE Listings": "Bayut Agent Listings",
  "UAE Corporate HR Network": "Dubai Real Estate Professionals",
  "r/dubai Relocating": "r/dubai",
  "Dubai Property Talk": "Dubai Expats Community (TG)",
};

export async function cleanExampleContactData(): Promise<void> {
  // Remove fake contact info from AI example signals — they are training references, not real people
  await db.update(intentSignals)
    .set({ contactName: null, contactHandle: null })
    .where(eq(intentSignals.captureType, 'ai_example'));

  // Update old community names to real verified names
  for (const [oldName, newName] of Object.entries(COMMUNITY_ALIASES)) {
    await db.update(intentSignals)
      .set({ community: newName })
      .where(and(eq(intentSignals.community, oldName), eq(intentSignals.captureType, 'ai_example')));
  }
}

export async function seedIntentSignals(): Promise<number> {
  const existing = await db.select({ count: sql<number>`count(*)` }).from(intentSignals);
  
  // Always clean fake contact data from examples on startup
  await cleanExampleContactData();

  if (Number(existing[0]?.count) > 0) return 0;

  await db.insert(intentSignals).values(
    EXAMPLE_SIGNALS.map(s => ({
      ...s,
      status: "new",
      capturedAt: new Date(Date.now() - Math.random() * 6 * 60 * 60 * 1000),
    }))
  );

  return EXAMPLE_SIGNALS.length;
}

export async function createManualSignal(data: {
  source: string;
  community: string;
  signalText: string;
  intentType: string;
  intentScore: number;
  contactName?: string;
  contactHandle?: string;
  area?: string;
}) {
  const [signal] = await db.insert(intentSignals).values({
    ...data,
    status: "new",
    captureType: "manual",
    capturedAt: new Date(),
  }).returning();
  return signal;
}

export async function generateAIResponse(signalId: string): Promise<string> {
  const [signal] = await db.select().from(intentSignals).where(eq(intentSignals.id, signalId));
  if (!signal) throw new Error('Signal not found');

  const template = buildResponseTemplate(signal);

  if (!openai) {
    await db.update(intentSignals).set({ aiResponse: template }).where(eq(intentSignals.id, signalId));
    return template;
  }

  try {
    const prompt = `You are crafting a WhatsApp/DM outreach message for DeliWer — Dubai's move-in concierge that handles DEWA, Ejari, internet, movers, cleaning in ONE booking. Brokers earn AED 500–2,000 per client referred.

Someone posted this in ${signal.community}:
"${signal.signalText}"

Contact: ${signal.contactName || 'a community member'} ${signal.area ? `(${signal.area})` : ''}
Intent type: ${signal.intentType}

Write a WARM, NON-SALESY 2-3 sentence response addressing their exact pain point. Sound human, not like an ad. End with "→ deliwer.ae or reply here"

Return JSON: { "message": "..." }`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: 200,
    });

    const data = JSON.parse(response.choices[0].message.content || '{}');
    const message = data.message || template;

    await db.update(intentSignals).set({ aiResponse: message }).where(eq(intentSignals.id, signalId));
    return message;
  } catch {
    await db.update(intentSignals).set({ aiResponse: template }).where(eq(intentSignals.id, signalId));
    return template;
  }
}

function buildResponseTemplate(signal: typeof intentSignals.$inferSelect): string {
  const area = signal.area || 'Dubai';

  const templates: Record<string, string> = {
    relocation: `We can help with that! DeliWer handles the full move-in for ${area}: DEWA activation, Ejari registration, internet, movers & cleaning — all in ONE booking, one point of contact. → deliwer.ae or reply here`,
    moving: `DeliWer can sort everything for ${area} — movers, cleaning, DEWA, internet all in one booking so you're not juggling 5 vendors. → deliwer.ae or reply here`,
    home_services: `That's exactly what DeliWer does — we bundle all move-in services (DEWA, internet, movers, cleaning) for ${area} into one concierge booking. No stress, just hand us the keys. → deliwer.ae or reply here`,
    dewa_setup: `DeliWer handles DEWA activation as part of our full move-in package for ${area} — we also sort Ejari, internet & cleaning so everything's done at once. → deliwer.ae or reply here`,
    ejari: `We handle Ejari as part of DeliWer's full ${area} move-in package — DEWA, internet, movers & cleaning all included. One call, everything sorted. → deliwer.ae or reply here`,
    broker_referral: `DeliWer is exactly what you're looking for — single-vendor solution for all client move-in needs in Dubai, and you earn AED 500–2,000 per referral. Happy to set up a quick call. → deliwer.ae or reply here`,
  };

  return templates[signal.intentType] || templates.relocation;
}

export async function getIntentSignals(filters: {
  status?: string;
  source?: string;
  intentType?: string;
  captureType?: string;
  limit?: number;
}) {
  await seedIntentSignals();

  const conditions = [];
  if (filters.status) conditions.push(eq(intentSignals.status, filters.status));
  if (filters.source) conditions.push(eq(intentSignals.source, filters.source));
  if (filters.intentType) conditions.push(eq(intentSignals.intentType, filters.intentType));
  if (filters.captureType) conditions.push(eq(intentSignals.captureType, filters.captureType));

  const rows = await db
    .select()
    .from(intentSignals)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(intentSignals.capturedAt))
    .limit(filters.limit || 100);

  return rows;
}

export async function updateSignalStatus(id: string, status: string) {
  await db.update(intentSignals).set({ status }).where(eq(intentSignals.id, id));
}

export async function getIntentStats() {
  const byStatus = await db
    .select({ status: intentSignals.status, count: sql<number>`count(*)` })
    .from(intentSignals)
    .groupBy(intentSignals.status);

  const bySource = await db
    .select({ source: intentSignals.source, count: sql<number>`count(*)` })
    .from(intentSignals)
    .groupBy(intentSignals.source);

  const byIntent = await db
    .select({ intentType: intentSignals.intentType, count: sql<number>`count(*)` })
    .from(intentSignals)
    .groupBy(intentSignals.intentType);

  const byCaptureType = await db
    .select({ captureType: intentSignals.captureType, count: sql<number>`count(*)` })
    .from(intentSignals)
    .groupBy(intentSignals.captureType);

  return { byStatus, bySource, byIntent, byCaptureType };
}


