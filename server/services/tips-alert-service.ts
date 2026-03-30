import { db } from '../db';
import { emailSubscribers, tipsSendLog } from '@shared/schema';
import { eq, sql } from 'drizzle-orm';
import { sendEmail } from '../sendgrid-service';

const FROM_EMAIL = 'info@deliwer.com';
const FROM_NAME = 'DeliWer Dubai';

// ── Tips Library ─────────────────────────────────────────────────────────────

export interface Tip {
  id: string;
  category: 'dubai_living' | 'emergency' | 'wartime' | 'expat_banking' | 'legal' | 'seasonal' | 'wellness';
  categoryLabel: string;
  title: string;
  body: string;
  emoji: string;
  cta?: { label: string; url: string };
}

export const TIPS_LIBRARY: Tip[] = [
  // ── Dubai Living ──────────────────────────────────────────────────────────
  {
    id: 'ejari-renewal',
    category: 'dubai_living',
    categoryLabel: 'Dubai Living',
    emoji: '📄',
    title: 'Ejari renewal must happen before your lease ends',
    body: 'Many Dubai tenants don\'t know that Ejari renewal is mandatory for every new lease term — including renewals. If you miss the deadline, your lease becomes legally unregistered, which can affect utility activations and visa renewals. Renew at least 2 weeks before your current Ejari expiry.',
    cta: { label: 'Renew Ejari Now', url: 'https://www.deliwer.com/ejari-dubai' },
  },
  {
    id: 'dewa-activation',
    category: 'dubai_living',
    categoryLabel: 'Dubai Living',
    emoji: '⚡',
    title: 'DEWA activation takes 1–3 business days — plan ahead',
    body: 'Most new tenants forget to activate DEWA before moving in. DEWA requires your Ejari certificate first. Submit the application online (dewa.gov.ae) and pay the security deposit (AED 2,000 for apartments). Processing takes 1–3 business days, so apply before your move-in date.',
    cta: { label: 'Get DEWA Activated', url: 'https://www.deliwer.com/dewa-activation' },
  },
  {
    id: 'rent-increase-limit',
    category: 'dubai_living',
    categoryLabel: 'Dubai Living',
    emoji: '📊',
    title: 'Your landlord cannot increase rent freely — know your rights',
    body: 'Dubai\'s RERA Rental Index controls how much a landlord can increase your rent. If your rent is at or above market rate, no increase is allowed. Even if below market, increases are capped at 5–20% depending on how far below the index your rent sits. Check at dubailand.gov.ae before accepting any rent hike.',
    cta: { label: 'Check Rent Rules', url: 'https://www.deliwer.com/dubai-rent-increase-rules' },
  },
  {
    id: 'tap-water-dubai',
    category: 'dubai_living',
    categoryLabel: 'Dubai Living',
    emoji: '💧',
    title: 'Dubai tap water is safe but not recommended to drink daily',
    body: 'Dubai tap water meets WHO standards and is technically safe, but the distribution pipes in older buildings can add contaminants. Most long-term residents use water delivery or filtration systems. If you\'re new, get your building\'s water tested before drinking it directly.',
    cta: { label: 'Get Water Tested', url: 'https://www.deliwer.com/aquacafe' },
  },
  {
    id: 'move-out-notice',
    category: 'dubai_living',
    categoryLabel: 'Dubai Living',
    emoji: '🚪',
    title: 'Leaving Dubai? Give 90 days written notice to avoid fines',
    body: 'In Dubai, most tenancy contracts require 90 days written notice before you vacate. If you leave without notice or break the lease early, your landlord can keep your deposit and potentially pursue legal action through the Rental Disputes Centre. Send notice via registered mail or official channel.',
    cta: { label: 'Plan Your Move-Out', url: 'https://www.deliwer.com/exit-dubai' },
  },
  {
    id: 'community-rules',
    category: 'dubai_living',
    categoryLabel: 'Dubai Living',
    emoji: '🏘️',
    title: 'Your building\'s community rules are legally enforceable in Dubai',
    body: 'STRATA Law in Dubai gives building communities (OAs) the right to enforce noise rules, pet policies, and common area usage. Violations can result in fines up to AED 50,000. Read your community\'s rules within the first 30 days of moving in.',
  },
  {
    id: 'chiller-fees',
    category: 'dubai_living',
    categoryLabel: 'Dubai Living',
    emoji: '❄️',
    title: 'District cooling (chiller) fees can be more expensive than DEWA',
    body: 'In buildings with district cooling (Empower, Emicool, Palm Utilities), your cooling bill is separate from DEWA and often 2–3x more expensive in summer. Check your lease for who pays chiller charges before signing — this is one of the biggest hidden costs in Dubai apartments.',
  },
  {
    id: 'dewa-deposit-refund',
    category: 'dubai_living',
    categoryLabel: 'Dubai Living',
    emoji: '💵',
    title: 'You get your DEWA deposit back when you move out — don\'t forget to claim it',
    body: 'When you deactivate DEWA at move-out, you\'re entitled to a refund of your security deposit (AED 2,000 for apartments). Submit the deactivation request through dewa.gov.ae or the DEWA app, and the refund comes within 5–7 business days. Many expats forget this.',
    cta: { label: 'Plan Move-Out', url: 'https://www.deliwer.com/exit-dubai' },
  },

  // ── Emergency Preparedness ─────────────────────────────────────────────────
  {
    id: 'evac-bag',
    category: 'emergency',
    categoryLabel: 'Emergency Preparedness',
    emoji: '🎒',
    title: 'Build your go-bag today — before you ever need it',
    body: 'A go-bag should always be packed and ready: passports for every family member, AED 3,000–5,000 cash, a 72-hour medication supply, phone charger + power bank, and one change of clothes. Store it somewhere you can grab in under 60 seconds. Don\'t wait for an emergency to prepare.',
    cta: { label: 'Register Exit Plan', url: 'https://www.deliwer.com/emergency-exit' },
  },
  {
    id: 'cash-buffer',
    category: 'emergency',
    categoryLabel: 'Emergency Preparedness',
    emoji: '💴',
    title: 'Keep AED 5,000 in cash at home — ATMs fail during crises',
    body: 'During power outages, system failures, or civil emergencies, ATMs stop working and card payments may fail. Having AED 5,000 in mixed denominations (100s and 50s) at home means you can operate for 3–5 days without banking access. Store it in a locked drawer, not your wallet.',
    cta: { label: 'Emergency Checklist', url: 'https://www.deliwer.com/emergency-exit' },
  },
  {
    id: 'offline-maps',
    category: 'emergency',
    categoryLabel: 'Emergency Preparedness',
    emoji: '🗺️',
    title: 'Download offline Dubai maps — internet won\'t always be available',
    body: 'Open Google Maps, search for Dubai, and use the \'Download offline map\' feature. Download Dubai + Sharjah + the Oman border region (Hatta). If your internet goes down during an emergency, you\'ll still have navigation. Recommeded: also download Maps.me as a backup.',
    cta: { label: 'View Exit Routes', url: 'https://www.deliwer.com/emergency-exit' },
  },
  {
    id: 'embassy-register',
    category: 'emergency',
    categoryLabel: 'Emergency Preparedness',
    emoji: '🏛️',
    title: 'Register with your home country\'s embassy in UAE',
    body: 'Most countries offer a voluntary registration system for citizens abroad. In the UK it\'s FCDO LOCATE, in the USA it\'s STEP (Smart Traveler Enrollment Program), Canada has Registration of Canadians Abroad. Registered citizens get priority alerts and evacuation assistance during crises.',
    cta: { label: 'Emergency Exit Plan', url: 'https://www.deliwer.com/emergency-exit' },
  },
  {
    id: 'medical-id-card',
    category: 'emergency',
    categoryLabel: 'Emergency Preparedness',
    emoji: '🏥',
    title: 'Carry a medical ID card — especially if you have conditions',
    body: 'A medical ID card in your wallet (or on your phone lock screen) listing your blood type, allergies, and medications can save your life if you\'re unconscious during a crisis. For UAE: blood type cards can be printed at any medical center after a blood test. Keep one per family member.',
  },
  {
    id: 'water-storage',
    category: 'emergency',
    categoryLabel: 'Emergency Preparedness',
    emoji: '🪣',
    title: 'Store 9 litres of water per person for a 3-day emergency',
    body: 'The minimum water recommendation in a crisis is 3 litres per person per day (drinking + sanitation). For a family of 3, store 27 litres minimum. Use sealed gallon jugs or collapsible water containers. Rotate every 6 months. In Dubai\'s heat, dehydration is a rapid risk.',
  },

  // ── Wartime Readiness ─────────────────────────────────────────────────────
  {
    id: 'shelter-in-place',
    category: 'wartime',
    categoryLabel: 'Crisis Readiness',
    emoji: '🏠',
    title: 'Shelter in place: interior rooms, away from windows',
    body: 'If you are advised to shelter in place, choose an interior room (no exterior walls) on a middle floor. Close all windows, seal gaps with wet towels if needed, and turn off A/C that draws outside air. Stay there until official all-clear from UAE government channels only (WAM, UAE government app).',
    cta: { label: 'Join Readiness Network', url: 'https://www.deliwer.com/wartime-readiness' },
  },
  {
    id: 'official-sources',
    category: 'wartime',
    categoryLabel: 'Crisis Readiness',
    emoji: '📡',
    title: 'Only trust official UAE channels during a crisis — not social media',
    body: 'During emergencies, misinformation spreads faster than facts. Only trust: UAE government portal (u.ae), WAM news agency (wam.ae), Dubai Media Office (mediaoffice.ae), and NCEMA (ncema.gov.ae). Turn off social media notifications and only check verified sources every 2–4 hours.',
    cta: { label: 'Alert Level Guide', url: 'https://www.deliwer.com/wartime-readiness' },
  },
  {
    id: 'communication-plan',
    category: 'wartime',
    categoryLabel: 'Crisis Readiness',
    emoji: '📞',
    title: 'Set up a communication plan before you need one',
    body: 'Choose one person outside the UAE as your family\'s central contact. Everyone checks in with them, not each other — this prevents overloaded calls when networks are congested. Set two check-in times: 8am and 8pm. If contact is missed by 4 hours, the designated person initiates emergency protocols.',
    cta: { label: 'Full Readiness Guide', url: 'https://www.deliwer.com/wartime-readiness' },
  },
  {
    id: 'wartime-apps',
    category: 'wartime',
    categoryLabel: 'Crisis Readiness',
    emoji: '📱',
    title: 'Download Zello and Bridgefy now — before networks go down',
    body: 'Zello works like a walkie-talkie over any internet connection (including 2G). Bridgefy creates a Bluetooth mesh network — no internet required, with ~330m range per device. Install both apps now (free) and test them with family. These work when regular calls and WhatsApp are overloaded.',
  },
  {
    id: 'generator-fuel',
    category: 'wartime',
    categoryLabel: 'Crisis Readiness',
    emoji: '⛽',
    title: 'Keep your car\'s fuel above half at all times',
    body: 'In a crisis, fuel stations may run dry within hours. The simple rule: never let your car go below half a tank. This gives you roughly 250–400km range at all times — enough to reach Oman, Abu Dhabi, or any major exit point from Dubai. Fill up every time you pass 50%.',
  },

  // ── Expat Banking ─────────────────────────────────────────────────────────
  {
    id: 'bank-account-home',
    category: 'expat_banking',
    categoryLabel: 'Expat Banking',
    emoji: '🏦',
    title: 'Maintain an active bank account in your home country',
    body: 'One of the biggest mistakes expats make is closing all home country accounts after moving. If you need to leave UAE quickly, you\'ll need money accessible outside the UAE. Keep a savings account with at least 3 months\' expenses in your home country currency. Most UAE banks also allow international transfers.',
  },
  {
    id: 'wise-card',
    category: 'expat_banking',
    categoryLabel: 'Expat Banking',
    emoji: '💳',
    title: 'Get a Wise or Revolut card — the expat\'s financial safety net',
    body: 'Wise (formerly TransferWise) lets you hold money in 50+ currencies and spend globally at near-real exchange rates. For UAE expats: open a Wise account before a crisis, transfer money out of UAE, and access it globally. It\'s free to open and has a physical card for ATM withdrawals worldwide.',
  },
  {
    id: 'uae-banking-freeze',
    category: 'expat_banking',
    categoryLabel: 'Expat Banking',
    emoji: '❄️',
    title: 'UAE bank accounts freeze if you have active loans when you cancel your visa',
    body: 'If you cancel your residency visa with an outstanding personal loan or credit card, UAE banks can freeze your account and report you to the UAE Credit Bureau (Al Etihad). Before cancelling your visa or leaving UAE permanently, settle all debts and get a \'No Liability Certificate\' from your bank.',
  },

  // ── UAE Legal Tips ─────────────────────────────────────────────────────────
  {
    id: 'visa-overstay',
    category: 'legal',
    categoryLabel: 'UAE Law',
    emoji: '⚠️',
    title: 'Visa overstay in UAE: AED 100/day after the first day',
    body: 'Overstaying a UAE visa costs AED 100 for the first day and AED 25 for every subsequent day, plus a flat AED 100 administrative fee. Airport immigration will collect this before departure. There is no grace period. Set a reminder 30 days before your visa expires to start renewal or exit planning.',
    cta: { label: 'Exit Planning Services', url: 'https://www.deliwer.com/exit-dubai' },
  },
  {
    id: 'no-alcohol-public',
    category: 'legal',
    categoryLabel: 'UAE Law',
    emoji: '🚫',
    title: 'Public intoxication in UAE is a criminal offence',
    body: 'While alcohol is legal in licensed venues in Dubai, being drunk in public spaces (streets, shopping malls, taxis) can result in arrest and fines up to AED 1,000. Never drink in a car (even as a passenger). Ramadan restrictions are stricter: no eating, drinking or smoking in public during daylight hours.',
  },
  {
    id: 'vpn-uae',
    category: 'legal',
    categoryLabel: 'UAE Law',
    emoji: '🔒',
    title: 'Using a VPN in UAE for illegal activity is a criminal offence',
    body: 'VPNs are not banned in UAE for general business use, but using them to access prohibited content or bypass laws is illegal and can result in fines up to AED 2 million. Government-regulated VoIP apps (Botim, C\'me) are licensed for voice calls. WhatsApp voice calls work but technically fall in a grey area.',
  },

  // ── Seasonal & Weather ─────────────────────────────────────────────────────
  {
    id: 'summer-heat',
    category: 'seasonal',
    categoryLabel: 'Seasonal Tips',
    emoji: '☀️',
    title: 'Dubai summer heat: 45°C+ can be fatal without precautions',
    body: 'June–September in Dubai brings extreme heat. Workers are legally protected from outdoor work 12:30pm–3:00pm. For residents: stay hydrated (3L+ water/day), avoid outdoor exercise between 10am–5pm, check on elderly neighbours, and watch for heat exhaustion signs (headache, dizziness, stopping sweating). Keep pets indoors.',
  },
  {
    id: 'sandstorm-prep',
    category: 'seasonal',
    categoryLabel: 'Seasonal Tips',
    emoji: '🌪️',
    title: 'Dubai sandstorm season: March–May — here\'s how to prepare',
    body: 'Shamal (sandstorm) season peaks March–May. During a sandstorm: close all windows immediately, drive with headlights on and pull over if visibility is under 100m, keep N95 masks at home, and clean A/C filters afterward. Check the NCM (UAE weather) app for alerts. Storms can last 6–24 hours.',
  },
  {
    id: 'flooding-rain',
    category: 'seasonal',
    categoryLabel: 'Seasonal Tips',
    emoji: '🌧️',
    title: 'UAE flash flooding can happen with just 30 minutes of rain',
    body: 'UAE\'s drainage infrastructure was not designed for heavy rain. When it rains heavily (rare but happens), underpasses flood within minutes, cars stall in water, and roads become impassable. If you see rain: avoid underpasses, don\'t enter flooded roads (30cm of water can float most cars), and monitor Dubai Police alerts.',
  },

  // ── Wellness ─────────────────────────────────────────────────────────────
  {
    id: 'expat-burnout',
    category: 'wellness',
    categoryLabel: 'Expat Wellness',
    emoji: '🧠',
    title: 'Expat burnout is real — recognize the signs early',
    body: 'Living far from family and in a high-pressure environment like Dubai leads to a specific type of burnout. Signs include: feeling disconnected from home and work, dreading weekends, irritability without cause, and losing interest in hobbies. Take it seriously. The Lighthouse Arabia (lighthousearabia.com) offers expat-focused counseling.',
  },
  {
    id: 'community-isolation',
    category: 'wellness',
    categoryLabel: 'Expat Wellness',
    emoji: '🤝',
    title: 'Social isolation is the #1 silent problem for Dubai expats',
    body: 'Many Dubai expats report feeling isolated despite being surrounded by people. Solution: join one community group within your first 60 days (Meetup.com, InterNations, your building community, a sports club). Social connection is the single strongest predictor of long-term wellbeing — prioritize it like you would your career.',
  },
];

// ── Email Template ─────────────────────────────────────────────────────────

function buildTipEmail(tip: Tip, firstName: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${tip.title}</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    
    <!-- Header -->
    <div style="text-align:center;padding:30px 0 20px;">
      <div style="font-size:32px;font-weight:900;letter-spacing:-1px;color:#ffffff;">DeliWer</div>
      <div style="font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#64748b;margin-top:4px;">Dubai Life Tips</div>
    </div>

    <!-- Category Badge -->
    <div style="text-align:center;margin-bottom:24px;">
      <span style="display:inline-block;padding:6px 16px;background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.4);border-radius:100px;color:#fbbf24;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">${tip.categoryLabel}</span>
    </div>

    <!-- Main Card -->
    <div style="background:#1e293b;border:1px solid #334155;border-radius:16px;overflow:hidden;">
      
      <!-- Emoji Header -->
      <div style="background:linear-gradient(135deg,#1e293b,#0f172a);padding:32px;text-align:center;border-bottom:1px solid #334155;">
        <div style="font-size:56px;margin-bottom:16px;">${tip.emoji}</div>
        <h1 style="color:#ffffff;font-size:22px;font-weight:800;line-height:1.3;margin:0;">${tip.title}</h1>
      </div>

      <!-- Body -->
      <div style="padding:32px;">
        <p style="color:#94a3b8;font-size:16px;line-height:1.7;margin:0 0 24px;">${tip.body}</p>

        ${tip.cta ? `
        <div style="text-align:center;margin-top:28px;">
          <a href="${tip.cta.url}" style="display:inline-block;background:#10b981;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:1px;text-transform:uppercase;padding:14px 32px;border-radius:12px;">${tip.cta.label} →</a>
        </div>
        ` : ''}
      </div>
    </div>

    <!-- Emergency Resources Box -->
    <div style="margin-top:20px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:20px;">
      <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#f87171;margin-bottom:12px;">🚨 Free Emergency Resources</div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="https://www.deliwer.com/emergency-exit" style="color:#fca5a5;font-size:13px;font-weight:600;text-decoration:none;">→ Register Exit Plan</a>
        <span style="color:#475569;">|</span>
        <a href="https://www.deliwer.com/wartime-readiness" style="color:#fca5a5;font-size:13px;font-weight:600;text-decoration:none;">→ Crisis Readiness Network</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:32px 0;text-align:center;">
      <p style="color:#334155;font-size:12px;margin:0 0 8px;">
        You're receiving this because you subscribed to DeliWer Dubai Tips.<br>
        <a href="https://www.deliwer.com/unsubscribe?token=__TOKEN__" style="color:#475569;text-decoration:underline;">Unsubscribe</a>
      </p>
      <p style="color:#1e293b;font-size:11px;margin:0;">DeliWer · Dubai Airport Freezone · Dubai, UAE</p>
    </div>
  </div>
</body>
</html>`;
}

function buildAlertEmail(alertLevel: string, message: string, firstName: string): string {
  const levelColors: Record<string, { bg: string; border: string; text: string }> = {
    NORMAL:  { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.4)', text: '#34d399' },
    AMBER:   { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.4)', text: '#fbbf24' },
    RED:     { bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.4)',  text: '#f87171' },
    BLACK:   { bg: 'rgba(161,2,2,0.2)',    border: 'rgba(239,68,68,0.6)', text: '#fca5a5' },
  };
  const c = levelColors[alertLevel] || levelColors.AMBER;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="text-align:center;padding:24px 0 16px;">
      <div style="font-size:28px;font-weight:900;letter-spacing:-1px;color:#ffffff;">DeliWer</div>
      <div style="font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#64748b;margin-top:2px;">Emergency Alert</div>
    </div>

    <div style="background:${c.bg};border:2px solid ${c.border};border-radius:16px;padding:32px;margin-bottom:20px;">
      <div style="text-align:center;margin-bottom:20px;">
        <span style="display:inline-block;padding:8px 20px;background:${c.bg};border:1px solid ${c.border};border-radius:100px;color:${c.text};font-size:13px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">⚠️ ALERT LEVEL: ${alertLevel}</span>
      </div>
      <p style="color:#e2e8f0;font-size:16px;line-height:1.7;margin:0 0 24px;text-align:center;">${message}</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <a href="https://www.deliwer.com/wartime-readiness" style="display:inline-block;background:#d97706;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:12px 24px;border-radius:10px;">Readiness Guide →</a>
        <a href="https://www.deliwer.com/emergency-exit" style="display:inline-block;background:#dc2626;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:12px 24px;border-radius:10px;">Exit Plan →</a>
      </div>
    </div>

    <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#64748b;margin-bottom:12px;">UAE Emergency Numbers</div>
      <div style="color:#94a3b8;font-size:14px;line-height:1.8;">
        🚨 Police / Emergency: <strong style="color:#fff;">999</strong><br>
        🏥 Ambulance: <strong style="color:#fff;">998</strong><br>
        🔥 Civil Defense: <strong style="color:#fff;">997</strong><br>
        📞 UAE Helpline: <strong style="color:#fff;">800 4673</strong>
      </div>
    </div>

    <div style="padding:24px 0;text-align:center;">
      <p style="color:#334155;font-size:12px;margin:0 0 6px;">
        DeliWer Emergency Alert System — UAE Subscribers Only<br>
        <a href="https://www.deliwer.com/unsubscribe?token=__TOKEN__" style="color:#475569;text-decoration:underline;">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ── Core Service Functions ─────────────────────────────────────────────────────

let lastTipIndex = -1;

export function getNextTip(): Tip {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % TIPS_LIBRARY.length;
  lastTipIndex = index;
  return TIPS_LIBRARY[index];
}

export function getTipById(id: string): Tip | undefined {
  return TIPS_LIBRARY.find(t => t.id === id);
}

async function getActiveSubscribers() {
  return db.select().from(emailSubscribers).where(eq(emailSubscribers.isActive, true));
}

export async function runDailyTipsBroadcast(overrideTipId?: string): Promise<{
  sent: number; failed: number; tipId: string; tipTitle: string; recipientCount: number;
}> {
  console.log('[TIPS] Starting daily tips broadcast');

  const tip = overrideTipId ? (getTipById(overrideTipId) ?? getNextTip()) : getNextTip();
  const subscribers = await getActiveSubscribers();

  if (subscribers.length === 0) {
    console.log('[TIPS] No active subscribers — skipping broadcast');
    return { sent: 0, failed: 0, tipId: tip.id, tipTitle: tip.title, recipientCount: 0 };
  }

  const subject = `${tip.emoji} ${tip.title}`;
  let sent = 0;
  let failed = 0;

  for (const sub of subscribers) {
    try {
      const html = buildTipEmail(tip, sub.firstName || 'there');
      await sendEmail({
        to: sub.email,
        from: FROM_EMAIL,
        subject,
        html,
      });
      sent++;
      if (sent % 50 === 0) console.log(`[TIPS] Sent ${sent}/${subscribers.length}`);
      // Rate limiting: 500ms between emails
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`[TIPS] Failed for ${sub.email}:`, err);
      failed++;
    }
  }

  // Log the send
  await db.insert(tipsSendLog).values({
    tipId: tip.id,
    tipTitle: tip.title,
    tipCategory: tip.category,
    recipientCount: subscribers.length,
    successCount: sent,
    failCount: failed,
    type: 'daily_tips',
    subject,
  });

  console.log(`[TIPS] Broadcast complete: ${sent} sent, ${failed} failed`);
  return { sent, failed, tipId: tip.id, tipTitle: tip.title, recipientCount: subscribers.length };
}

export async function sendEmergencyAlert(
  alertLevel: 'NORMAL' | 'AMBER' | 'RED' | 'BLACK',
  message: string
): Promise<{ sent: number; failed: number; recipientCount: number }> {
  console.log(`[ALERT] Sending ${alertLevel} alert to all subscribers`);

  const subscribers = await getActiveSubscribers();
  if (subscribers.length === 0) {
    console.log('[ALERT] No active subscribers');
    return { sent: 0, failed: 0, recipientCount: 0 };
  }

  const levelSubjects: Record<string, string> = {
    NORMAL: '✅ UAE Status Update — All Clear',
    AMBER:  '⚠️ UAE Alert: Heightened Caution Advisory',
    RED:    '🚨 UAE RED ALERT: Immediate Action Required',
    BLACK:  '🆘 UAE EMERGENCY: Execute Your Exit Plan Now',
  };
  const subject = levelSubjects[alertLevel] || `🚨 UAE Emergency Alert — ${alertLevel}`;
  let sent = 0;
  let failed = 0;

  for (const sub of subscribers) {
    try {
      const html = buildAlertEmail(alertLevel, message, sub.firstName || 'Resident');
      await sendEmail({ to: sub.email, from: FROM_EMAIL, subject, html });
      sent++;
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.error(`[ALERT] Failed for ${sub.email}:`, err);
      failed++;
    }
  }

  await db.insert(tipsSendLog).values({
    tipId: `alert-${alertLevel.toLowerCase()}-${Date.now()}`,
    tipTitle: subject,
    tipCategory: 'emergency_alert',
    recipientCount: subscribers.length,
    successCount: sent,
    failCount: failed,
    type: 'emergency_alert',
    subject,
  });

  console.log(`[ALERT] Alert sent: ${sent} delivered, ${failed} failed`);
  return { sent, failed, recipientCount: subscribers.length };
}

export async function getSubscriberStats() {
  const [{ total }] = await db.select({ total: sql<number>`count(*)` }).from(emailSubscribers);
  const [{ active }] = await db.select({ active: sql<number>`count(*)` }).from(emailSubscribers).where(eq(emailSubscribers.isActive, true));
  const recentLogs = await db.select().from(tipsSendLog).orderBy(sql`sent_at desc`).limit(10);
  return { total: Number(total), active: Number(active), recentLogs };
}
