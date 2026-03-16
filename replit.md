# DeliWer.com Project Context

## Overview
DeliWer.com is a Dubai move-in/move-out/relocation concierge platform with a WhatsApp-first conversion funnel. 
Ejari registration (via authorized RERA Trustee Centers) is the pivotal differentiator, positioning DeliWer as a **home operator** — not just a broker or contractor.

## Key Services
- **Ejari Support**: Foundational service (Pivotal).
- **Starter Move-In Bundle**: Movers + Ejari + DEWA + Water filter, AED 3,250–4,500 by unit size.
- **Move-Out Support**: Utility closure & deposit protection.
- **Resident Services**: Ongoing home optimization & Ejari renewals.

## Business Model (Revenue)
- Tenants always pay only vendor market rates — DeliWer's 12% coordination fee is embedded in vendor contracts.
- Affiliates/partners earn 30% of DeliWer's embedded coordination fee (shown only in affiliate/partner dashboards, never tenant-facing).
- Bundle cost by unit: Studio AED 3,250 · 1BR AED 3,600 · 2BR AED 4,000 · 3BR/Villa AED 4,500.

## Affiliate & Partner System
- Schema: `affiliates` + `affiliateLeads` tables in `shared/schema.ts`.
- Backend routes: `/api/affiliate/track` (POST), `/api/affiliate/dashboard/:code` (GET) in `server/routes.ts`.
- Frontend pages:
  - `/affiliate-dashboard` — affiliate earnings view.
  - `/partners` — main partner overview page (headline: "Partner With DeliWer").
  - `/partners/join` — signup form with auto-generated referral link.
  - `/partners/how-it-works` — 4-step process page.
  - `/partners/earnings` — earnings table with commission tiers by partner type.
  - `/partners/resources` — copy-paste WhatsApp/email/social templates.
- Shared component: `client/src/components/partner-subnav.tsx` — sticky tab nav for all partner sub-pages.
- Referral tracking: `?ref=code` → `sessionStorage.deliwer_ref` → fires POST to `/api/affiliate/track`.

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

## Maintenance Notes
- Use `write()` for full rewrites of key pages (`landing.tsx`, `ResidentsPage.tsx`, `Navigation.tsx`) to avoid verbatim match errors.
- Navigation component is `fixed top-0 z-[100]`. Pages need appropriate top padding (`pt-48` or `pt-32`).
- No AQARI or Injaz references; use "authorized RERA Appointed Trustee Centers" only.
