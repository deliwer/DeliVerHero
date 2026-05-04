# DeliWer.com Project Context

## Overview
DeliWer.com is a Dubai-based move-in/move-out/relocation concierge platform. Its core purpose is to streamline the relocation process in Dubai, with a key differentiator being Ejari registration support through authorized RERA Trustee Centers, positioning DeliWer as a "home operator." The platform primarily uses a WhatsApp-first conversion funnel.

**Key Services:**
- Ejari registration and support.
- Comprehensive move-in bundles (movers, Ejari, DEWA, water filter).
- Move-out support (utility closure, deposit protection).
- Ongoing resident services and Ejari renewals.

**Business Vision & Market Potential:**
DeliWer aims to solve the operational complexities of moving in Dubai, offering a neutral transaction support layer rather than acting as a broker or listing platform. It monetizes by embedding a coordination fee within vendor contracts, ensuring tenants pay market rates. The platform is expanding into relocation intelligence tools and automated broker recruitment to capture a broader market share and enhance operational efficiency.

## User Preferences
- User dismissed the Replit OAuth connector — do NOT attempt again without user confirmation. If needed in future, ask user to provide `STRIPE_SECRET_KEY` directly as a secret instead.
- Do not make changes to the folder `/marketing/legacy`.
- Do not make changes to the files `affiliate-management.tsx` and `MarketingDashboard.tsx`.
- Use `write()` for full rewrites of key pages (`landing.tsx`, `ResidentsPage.tsx`, `Navigation.tsx`) to avoid verbatim match errors.
- No AQARI or Injaz references; use "authorized RERA Appointed Trustee Centers" only.

## System Architecture

**UI/UX Design:**
- **Theme:** Dark-centric with `emerald-500` as the primary brand color.
- **Typography:** Heavy emphasis on uppercase, bold text.
- **Visual Style:** "Dubai Living" aesthetic.
- **Navigation:** Fixed top navigation with a trust strip immediately below. Pages require appropriate top padding (`pt-48` or `pt-32`) to accommodate.
- **Conversion Funnel:** WhatsApp-first approach, with all CTAs linking to `wa.me/971523946311`.

**Technical Implementations & Features:**

1.  **Marketing Command Center (`/marketing`):**
    *   Static site for marketing, lead capture, and partner management.
    *   Uses `localStorage` and URL parameters for tracking.
    *   Integrates with Google Sheets (via Apps Script webhook) for lead storage; includes demo data fallback.
    *   Features a partner dashboard, leaderboard, partner onboarding, and founder command center.

2.  **Affiliate & Partner System:**
    *   **Database Schema:** `affiliates` and `affiliateLeads` tables.
    *   **Backend Routes:** API endpoints for tracking and dashboard access.
    *   **Frontend Pages:** Unified career funnel (`/partners`), attribution explanation (`/partner-program`), broker-focused pages (`/brokers`), and various partner resources/dashboards.
    *   **Referral Tracking:** `?ref=code` captured globally and stored locally, attached to WhatsApp messages.
    *   **Kangen/Enagic Alliance:** Dedicated support and commission structure.

3.  **Relocation Intelligence Platform:**
    *   A suite of static, JavaScript-powered tools and guides for relocation decisions.
    *   Includes calculators (move vs. renew, rent increase), rent comparison tools, moving trends, and personalized move scoring.
    *   All pages are static, WhatsApp-first, and referral-aware.

4.  **Broker Recruitment Automation Engine:**
    *   **Purpose:** Autonomous, cron-based system for recruiting UAE brokers.
    *   **Architecture:** `broker_master` table (tracking broker lifecycle) and `broker_automation_log` table (logging automation runs).
    *   **Services:** Broker fetching from Dubai Land Dept (RERA) API, automated email follow-up sequences, and an orchestrator service.
    *   **Cron Schedule:** Daily RERA fetch and new broker emails; 6-hourly follow-ups.
    *   **API Routes:** Endpoints for status, manual triggers, broker list management, and logging.
    *   **Frontend (`/marketing/recruit`):** Panels for automation status, manual triggers, broker database view, and legacy campaign seeding.
    *   **Email Campaigns:** Anti-spam measures (delays, daily limits, deduplication). Requires `SENDGRID_API_KEY`.

5.  **Capella Properties Collaboration & Transaction Support Layer:**
    *   **Positioning:** DeliWer acts as a neutral transaction support layer.
    *   **New Page (`/transaction-support`):** Explains DeliWer's role in the post-agreement phase, featuring a soft mention of Capella Properties (without direct integration or lead passing).
    *   **Updated (`/broker-partner`):** Reframed messaging to emphasize client experience enhancement rather than lead generation for brokers.

6.  **Social Handle Discovery & Community Outreach Agent:**
    *   **Purpose:** AI-powered social discovery and personalized outreach for brokers.
    *   **Schema Changes:** `broker_master` table extended with social handle fields and discovery status.
    *   **Services:** AI agent (`GPT-4o-mini`) for inferring social handles from broker data; a community outreach service for generating personalized messages for various platforms and direct messages.
    *   **API Routes:** Endpoints for discovery status, triggering discovery, updating broker social data, generating direct messages, and community message generation.
    *   **Frontend (`/marketing/social`):** Four tabs for managing the discovery agent, viewing social handles, engaging with communities, and GMB/outreach playbooks.
    *   **Requirements:** Requires `OPENAI_API_KEY` for AI inference.

**Core Technology Stack:**
- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Lucide Icons, Shadcn UI components.
- **Routing:** `wouter` for client-side routing.
- **Backend:** Express (Node.js), serving on port 5000.

## External Dependencies

-   **Stripe:** Payment gateway (API integration details need user confirmation for direct secret key).
-   **PayPal:** Payment gateway (SDK integration has credential issues; direct email link `formatix@deliwer.com` is a fallback).
-   **Google Sheets:** Used via Apps Script webhooks for lead storage in the Marketing Command Center.
-   **SendGrid:** Email API for broker recruitment automation (requires `SENDGRID_API_KEY`).
-   **OpenAI:** AI services (GPT-4o-mini) for social handle discovery and personalized outreach (requires `OPENAI_API_KEY`).
-   **Dubai Land Department (RERA) API:** Source for broker list data in the recruitment engine.