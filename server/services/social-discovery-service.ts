import { db } from '../db';
import { brokerMaster } from '@shared/schema';
import { eq, isNull, or, sql } from 'drizzle-orm';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI() : null;

export interface SocialDiscoveryResult {
  brokerId: string;
  name: string;
  company?: string;
  linkedinUrl?: string;
  instagramHandle?: string;
  twitterHandle?: string;
  facebookUrl?: string;
  gmbUrl?: string;
  notes: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface DiscoveryRunStatus {
  isRunning: boolean;
  lastRunAt?: Date;
  totalDiscovered: number;
  totalPending: number;
  totalFound: number;
  totalNotFound: number;
}

let _isRunning = false;
let _lastRunAt: Date | undefined;
let _currentProgress = { processed: 0, total: 0, found: 0 };

export function getDiscoveryStatus(): DiscoveryRunStatus & { progress: typeof _currentProgress } {
  return {
    isRunning: _isRunning,
    lastRunAt: _lastRunAt,
    totalDiscovered: 0,
    totalPending: 0,
    totalFound: 0,
    totalNotFound: 0,
    progress: { ..._currentProgress },
  };
}

export function isDiscoveryRunning(): boolean {
  return _isRunning;
}

async function discoverHandlesForBroker(broker: {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  license?: string | null;
}): Promise<SocialDiscoveryResult> {
  const emailDomain = broker.email.split('@')[1] || '';
  const companyName = broker.company || '';

  if (!openai) {
    return buildFallbackResult(broker, emailDomain, companyName);
  }

  try {
    const prompt = `You are a social media research assistant. Given the details of a Dubai real estate broker, infer the most likely social media handles and URLs they would use. Return ONLY a JSON object — no explanation.

Broker details:
- Name: ${broker.name}
- Company: ${companyName}
- Email: ${broker.email}
- Email domain: ${emailDomain}
- RERA License: ${broker.license || 'unknown'}

Rules:
1. LinkedIn URL format: https://www.linkedin.com/in/<slug> — slug is usually firstname-lastname or name with hyphens, lowercased
2. Instagram handle: @firstnamelastname or @companyname_realestate style (no @, just the handle)
3. Twitter/X handle: similar pattern
4. Facebook: https://www.facebook.com/<pageOrProfile>
5. Google My Business URL: https://www.google.com/maps/search/<CompanyName>+Dubai
6. If the email domain suggests a known company website (not gmail/yahoo/hotmail), use that to infer their GMB and social presence
7. Confidence: "high" if domain is a known RE company, "medium" if personal domain, "low" if gmail/hotmail
8. notes: a 1-sentence summary of likely social presence

Return JSON only:
{
  "linkedinUrl": "https://...",
  "instagramHandle": "handle_without_at",
  "twitterHandle": "handle_without_at",
  "facebookUrl": "https://...",
  "gmbUrl": "https://...",
  "confidence": "medium",
  "notes": "..."
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: 300,
    });

    const data = JSON.parse(response.choices[0].message.content || '{}');

    return {
      brokerId: broker.id,
      name: broker.name,
      company: companyName,
      linkedinUrl: data.linkedinUrl || undefined,
      instagramHandle: data.instagramHandle || undefined,
      twitterHandle: data.twitterHandle || undefined,
      facebookUrl: data.facebookUrl || undefined,
      gmbUrl: data.gmbUrl || undefined,
      notes: data.notes || 'AI-inferred social presence',
      confidence: data.confidence || 'low',
    };
  } catch (err: any) {
    console.error(`[SOCIAL DISCOVERY] AI error for ${broker.name}:`, err.message);
    return buildFallbackResult(broker, emailDomain, companyName);
  }
}

function buildFallbackResult(
  broker: { id: string; name: string; email: string },
  emailDomain: string,
  companyName: string
): SocialDiscoveryResult {
  const nameParts = broker.name.toLowerCase().replace(/[^a-z\s]/g, '').trim().split(/\s+/);
  const slug = nameParts.slice(0, 2).join('-');
  const genericCompany = companyName.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-');
  const isPersonalEmail = ['gmail', 'yahoo', 'hotmail', 'outlook'].some(d => emailDomain.includes(d));

  return {
    brokerId: broker.id,
    name: broker.name,
    company: companyName,
    linkedinUrl: `https://www.linkedin.com/in/${slug}`,
    instagramHandle: slug.replace('-', '_'),
    twitterHandle: slug.replace('-', '_'),
    facebookUrl: `https://www.facebook.com/${genericCompany || slug}`,
    gmbUrl: companyName ? `https://www.google.com/maps/search/${encodeURIComponent(companyName + ' Dubai')}` : undefined,
    notes: isPersonalEmail ? 'Personal email — social presence inferred from name' : `Domain ${emailDomain} may have dedicated social profiles`,
    confidence: isPersonalEmail ? 'low' : 'medium',
  };
}

const BATCH_SIZE = 20;
const DELAY_MS = 300;

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

export async function runSocialDiscovery(limit = 100): Promise<{
  processed: number;
  found: number;
  errors: number;
}> {
  if (_isRunning) throw new Error('Social discovery already running');
  _isRunning = true;
  _lastRunAt = new Date();
  _currentProgress = { processed: 0, total: limit, found: 0 };

  let processed = 0;
  let found = 0;
  let errors = 0;

  try {
    const brokers = await db
      .select({
        id: brokerMaster.id,
        name: brokerMaster.name,
        email: brokerMaster.email,
        company: brokerMaster.company,
        license: brokerMaster.license,
      })
      .from(brokerMaster)
      .where(
        or(
          isNull(brokerMaster.socialDiscoveryStatus),
          eq(brokerMaster.socialDiscoveryStatus, 'pending')
        )
      )
      .limit(limit);

    _currentProgress.total = brokers.length;
    console.log(`[SOCIAL DISCOVERY] Starting discovery for ${brokers.length} brokers`);

    for (let i = 0; i < brokers.length; i += BATCH_SIZE) {
      const batch = brokers.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (broker) => {
          try {
            await db
              .update(brokerMaster)
              .set({ socialDiscoveryStatus: 'discovering' })
              .where(eq(brokerMaster.id, broker.id));

            const result = await discoverHandlesForBroker(broker);
            const hasAny = !!(result.linkedinUrl || result.instagramHandle || result.twitterHandle || result.facebookUrl || result.gmbUrl);

            await db
              .update(brokerMaster)
              .set({
                linkedinUrl: result.linkedinUrl || null,
                instagramHandle: result.instagramHandle || null,
                twitterHandle: result.twitterHandle || null,
                facebookUrl: result.facebookUrl || null,
                gmbUrl: result.gmbUrl || null,
                socialDiscoveryStatus: hasAny ? 'found' : 'not_found',
                socialDiscoveredAt: new Date(),
                socialNotes: result.notes,
                updatedAt: new Date(),
              })
              .where(eq(brokerMaster.id, broker.id));

            if (hasAny) found++;
            processed++;
            _currentProgress.processed = processed;
            _currentProgress.found = found;
          } catch (err: any) {
            errors++;
            console.error(`[SOCIAL DISCOVERY] Error on ${broker.name}:`, err.message);
            await db
              .update(brokerMaster)
              .set({ socialDiscoveryStatus: 'not_found', updatedAt: new Date() })
              .where(eq(brokerMaster.id, broker.id));
          }
        })
      );
      if (i + BATCH_SIZE < brokers.length) await sleep(DELAY_MS);
    }
  } finally {
    _isRunning = false;
  }

  console.log(`[SOCIAL DISCOVERY] Done. Processed: ${processed}, Found: ${found}, Errors: ${errors}`);
  return { processed, found, errors };
}

export async function updateBrokerSocial(
  brokerId: string,
  social: {
    linkedinUrl?: string;
    instagramHandle?: string;
    twitterHandle?: string;
    facebookUrl?: string;
    gmbUrl?: string;
    socialNotes?: string;
  }
) {
  await db
    .update(brokerMaster)
    .set({
      ...social,
      socialDiscoveryStatus: 'found',
      socialDiscoveredAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(brokerMaster.id, brokerId));
}

export async function getSocialDiscoveryStats() {
  const rows = await db
    .select({
      status: brokerMaster.socialDiscoveryStatus,
      count: sql<number>`count(*)`,
    })
    .from(brokerMaster)
    .where(eq(brokerMaster.deleted, false))
    .groupBy(brokerMaster.socialDiscoveryStatus);

  const stats: Record<string, number> = {
    pending: 0,
    discovering: 0,
    found: 0,
    not_found: 0,
  };

  for (const row of rows) {
    const key = row.status || 'pending';
    stats[key] = Number(row.count);
  }

  return stats;
}
