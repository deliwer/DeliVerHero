# DeliWer — Dubai move-in/move-out concierge platform (WhatsApp-first)

## Run & Operate
- **Dev:** `npm run dev` (tsx + Vite HMR on port 5000)
- **Build:** `npm run build` → `node dist/index.js`
- **DB push:** `npm run db:push`
- **Required env vars:** `DATABASE_URL` (auto-injected by Replit PostgreSQL)
- **Optional secrets (add via Secrets tab for full functionality):**
  - `OPENAI_API_KEY` — AI concierge chat and social discovery
  - `SENDGRID_API_KEY` — Email campaigns and broker recruitment
  - `STRIPE_SECRET_KEY` — Stripe payments
  - `PAYPAL_CLIENT_ID` + `PAYPAL_CLIENT_SECRET` — PayPal payments
  - `WHATSAPP_TOKEN` + `WHATSAPP_PHONE_NUMBER_ID` — WhatsApp notifications
- All integrations degrade gracefully when keys are absent (demo/simulation mode)

## Stack
- **Frontend:** React 18, Vite, Tailwind CSS, Radix UI / Shadcn, Framer Motion, Wouter routing
- **Backend:** Express (Node.js 20) served via tsx in dev, esbuild bundle in prod
- **DB:** Drizzle ORM + PostgreSQL 16 (Replit-managed)
- **Runtime:** Node.js 20, PostgreSQL 16

## Where things live
- `server/index.ts` — Express entry point + cron scheduler
- `server/routes.ts` — All main API routes (~5 k lines)
- `server/routes/` — Sub-routers (admin, wellness, habtoor, memberships, etc.)
- `server/services/` — WhatsApp agent, broker automation, tips broadcast, etc.
- `client/src/` — React SPA (`App.tsx` = router, `pages/` = page components)
- `shared/schema.ts` — Drizzle schema (source of truth for DB tables)
- `vite.config.ts` — Vite config (root=`client/`, aliases `@`, `@shared`, `@assets`)

## Architecture decisions
- Single Express server serves both API and SPA (Vite middleware in dev, static in prod)
- Auth is custom session-based (email/password via `/api/auth/*`) stored in localStorage; no external auth provider
- `client/src/lib/firebase.ts` is a local simulation stub — no real Firebase dependency
- All third-party integrations (OpenAI, Stripe, SendGrid, PayPal, WhatsApp) check for env vars at startup and disable gracefully if absent
- Habtoor inventory API masks `hpvUnit` field on every response to prevent data leaks

## Product
- Move-in concierge: Ejari, DEWA, movers, cleaning, water filter bundled
- Broker recruitment automation (RERA API fetch + email follow-up sequences)
- Partner/affiliate system with referral tracking (`?ref=code`)
- Al Habtoor Polo lead claiming system (NDA-gated, anti-poaching)
- Wellness passport, vouchers, memberships, Dubai Marathon features
- WhatsApp-first conversion funnel across all pages

## User preferences
- Do NOT re-attempt Replit OAuth connector without user confirmation
- Do not modify `/marketing/legacy` folder
- Do not modify `affiliate-management.tsx` or `MarketingDashboard.tsx`
- Use `write()` for full rewrites of key pages (`landing.tsx`, `ResidentsPage.tsx`, `Navigation.tsx`)
- No AQARI or Injaz references — use "authorized RERA Appointed Trustee Centers" only
- Stripe key: ask user to add `STRIPE_SECRET_KEY` directly as a secret

## Gotchas
- Port 5000 is the only exposed port; all traffic routes through it (API + SPA)
- `path` is imported twice in `server/routes.ts` (both `import fs from "fs"` area and later `import * as path`) — works but worth noting
- `SESSION_SECRET` secret is set; `connect-pg-simple` used for session storage
- `ADMIN_PASSWORD` defaults to `"deliwer2024"` if not set; `ADMIN_SECRET` defaults to `"deliwer-admin-2026"`
- Cron jobs start immediately on server boot (WhatsApp, tips broadcast, broker follow-ups)
