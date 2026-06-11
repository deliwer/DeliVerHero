---
name: BNOS Module
description: Broker Network Operating System — additive marketing module, architecture constraints, and integration points.
---

## Location
- Routes: `/marketing/bnos`, `/marketing/candidates`, `/marketing/zoom-onboarding`, `/marketing/finance-crm`, `/marketing/templates`, `/marketing/whatsapp-gen`, `/marketing/commission`
- Backend: `server/routes/bnos.ts` mounted at `/api/bnos`
- DB tables: `partner_candidates`, `zoom_sessions`, `finance_referrals`, `bnos_templates`, `commission_config`

## Key constraints
- No SendGrid, no Twilio, no WhatsApp API, no OpenAI in BNOS
- WhatsApp = prefilled `wa.me` links only (user must press Send manually)
- Recruitment WA: +971523946311 · Finance activation WA: +971523906019
- ADDITIVE ONLY — do not touch MarketingDashboard.tsx, affiliate-management.tsx, /marketing/legacy

**Why:** Previous agent's marketing page changes caused a rollback; BNOS was scoped as additive-only to avoid breaking existing pages.

**How to apply:** Any new BNOS feature must only add new files/routes/DB tables, never modify existing marketing pages.
