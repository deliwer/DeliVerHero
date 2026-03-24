import { db } from '../db';
import { brokerMaster, brokerAutomationLog } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { generateRefCode, generatePartnerLink } from '../broker-campaign-service';
import * as fs from 'fs';
import * as path from 'path';

const LOCAL_JSON_PATH = path.join(process.cwd(), 'server/data/rera_brokers.json');
const LOCAL_XLS_PATH = path.join(process.cwd(), 'server/data/RERA_Brokers.xls');

export interface FetchedBroker {
  name: string;
  email: string;
  phone?: string;
  license?: string;
  company?: string;
}

export interface LocalFileStats {
  exists: boolean;
  totalBrokers: number;
  fileSizeKB: number;
  lastModified?: Date;
  xlsExists: boolean;
  xlsSizeKB: number;
}

export function getLocalFileStats(): LocalFileStats {
  try {
    const jsonStat = fs.statSync(LOCAL_JSON_PATH);
    const xlsStat = fs.existsSync(LOCAL_XLS_PATH) ? fs.statSync(LOCAL_XLS_PATH) : null;
    const data: FetchedBroker[] = JSON.parse(fs.readFileSync(LOCAL_JSON_PATH, 'utf8'));
    return {
      exists: true,
      totalBrokers: data.length,
      fileSizeKB: Math.round(jsonStat.size / 1024),
      lastModified: jsonStat.mtime,
      xlsExists: xlsStat !== null,
      xlsSizeKB: xlsStat ? Math.round(xlsStat.size / 1024) : 0,
    };
  } catch {
    return { exists: false, totalBrokers: 0, fileSizeKB: 0, xlsExists: false, xlsSizeKB: 0 };
  }
}

function loadLocalBrokerList(): FetchedBroker[] {
  try {
    if (!fs.existsSync(LOCAL_JSON_PATH)) return [];
    const raw = fs.readFileSync(LOCAL_JSON_PATH, 'utf8');
    const data = JSON.parse(raw) as FetchedBroker[];
    console.log(`[BROKER FETCH] Loaded ${data.length} brokers from local RERA file`);
    return data;
  } catch (err: any) {
    console.error('[BROKER FETCH] Failed to load local file:', err.message);
    return [];
  }
}

async function tryFetchFromReraApi(): Promise<FetchedBroker[]> {
  const endpoints = [
    'https://publicapi.dubailand.gov.ae/broker/BrokerLicense/search?',
    'https://services.dubailand.gov.ae/api/v1/brokers',
  ];

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(endpoint, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0' },
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
              name: item.brokerName || item.name || item.Name || '',
              email: (item.email || item.Email || item.emailAddress || '').toLowerCase().trim(),
              phone: item.mobile || item.phone || item.Phone || '',
              license: item.licenseNo || item.license || item.reraNo || '',
              company: item.companyName || item.company || '',
            }))
            .filter((b) => b.email && b.email.includes('@'));
        }
      }
    } catch {
      continue;
    }
  }
  return [];
}

export interface FetchResult {
  success: boolean;
  source: 'local_file' | 'rera_api' | 'failed';
  brokersFound: number;
  newBrokers: number;
  alreadyInMaster: number;
  errors?: string;
  logId: string;
}

export async function runBrokerFetch(triggeredBy: 'daily' | 'manual_fetch' = 'manual_fetch'): Promise<FetchResult> {
  const [log] = await db.insert(brokerAutomationLog).values({
    runType: triggeredBy,
    status: 'running',
  }).returning();

  let fetched: FetchedBroker[] = [];
  let source: 'local_file' | 'rera_api' | 'failed' = 'failed';
  let errors: string | undefined;

  // Primary: load from local RERA file (always available, most reliable)
  fetched = loadLocalBrokerList();
  if (fetched.length > 0) {
    source = 'local_file';
  } else {
    // Fallback: try live RERA API
    try {
      fetched = await tryFetchFromReraApi();
      if (fetched.length > 0) {
        source = 'rera_api';
      }
    } catch (err: any) {
      errors = err.message || 'Fetch error';
    }
  }

  let newBrokers = 0;
  let alreadyInMaster = 0;

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
        source: source === 'local_file' ? 'rera_auto' : 'rera_auto',
      });
      newBrokers++;
    } else {
      alreadyInMaster++;
    }
  }

  await db.update(brokerAutomationLog).set({
    status: source === 'failed' ? 'failed' : 'completed',
    brokersFound: fetched.length,
    newBrokers,
    errors: errors || null,
    completedAt: new Date(),
  }).where(eq(brokerAutomationLog.id, log.id));

  console.log(`[BROKER FETCH] Source: ${source}, Found: ${fetched.length}, New: ${newBrokers}, Already in master: ${alreadyInMaster}`);

  return {
    success: source !== 'failed',
    source,
    brokersFound: fetched.length,
    newBrokers,
    alreadyInMaster,
    errors,
    logId: log.id,
  };
}
