# DeliWer.com Project Context

## Overview
DeliWer.com is a Dubai move-in/move-out/relocation concierge platform with a WhatsApp-first conversion funnel. 
Ejari registration (via authorized RERA Trustee Centers) is the pivotal differentiator, positioning DeliWer as a **home operator** — not just a broker or contractor.

## Key Services
- **Ejari Support**: Foundational service (Pivotal).
- **Starter Move-In Bundle**: Movers + Ejari + DEWA + Water filter, AED 3,250–4,500 by unit size.
- **Move-Out Support**: Utility closure & deposit protection.
- **Resident Services**: Ongoing home optimization & Ejari renewals.

## Payment Integration Notes
- **Stripe connector**: User dismissed the Replit OAuth connector — do NOT attempt again without user confirmation. If needed in future, ask user to provide `STRIPE_SECRET_KEY` directly as a secret instead.
- **PayPal SDK**: `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` are set but return `invalid_client` 401 from PayPal sandbox — credentials likely incorrect or belong to wrong environment (sandbox vs live).
- **Payment CTA**: `payment-cta.tsx` uses a direct PayPal email link (`formatix@deliwer.com`) — this works independently of any SDK.
- **Current status**: No in-app checkout is functional. Business uses WhatsApp-first payment coordination as primary flow.

## Business Model (Revenue)
- Tenants always pay only vendor market rates — DeliWer's 12% coordination fee is embedded in vendor contracts.
- Affiliates/partners earn 30% of DeliWer's embedded coordination fee (shown only in affiliate/partner dashboards, never tenant-facing).
- Bundle cost by unit: Studio AED 3,250 · 1BR AED 3,600 · 2BR AED 4,000 · 3BR/Villa AED 4,500.

## Marketing Command Center (`/marketing`)
Static marketing hub with no backend/database dependency. Uses localStorage + URL params for tracking, Google Sheets (via Apps Script webhook) for lead storage, and demo data fallback when sheet is unconfigured.
- `/marketing` — Hub: lead capture form, WhatsApp CTA, quick-action tiles
- `/marketing/dashboard` — Partner dashboard: enter partner name, view filtered leads/earnings, copy referral link
- `/marketing/leaderboard` — Weekly/monthly/all-time partner rankings with podium
- `/marketing/partners` — Partner onboarding: generate unique referral link, commission tiers (15/25/35%)
- `/marketing/control` — Founder command center: KPIs, revenue breakdown, lead table, partner analytics
- Tracking lib: `client/src/lib/marketing-tracker.ts` — `initTracker()`, `getTracking()`, `submitLead()`, `fetchSheetData()`
- To connect Google Sheets: replace `GOOGLE_SHEET_WEBHOOK_URL` and `GOOGLE_SHEET_JSON_URL` in `marketing-tracker.ts`
- `/marketing/legacy` — Legacy reference index (all previous marketing pages, fully intact, no modifications)
- `/marketing/legacy/affiliate-management` → `affiliate-management.tsx` (original affiliate command center)
- `/marketing/legacy/founder-dashboard` → `MarketingDashboard.tsx` (original founder dashboard)
- `/affiliate-dashboard` and `/planet-hero-affiliates` retain their existing routes (linked from legacy index)

## Affiliate & Partner System
- Schema: `affiliates` + `affiliateLeads` tables in `shared/schema.ts`.
- Backend routes: `/api/affiliate/track` (POST), `/api/affiliate/dashboard/:code` (GET) in `server/routes.ts`.
- Frontend pages:
  - `/affiliate-dashboard` — affiliate earnings view.
  - `/partners` — main partner overview with 4-tier commission structure (35% / 20–25% / 10–15% / 5–10%).
  - `/partners/join` — signup form with auto-generated referral link.
  - `/partners/how-it-works` — 4-step process page.
  - `/partners/earnings` — earnings table with commission tiers by partner type.
  - `/partners/resources` — copy-paste WhatsApp/email/social templates.
  - `/partner-dashboard` — self-serve dashboard: enter referral code, view leads/earnings/status/top pages.
  - `/partner-growth-kit` — WhatsApp scripts (6 scenarios), pre-built landing page links, quick reference guide.
  - `/broker-partner` — dedicated page for real estate brokers.
  - `/building-partner` — dedicated page for building security/concierge teams.
  - `/typing-center-partner` — dedicated page for Ejari typing centers.
- Shared component: `client/src/components/partner-subnav.tsx` — sticky tab nav for all partner sub-pages.
- Referral tracking: `?ref=code` captured globally in App.tsx → stored in localStorage/sessionStorage via `client/src/lib/referral.ts` → attached to every WhatsApp message.
- Marketing Command Center (`/marketing/dashboard`) Affiliates tab shows: top 6 partners by revenue, channel breakdown by tier, summary stats, links to partner tools.

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, Framer Motion, Lucide Icons, Shadcn UI components.
- Routing: `wouter` for SPA routing.
- Backend: Express (serving on port 5000).

## Design System
- Theme: Dark-centric with `emerald-500` as the primary brand color.
- UI: Heavy emphasis on uppercase, bold typography, and "Dubai Living" visual style.
- Funnel: WhatsApp-first (CTAs link to `wa.me/971523946311`).

## Recent Refactors
- **Navigation**: Fixed top nav with a trust strip immediately below.
- **Funnel Optimization**: Residents page updated to prioritize Move-In 399 and Ejari 199 cards.
- **Home Router**: Landing page updated with a 4-card "Dubai Home Operating System" block.
- **Operator Differentiator**: Emphasized DeliWer as an "Operator" vs brokers or contractors.
- **`/start` page rewrite**: Removed AED 399 / AquaCafe pricing. Now shows new uniform pricing model (AED 3,250–4,500 vendor costs), psychological comparison block (DIY vs DeliWer), apartment-type cost estimator (Studio–3BR), "What DeliWer Coordinates" service grid, and updated WhatsApp CTAs with pre-filled messages including apartment type and referral code.
- **`/move-in-plan` page (new)**: Move-in planning form — date, apartment type, area, service toggles (movers/Ejari/DEWA). On submit shows a personalised step-by-step plan and cost range with WhatsApp "Start Coordination" CTA.

## Relocation Intelligence Platform (Added March 2026)
Homepage headline updated to "Everything After Ejari — Handled." with 5 primary CTA buttons and 4 scenario cards.

New pages added:
- `/move-dubai` — Relocation Decision Hub with 4 scenarios + intelligence tool links
- `/move-vs-renew-dubai` — Move vs Renew Calculator (no DB, pure JS)
- `/rent-increase-calculator-dubai` — RERA rent increase cap calculator
- `/are-you-overpaying-rent-dubai` — Rental overpayment detector (market rate comparison)
- `/dubai-rent-comparison` — Visual rent comparison across 14 Dubai areas
- `/dubai-moving-trends` — Moving trend insights and migration routes
- `/dubai-move-score` — 5-factor personalised move score tool
- `/dubai-rent-increase-rules` — SEO guide: RERA rent increase rules + FAQ
- `/tenancy-renewal-dubai-guide` — SEO guide: tenancy renewal process + checklist + FAQ

URL aliases (redirects):
- `/leave-dubai` → `/exit-dubai`
- `/move-cheaper-rent-dubai` → `/move-cheaper-rent`
- `/moving-apartment-dubai` → `/moving-apartment-dubai-guide`

All pages are static (no DB required), WhatsApp-first, referral-aware.

## Broker Recruitment Automation Engine (Added March 2026)

### Overview
An autonomous, cron-based broker recruitment system at `/marketing/recruit` that continuously fetches UAE brokers, sends onboarding emails, and runs follow-up sequences without manual intervention.

### Architecture
- **Broker Master Table** (`broker_master`): Central lifecycle DB tracking every broker. Statuses: `new → sent → followed_up → converted`.
- **Automation Log Table** (`broker_automation_log`): Records every run (daily, followup, manual) with stats.

### Services
- `server/services/broker-fetch-service.ts` — Attempts to pull broker list from Dubai Land Dept (RERA) API. Parses JSON or XLSX response. Falls back gracefully.
- `server/services/broker-followup-service.ts` — Follow-up engine: FU#1 at 2-day silence, FU#2 at 5-day silence. Each with distinct email copy.
- `server/services/broker-automation.ts` — Orchestrator: daily cycle (fetch + email new) + follow-up cycle. Also exposes `getAutomationStatus()`.

### Cron Schedule (server/index.ts)
- **Every 24h**: `runDailyAutomation()` — fetches RERA, detects new brokers, emails up to 300/day
- **Every 6h**: `runFollowUpAutomation()` — sends FU#1 (2-day) and FU#2 (5-day) follow-ups
- **On startup (30s delay)**: Initial follow-up pass

### API Routes
- `GET /api/marketing/automation/status` — Live stats + recent logs
- `POST /api/marketing/broker-fetch` — Manual RERA trigger
- `POST /api/marketing/broker-followup/run` — Manual follow-up trigger
- `GET /api/marketing/broker-master` — Paginated broker list
- `POST /api/marketing/broker-master/seed` — Sync past campaigns into master
- `GET /api/marketing/automation/logs` — Recent run logs

### Frontend (`/marketing/recruit`)
- **Automation Engine panel**: Live stats (total, new today, sent, followed-up, converted)
- **RERA Auto-Fetch card**: One-click fetch from Dubai Land Dept
- **Follow-up Engine card**: Manual trigger + last run time
- **Broker Master DB card**: View/paginate all tracked brokers, seed from past campaigns
- **Manual Campaign section**: Preserved existing XLSX upload → campaign launch flow

### Email Campaigns (anti-spam built in)
- 1.5s delay between sends
- Max 300 emails/day
- Dedup by email address (global across all campaigns)
- Requires `SENDGRID_API_KEY` env var (runs in demo mode without it)

## Maintenance Notes
- Use `write()` for full rewrites of key pages (`landing.tsx`, `ResidentsPage.tsx`, `Navigation.tsx`) to avoid verbatim match errors.
- Navigation component is `fixed top-0 z-[100]`. Pages need appropriate top padding (`pt-48` or `pt-32`).
- No AQARI or Injaz references; use "authorized RERA Appointed Trustee Centers" only.
