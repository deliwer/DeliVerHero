# DeliWer.com Project Context

## Overview
DeliWer.com is a Dubai move-in/move-out/relocation concierge platform with a WhatsApp-first conversion funnel. 
Ejari registration (via authorized RERA Trustee Centers) is the pivotal differentiator, positioning DeliWer as a **home operator** — not just a broker or contractor.

## Key Services
- **Ejari Support**: Foundational service (Pivotal).
- **Move-In Concierge**: Flagship package (AED 399).
- **Move-Out Support**: Utility closure & deposit protection (AED 249).
- **Resident Services**: Ongoing home optimization & Ejari renewals.

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

## Maintenance Notes
- Use `write()` for full rewrites of key pages (`landing.tsx`, `ResidentsPage.tsx`, `Navigation.tsx`) to avoid verbatim match errors.
- Navigation component is `fixed top-0 z-[100]`. Pages need appropriate top padding (`pt-48` or `pt-32`).
- No AQARI or Injaz references; use "authorized RERA Appointed Trustee Centers" only.
