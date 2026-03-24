import { db } from '../db';
import { brokerMaster, brokerAutomationLog } from '@shared/schema';
import { eq, sql } from 'drizzle-orm';
import { generateRefCode, generatePartnerLink } from '../broker-campaign-service';
import * as XLSX from 'xlsx';

export interface FetchedBroker {
  name: string;
  email: string;
  phone?: string;
  license?: string;
}

const RERA_API_ENDPOINTS = [
  'https://publicapi.dubailand.gov.ae/broker/BrokerLicense/search?',
  'https://services.dubailand.gov.ae/api/v1/brokers',
];

async function tryFetchFromReraApi(): Promise<FetchedBroker[]> {
  for (const endpoint of RERA_API_ENDPOINTS) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(endpoint, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
      });

      clearTimeout(timeout);

      if (!res.ok) continue;

      const contentType = res.headers.get('content-type') || '';

      if (contentType.includes('json')) {
        const data = await res.json();
        const items: any[] = Array.isArray(data) ? data : data.data || data.result || data.brokers || [];
        if (items.length > 0) {
          return items
            .map((item: any) => ({
              name: item.brokerName || item.name || item.Name || item.fullName || '',
              email: item.email || item.Email || item.emailAddress || '',
              phone: item.mobile || item.phone || item.Phone || item.mobileNo || '',
              license: item.licenseNo || item.license || item.License || item.reraNo || '',
            }))
            .filter((b) => b.email && b.email.includes('@'));
        }
      }

      if (contentType.includes('spreadsheetml') || contentType.includes('octet-stream') || contentType.includes('vnd.ms-excel')) {
        const buffer = await res.arrayBuffer();
        return parseXlsxBuffer(Buffer.from(buffer));
      }
    } catch {
      continue;
    }
  }
  return [];
}

function parseXlsxBuffer(buffer: Buffer): FetchedBroker[] {
  try {
    const wb = XLSX.read(buffer, { type: 'buffer' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    if (rows.length < 2) return [];

    const headers = (rows[0] as string[]).map((h) => String(h || '').toLowerCase().trim());
    const findCol = (...keys: string[]) => headers.findIndex((h) => keys.some((k) => h.includes(k)));

    const nameCol = findCol('name', 'broker', 'agent');
    const emailCol = findCol('email', 'e-mail');
    const phoneCol = findCol('phone', 'mobile', 'tel');
    const licenseCol = findCol('license', 'licence', 'rera', 'brnumber');

    return rows
      .slice(1)
      .map((row) => ({
        name: nameCol >= 0 ? String(row[nameCol] || '').trim() : '',
        email: emailCol >= 0 ? String(row[emailCol] || '').trim() : '',
        phone: phoneCol >= 0 ? String(row[phoneCol] || '').trim() : '',
        license: licenseCol >= 0 ? String(row[licenseCol] || '').trim() : '',
      }))
      .filter((b) => b.email && b.email.includes('@'));
  } catch {
    return [];
  }
}

export interface FetchResult {
  success: boolean;
  source: 'rera_api' | 'failed';
  brokersFound: number;
  newBrokers: number;
  errors?: string;
  logId: string;
}

export async function runBrokerFetch(triggeredBy: 'daily' | 'manual_fetch' = 'manual_fetch'): Promise<FetchResult> {
  const [log] = await db.insert(brokerAutomationLog).values({
    runType: triggeredBy,
    status: 'running',
  }).returning();

  let fetched: FetchedBroker[] = [];
  let source: 'rera_api' | 'failed' = 'failed';
  let errors: string | undefined;

  try {
    fetched = await tryFetchFromReraApi();
    if (fetched.length > 0) {
      source = 'rera_api';
    }
  } catch (err: any) {
    errors = err.message || 'Fetch error';
  }

  let newBrokers = 0;

  for (const broker of fetched) {
    if (!broker.email || !broker.name) continue;

    const existing = await db.select({ id: brokerMaster.id })
      .from(brokerMaster)
      .where(eq(brokerMaster.email, broker.email))
      .limit(1);

    if (existing.length === 0) {
      const refCode = generateRefCode(broker.name, broker.email);
      const partnerLink = generatePartnerLink(refCode);

      await db.insert(brokerMaster).values({
        email: broker.email,
        name: broker.name,
        phone: broker.phone || null,
        license: broker.license || null,
        refCode,
        partnerLink,
        status: 'new',
        source: 'rera_auto',
      });
      newBrokers++;
    }
  }

  await db.update(brokerAutomationLog).set({
    status: fetched.length === 0 && source === 'failed' ? 'failed' : 'completed',
    brokersFound: fetched.length,
    newBrokers,
    errors: errors || null,
    completedAt: new Date(),
  }).where(eq(brokerAutomationLog.id, log.id));

  console.log(`[BROKER FETCH] Found: ${fetched.length}, New: ${newBrokers}, Source: ${source}`);

  return {
    success: source !== 'failed' || fetched.length > 0,
    source,
    brokersFound: fetched.length,
    newBrokers,
    errors,
    logId: log.id,
  };
}
