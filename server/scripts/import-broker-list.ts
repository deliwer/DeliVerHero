import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const XLSX = require('xlsx');
import * as fs from 'fs';
import * as path from 'path';
import { db } from '../db';
import { brokerMaster } from '@shared/schema';
import { generateRefCode, generatePartnerLink } from '../broker-campaign-service';

const INSERT_BATCH = 300;

interface ParsedBroker {
  name: string;
  email: string;
  phone?: string;
  license?: string;
  company?: string;
}

function parseXlsFile(filePath: string): ParsedBroker[] {
  const workbook = XLSX.readFile(filePath, { type: 'file' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  const brokers: ParsedBroker[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length < 6) continue;

    // Columns: English Name | Arabic Name | License | Company EN | Company AR | Email | Phone
    const name = String(row[0] || '').trim();
    const license = String(row[2] || '').trim();
    const company = String(row[3] || '').trim();
    const email = String(row[5] || '').toLowerCase().trim();
    const phone = String(row[6] || '').trim();

    // Skip header rows or rows without a valid email
    if (!email || !email.includes('@') || !name) continue;

    brokers.push({ name, email, license: license || undefined, company: company || undefined, phone: phone !== '0' ? phone || undefined : undefined });
  }

  return brokers;
}

async function run() {
  // Try all uploaded broker XLS files (newest first based on filename number)
  const assetDir = path.join(process.cwd(), 'attached_assets');
  const files = fs.readdirSync(assetDir)
    .filter(f => f.startsWith('Brokers_List') && f.endsWith('.xls'))
    .sort();

  console.log(`[IMPORT] Found ${files.length} broker list file(s):`, files);

  // Use only the specific file passed as argument, or all files
  const targetFile = process.argv[2];
  const filesToProcess = targetFile
    ? [path.join(assetDir, path.basename(targetFile))]
    : files.map(f => path.join(assetDir, f));

  // Get all existing emails once
  const existingRows = await db.select({ email: brokerMaster.email }).from(brokerMaster);
  const existingEmails = new Set(existingRows.map(r => r.email));
  console.log(`[IMPORT] ${existingEmails.size} brokers already in master DB`);

  const seenInRun = new Set<string>(existingEmails);
  let totalParsed = 0;
  let totalInserted = 0;
  let totalSkipped = 0;

  for (const filePath of filesToProcess) {
    if (!fs.existsSync(filePath)) {
      console.warn(`[IMPORT] File not found: ${filePath}`);
      continue;
    }

    console.log(`\n[IMPORT] Parsing: ${path.basename(filePath)}`);
    const brokers = parseXlsFile(filePath);
    console.log(`[IMPORT] Parsed ${brokers.length} brokers from file`);
    totalParsed += brokers.length;

    const toInsert = brokers.filter(b => {
      if (seenInRun.has(b.email)) return false;
      seenInRun.add(b.email);
      return true;
    });

    totalSkipped += brokers.length - toInsert.length;
    totalInserted += toInsert.length;

    console.log(`[IMPORT] ${toInsert.length} new, ${brokers.length - toInsert.length} skipped (already exist)`);

    for (let i = 0; i < toInsert.length; i += INSERT_BATCH) {
      const chunk = toInsert.slice(i, i + INSERT_BATCH);
      const rows = chunk.map(b => {
        const refCode = generateRefCode(b.name, b.email);
        return {
          email: b.email,
          name: b.name,
          phone: b.phone || null,
          license: b.license || null,
          company: b.company || null,
          refCode,
          partnerLink: generatePartnerLink(refCode),
          status: 'new' as const,
          source: 'manual' as const,
        };
      });
      await db.insert(brokerMaster).values(rows);
      console.log(`[IMPORT] Inserted batch ${Math.floor(i / INSERT_BATCH) + 1}: ${rows.length} rows`);
    }
  }

  console.log(`\n[IMPORT] ✓ Complete. Parsed: ${totalParsed} | Inserted: ${totalInserted} | Skipped (duplicates): ${totalSkipped}`);
  process.exit(0);
}

run().catch(err => {
  console.error('[IMPORT] Fatal error:', err);
  process.exit(1);
});
