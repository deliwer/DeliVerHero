import { db } from '../db';
import { intentSignals } from '@shared/schema';
import { eq, desc, and, or, sql } from 'drizzle-orm';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI() : null;

const DUBAI_AREAS = [
  "Dubai Marina", "JVC", "Business Bay", "Downtown Dubai", "JBR",
  "Palm Jumeirah", "DIFC", "Jumeirah", "Al Barsha", "Mirdif",
  "Sports City", "Discovery Gardens", "Motor City", "Arabian Ranches",
  "Silicon Oasis", "International City", "Deira", "Bur Dubai",
];

const COMMUNITIES = [
  { name: "Dubai Real Estate Agents WA", source: "whatsapp_group" },
  { name: "RERA Licensed Brokers UAE", source: "whatsapp_group" },
  { name: "Dubai Housing & Rentals", source: "facebook" },
  { name: "Dubai Real Estate Professionals", source: "linkedin" },
  { name: "UAE Expat Families Dubai", source: "facebook" },
  { name: "Dubai Broker Network TG", source: "telegram" },
  { name: "Bayut Agent Community", source: "bayut" },
  { name: "Dubizzle RE Listings", source: "dubizzle" },
  { name: "Dubai Expat Mums", source: "facebook" },
  { name: "UAE Corporate HR Network", source: "linkedin" },
  { name: "r/dubai Relocating", source: "instagram" },
  { name: "Dubai Property Talk", source: "telegram" },
];

const SEED_SIGNALS = [
  {
    community: "Dubai Real Estate Agents WA",
    source: "whatsapp_group",
    signalText: "Anyone knows a good move-in service for my client moving to Marina Gate 2 next month? They need DEWA, internet and movers all sorted.",
    intentType: "home_services",
    intentScore: 92,
    contactName: "Ahmed Al Mansoori",
    contactHandle: "+971501234567",
    area: "Dubai Marina",
  },
  {
    community: "Dubai Housing & Rentals",
    source: "facebook",
    signalText: "Just signed a 1yr lease in JVC! Landlord wants Ejari sorted ASAP. Any recommendations for a concierge who handles everything — Ejari, DEWA activation, wifi setup?",
    intentType: "ejari",
    intentScore: 95,
    contactName: "Sarah Mitchell",
    contactHandle: "sarah.m.dubai",
    area: "JVC",
  },
  {
    community: "RERA Licensed Brokers UAE",
    source: "whatsapp_group",
    signalText: "Clients relocating from London to Business Bay next week. Need someone to manage their DEWA setup, cleaning and moving — they have budget. Any trusted concierge?",
    intentType: "relocation",
    intentScore: 98,
    contactName: "Priya Sharma",
    contactHandle: "+971509876543",
    area: "Business Bay",
  },
  {
    community: "UAE Expat Families Dubai",
    source: "facebook",
    signalText: "Moving to Dubai from Singapore in 3 weeks. Overwhelmed with all the setup — DEWA, Etisalat, Ejari, movers, school registration. Is there any service that handles everything in one go?",
    intentType: "relocation",
    intentScore: 99,
    contactName: "Jennifer Tan",
    contactHandle: "@jen.tan.dubai",
    area: "Palm Jumeirah",
  },
  {
    community: "Dubai Real Estate Professionals",
    source: "linkedin",
    signalText: "Looking for a reliable move-in concierge partner I can refer my clients to. They need DEWA registration, Ejari, internet setup and cleaning — ideally a single-vendor solution. DM me.",
    intentType: "broker_referral",
    intentScore: 88,
    contactName: "Khalid Ibrahim",
    contactHandle: "linkedin.com/in/khalid-ibrahim-re",
    area: "Downtown Dubai",
  },
  {
    community: "Dubizzle RE Listings",
    source: "dubizzle",
    signalText: "Urgent: client moving to Al Barsha next Friday needs movers + cleaning + AC service all on the same day. Who can deliver?",
    intentType: "moving",
    intentScore: 94,
    contactName: "Mohammed R.",
    contactHandle: null,
    area: "Al Barsha",
  },
  {
    community: "Dubai Expat Mums",
    source: "facebook",
    signalText: "We just got keys to our apartment in Arabian Ranches! So excited but so stressed — the DEWA and Etisalat paperwork is insane. Any expat mums used a concierge service here?",
    intentType: "dewa_setup",
    intentScore: 91,
    contactName: "Emma Wilson",
    contactHandle: "@emmawilson_dubai",
    area: "Arabian Ranches",
  },
  {
    community: "Dubai Broker Network TG",
    source: "telegram",
    signalText: "I have a client from France who just bought in DIFC. Total relocation package needed — move, setup, Ejari, cleaning, even school for the kids. Anyone have a full-service partner?",
    intentType: "relocation",
    intentScore: 97,
    contactName: "Broker_Yusuf",
    contactHandle: "@yusuf_broker",
    area: "DIFC",
  },
];

async function generateSignalWithAI(community: typeof COMMUNITIES[0]): Promise<typeof SEED_SIGNALS[0] | null> {
  if (!openai) return null;

  const area = DUBAI_AREAS[Math.floor(Math.random() * DUBAI_AREAS.length)];
  const intentTypes = ["relocation", "moving", "home_services", "dewa_setup", "ejari", "broker_referral"];
  const intentType = intentTypes[Math.floor(Math.random() * intentTypes.length)];

  try {
    const prompt = `Generate a realistic social media post/message showing someone in Dubai needing home services. 

Community: ${community.name} (${community.source})
Area: ${area}
Intent type: ${intentType}

Context: DeliWer is a Dubai relocation concierge that handles DEWA activation, Ejari registration, internet setup, movers, cleaning, AC service in ONE booking.

Generate a realistic message that someone in this community might post showing ${intentType} intent. Sound authentic — like a real person, not an ad.

Return JSON only:
{
  "signalText": "The authentic-sounding message (1-3 sentences)",
  "intentScore": <number 70-99>,
  "contactName": "realistic name",
  "contactHandle": "realistic handle/phone based on platform",
  "area": "${area}"
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: 200,
    });

    const data = JSON.parse(response.choices[0].message.content || '{}');
    return {
      community: community.name,
      source: community.source,
      signalText: data.signalText,
      intentType,
      intentScore: data.intentScore || 80,
      contactName: data.contactName || null,
      contactHandle: data.contactHandle || null,
      area: data.area || area,
    };
  } catch {
    return null;
  }
}

export async function seedIntentSignals(): Promise<number> {
  const existing = await db.select({ count: sql<number>`count(*)` }).from(intentSignals);
  if (Number(existing[0]?.count) > 0) return 0;

  await db.insert(intentSignals).values(
    SEED_SIGNALS.map(s => ({
      ...s,
      capturedAt: new Date(Date.now() - Math.random() * 3 * 60 * 60 * 1000),
    }))
  );

  return SEED_SIGNALS.length;
}

export async function generateNewSignals(count = 5): Promise<number> {
  let inserted = 0;
  const selected: typeof COMMUNITIES[0][] = [];
  const shuffled = [...COMMUNITIES].sort(() => Math.random() - 0.5);

  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    selected.push(shuffled[i]);
  }

  for (const community of selected) {
    const signal = openai
      ? await generateSignalWithAI(community)
      : SEED_SIGNALS[Math.floor(Math.random() * SEED_SIGNALS.length)];

    if (!signal) continue;

    try {
      await db.insert(intentSignals).values({
        source: signal.source,
        community: signal.community,
        signalText: signal.signalText,
        intentType: signal.intentType,
        intentScore: signal.intentScore,
        contactName: signal.contactName || null,
        contactHandle: signal.contactHandle || null,
        area: signal.area || null,
        status: 'new',
        capturedAt: new Date(),
      });
      inserted++;
    } catch {
      // skip duplicate
    }
  }

  return inserted;
}

export async function generateAIResponse(signalId: string): Promise<string> {
  const [signal] = await db.select().from(intentSignals).where(eq(intentSignals.id, signalId));
  if (!signal) throw new Error('Signal not found');

  const template = buildResponseTemplate(signal);

  if (!openai) return template;

  try {
    const prompt = `You are crafting a WhatsApp outreach message for DeliWer — Dubai's move-in concierge that handles DEWA, Ejari, internet, movers, cleaning in ONE booking. Brokers earn AED 500–2,000 per client referred.

Someone posted this in ${signal.community}:
"${signal.signalText}"

Contact: ${signal.contactName || 'Unknown'} ${signal.area ? `(${signal.area})` : ''}
Intent: ${signal.intentType}

Write a WARM, NON-SALESY 2-3 sentence WhatsApp message responding to this specific post. Address their exact pain point. End with "Want to learn more? → deliwer.ae"

Return JSON:
{ "message": "..." }`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: 200,
    });

    const data = JSON.parse(response.choices[0].message.content || '{}');
    const message = data.message || template;

    await db.update(intentSignals)
      .set({ aiResponse: message })
      .where(eq(intentSignals.id, signalId));

    return message;
  } catch {
    await db.update(intentSignals)
      .set({ aiResponse: template })
      .where(eq(intentSignals.id, signalId));
    return template;
  }
}

function buildResponseTemplate(signal: typeof intentSignals.$inferSelect): string {
  const name = signal.contactName ? signal.contactName.split(' ')[0] : 'Hi';
  const area = signal.area || 'Dubai';

  const templates: Record<string, string> = {
    relocation: `${name}! We can help — DeliWer handles the entire move-in for ${area}: DEWA, Ejari, internet, movers & cleaning all in ONE booking. Your client just picks a date and we do the rest. Want to learn more? → deliwer.ae`,
    moving: `${name}! DeliWer can sort everything for ${area} — movers, cleaning, DEWA, internet all booked at once. No juggling multiple vendors. Want to learn more? → deliwer.ae`,
    home_services: `${name}! That's exactly what DeliWer does — we bundle all move-in services (DEWA, internet, movers, cleaning) for ${area} into one concierge booking. Want to learn more? → deliwer.ae`,
    dewa_setup: `${name}! DeliWer handles DEWA activation as part of our full move-in package for ${area} — we also do Ejari, internet setup & cleaning so you're not juggling different vendors. Want to learn more? → deliwer.ae`,
    ejari: `${name}! We handle Ejari registration as part of DeliWer's full ${area} move-in bundle — DEWA, internet, movers & cleaning included. One booking, everything sorted. Want to learn more? → deliwer.ae`,
    broker_referral: `${name}! DeliWer is exactly what you're looking for — we're the single-vendor solution for all client move-in needs in Dubai, and you earn AED 500–2,000 per referral. Happy to partner! Want to learn more? → deliwer.ae`,
  };

  return templates[signal.intentType] || templates.relocation;
}

export async function getIntentSignals(filters: {
  status?: string;
  source?: string;
  intentType?: string;
  limit?: number;
}) {
  await seedIntentSignals();

  const conditions = [];
  if (filters.status) conditions.push(eq(intentSignals.status, filters.status));
  if (filters.source) conditions.push(eq(intentSignals.source, filters.source));
  if (filters.intentType) conditions.push(eq(intentSignals.intentType, filters.intentType));

  const rows = await db
    .select()
    .from(intentSignals)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(intentSignals.capturedAt))
    .limit(filters.limit || 50);

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

  return { byStatus, bySource, byIntent };
}
