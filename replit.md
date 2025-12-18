# DeliWer Full-Stack Application - Replit Setup

## Overview
DeliWer is a full-stack JavaScript application leveraging React, Express.js, and various integrations for e-commerce, AI, and rewards. It provides a comprehensive platform for sustainable living, including a climate activism initiative ("Pakistan Planet Hero Mission") and a B2B platform for wholesale phone inventory ("ChainTrack"). The project emphasizes responsive design, gamification, and a user-friendly experience, with a focus on specific regional markets like Dubai and Pakistan.

### DeliWer Relocate (December 2025)
New Dubai-based relocation and investment gateway connecting global founders, investors, and families to trusted, licensed partners for immigration, business setup, real estate, and capital deployment in the UAE.

**Routes Added:**
- `/relocate` - Gateway page for Dubai relocation services
- `/relocate-community` - Membership portal with tiered access (Relocate Circle / Inner Ring)

**AquaCafe Loyalty Journey**: The application features a streamlined 3-step "How it Works" onboarding funnel that emphasizes membership benefits early in the user journey. The Hero section immediately leads into membership perks, followed by a simplified Shop → Sell → Play flow designed to maximize conversion and user engagement.

## Recent Changes (December 2025)

### Page Enhancements & SendGrid Setup (December 18, 2025)
- **Home Service Page Hero**: Changed header from "Pure Water. Healthy Living." to "Freedom LifeStyle. Healthy Living."
- **Errand Page Enhancement**: Added full-width hero banner with lifestyle background image (errandRunnerImg) and dark gradient overlay
- **Launch Page Sharing**: Integrated SocialSharingWidget component for multi-platform social sharing on /home-service-launch
- **SendGrid Integration**: Set up SendGrid connector for cold outreach emails and customer service inquiries
  - Primary account: service@deliwer.com
  - To activate: User must complete SendGrid integration setup via Replit's integration modal
  - Note: Integration was dismissed by user - alternative approach: Store SendGrid API key as secret and use `@sendgrid/mail` directly in backend

## Previous Changes (December 2025)

### Home Service Page Enhancement (December 17, 2025)
- **Trade-In Service Section**:
  - Added prominent Trade-In service section linking to `/exchange` page
  - Includes AI-powered device valuation, free home pickup, eco-certified recycling
  - +20% bonus value promotion for store credit option
- **SEO-Aligned Sustainable Services**:
  - Solar Panel Installation section (DEWA Shams Dubai eligible)
  - EV Charging Station installation section
  - Eco-Friendly Cleaning service section
- **Real-Life Stock Images**:
  - Replaced gradient placeholders with professional stock photos
  - Dark gradient overlays with visible text for high contrast
  - Images: water filtration, trade-in, solar panels, EV charging, eco-cleaning, errand runner
- **Referral & Sharing Tools**:
  - Integrated SocialSharingWidget for multi-platform sharing
  - Referral code system with copy-to-clipboard functionality
  - AED 100 credit + Planet Points incentive for referrals
- **SEO Meta Tags**:
  - Added Helmet for dynamic meta tags
  - Keywords: sustainable home services Dubai, water filtration, solar panels, EV charging, eco-cleaning

### Calendly Integration & Navigation Update (December 17, 2025)
- **Navigation Restructuring**:
  - Reordered navigation: Home Service → Eco-Living → Play (Home Service now first for conversion priority)
  - Consistent desktop/mobile treatment maintained
- **Calendly Popup Integration**:
  - Created reusable `CalendlyButton` component using Calendly widget script
  - Integrated with admin@deliwer.com account (https://calendly.com/admin-deliwer)
  - Updated booking CTAs across: housing, home-service, investor-dashboard, hero-challenge-landing
  - All "Book Consultation", "Book Viewing", "Schedule Call" buttons now open Calendly popup

### UX Optimization & Conversion Path Hardening (December 17, 2025)
- **Navigation Restructuring**:
  - Reordered navigation: Play → Eco-Living → Home Service (grouped together for logical flow)
  - Renamed "Housing" to "Eco-Living" with leaf icon
  - Consistent desktop/mobile treatment maintained
- **Context Tips Removal**:
  - Removed tooltip hints from home page for cleaner UX
  - Tooltips now only appear on specific feature pages (/aquacafe, /earn, /products)
- **Relocate Page Service Routing**:
  - Added service query parameter handling (?service=smart-home or ?service=home-service)
  - Auto-scrolls to booking form when service parameter is present
  - Pre-fills consultation message based on selected service
- **Loyalty Section Repositioning**:
  - Moved MembershipBenefitsSection after the 3-step flow for better engagement timing
  - Users complete Shop → Sell → Create Impact before seeing membership benefits
- **Design Pattern**: Advisory-first conversion (no payment modals, all CTAs lead to consultation booking)

### Customer Journey Streamlining & Conversion Hardening (December 16, 2025)
- **Navigation Restructuring**:
  - Removed AquaCafe and Trade-in from main menu
  - Added Home Service (sparkle icon), Eco-Living (leaf icon), Relocate (globe icon)
  - Consistent desktop/mobile treatment for new menu items
- **Eco-Living Page** (`/housing` → now `/eco-living`):
  - Rent, Buy, Invest cards with icons
  - Hero CTA "Discuss Housing Options" routes to /relocate
  - Advisory-first approach with no payment prompts
- **Home Service Page Enhanced**:
  - "Book a Free Expert Consultation" primary CTA
  - "Speak to an Advisor" secondary CTA
  - Both CTAs route to /relocate booking flow
- **Homepage Hero Updated**:
  - Primary CTA "Get Home Service" routes to /home-service
  - Max 3-step path to booking from any entry point

### Production Launch Flow Optimization (December 16, 2025)
- **Journey Sequence**: Implemented Play → Earn → Leaderboard → Home Service → Relocate → Partners flow
- **New Components Added**:
  - `AIInteractiveHero` updated with "Shop smart. Live sustainably. Belong globally." messaging
  - `HomeServiceSection` combining AquaCafe water solutions + iPhone trade-in
  - `LeaderboardSocialProof` with community stats (12,500+ members, 200+ nationalities)
- **New Routes**:
  - `/home-service` - Unified service page with relocation bridge CTA
- **Relocate Page Enhanced**:
  - Partners section revealed at bottom (Trust Expansion phase)
  - Primary CTA: "Book a Private Relocation Conversation"
  - Secondary CTA: Community membership options
- **CTA Rules Applied**: Max 2 CTAs per section, warm traffic routes to /relocate

### Homepage Flow Structure
```
PHASE 1: PLAY (Attraction)
  └── AIInteractiveHero
      ↓
PHASE 2: EARN (Participation)  
  ├── HeroChallengeLanding (Planet Points Challenge)
  ├── RewardComparison (DXBs)
  └── TradeInBanner
      ↓
PHASE 3: LEADERBOARD (Belonging)
  └── LeaderboardSocialProof
      ↓
PHASE 4: HOME SERVICE
  └── HomeServiceSection
      ↓
[Trust Building: Sustainability, Testimonials, Trust Elements]
      ↓
PHASE 5: RELOCATE (Monetization)
  └── Conversion bridge → /relocate
      ↓
PHASE 6: PARTNERS (Trust Expansion - on /relocate page)
  └── Partner Ecosystem reveal
```

## Previous Changes (November 2025)

### Commerce Enhancement: Water Filtration Campaign & Feature Flags (November 14, 2025)
- **Schema additions**: Added 4 new tables to support water filtration partnership and safe incremental deployment:
  - `water_filtration_projects`: Filter kits/products for Dubai Municipality partnership campaign
  - `water_filtration_contributions`: Purchases/donations tracking with PayPal/Stripe integration
  - `partner_verifications`: Dubai Municipality verification workflow for installations
  - `feature_flags`: Safe rollout system with percentage-based deployment and user whitelisting
- **DXB integration**: Water filtration purchases award DXBs (Dubai Carbon Tokens) to contributors
- **Certificate issuance**: Automated impact certificates for verified contributions
- **Payment tracking**: Full Stripe and PayPal transaction recording with status workflows
- **Deployment safety**: Feature flags allow incremental rollout without code changes

### UI Restructuring: 4-Step → 3-Step Flow
- **Migration completed**: Successfully migrated from Replit Agent environment to standard Replit
- **Flow simplification**: Reduced "How it Works" from 4 steps to 3 steps for clearer user journey
- **Component removal**: Eliminated `StepThreeRewards` component (263 lines) - "Claim FREE BONUS" step no longer part of sequential flow
- **Early membership focus**: Repositioned `MembershipBenefitsSection` directly under Hero section to highlight value proposition upfront
- **Visibility fix**: Removed broken `isExpanded` gating logic in Step 3 - content now always visible like other steps

### Technical Implementation
- Updated `ProgressIndicator` component to support 3 steps (1|2|3)
- Renumbered all step anchors: `data-section="step-1"`, `step-2`, `step-3`
- Updated scroll behavior and CTA button targets to new anchor system
- All components tested and verified working on port 5000

## User Preferences
Not specified.

## System Architecture
The application features a React + TypeScript frontend with Vite, an Express.js backend with TypeScript, and uses Tailwind CSS + Radix UI for the UI. Data fetching is managed with React Query, and Wouter handles frontend routing. The database is configured for PostgreSQL with Drizzle ORM. The system supports subpath deployments and includes a comprehensive security model for the ChainTrack B2B platform, protecting trade secrets and implementing role-based access control with manual verification for B2B buyers. The UI/UX prioritizes conversion optimization, visual engagement through collapsible sections, consistent iconography, and strategic placement of CTAs and social proof elements. Key design decisions include context-aware routing, a dual fee model for B2B transactions, and a multi-tiered membership structure.

### Commerce & Impact Model
- **DXB (Dubai Carbon Tokens)**: Unified currency system replacing Planet Points and Stars
  - 1 Planet Point = 1 DXB
  - $1 USD in Stars = 100 DXBs
  - Used for trade-in conversions, water filtration purchases, and rewards redemption
- **Water Filtration Campaign**: Dubai Municipality partnership for community water access
  - Filter kits available for purchase (AED/USD pricing)
  - Partner verification workflow for installation proof
  - Impact metrics tracking (liters filtered, bottles prevented, CO2 saved)
  - Digital certificates issued upon verification
- **Feature Flags**: Safe deployment system for commerce features
  - Percentage-based rollout (0-100%)
  - User whitelist for beta access
  - Environment-specific targeting (production, staging, development)
  - Admin-controlled enable/disable without code changes

## UI/UX Flow (AquaCafe Loyalty Journey)

### Landing Page Structure
```
Hero Section
    ↓
Membership Benefits Section (NEW: Early placement for conversion)
    ↓
Flow Connector (animated scroll-to CTA)
    ↓
Step 1: Shop Smart [data-section="step-1"]
    - Component: StepTwoExchange
    - Focus: Premium water products with sustainability benefits
    - ProgressIndicator: currentStep={1}
    ↓
Step 2: Sell iPhone [data-section="step-2"]
    - Component: StepTwoSellIphone
    - Focus: Device trade-in for circular economy
    - ProgressIndicator: currentStep={2}
    ↓
Step 3: Play to Create Impact [data-section="step-3"]
    - Component: StepOnePlay
    - Focus: Gamification, tombola, environmental missions
    - ProgressIndicator: currentStep={3}
    - Content: Always visible (no isExpanded gating)
```

### Component Architecture

#### ProgressIndicator
- **Location**: `hero-challenge-landing.tsx`
- **Responsibility**: Centralized step visualization (1|2|3)
- **Usage**: Imported and rendered at top of each step component
- **Configuration**: `maxSteps={3}`, `currentStep={1|2|3}`

#### Scroll Behavior
- **Anchor IDs**: `data-section="step-1"`, `step-2`, `step-3`
- **CTA Targets**: "Start Your Journey" and flow connector buttons use `querySelector('[data-section="step-X"]')` with `scrollIntoView({ behavior: 'smooth' })`
- **Navigation**: Sequential progression 1→2→3 via connectors between steps

#### Design Decisions
- **Step 3 always-on**: Removed isExpanded toggle to ensure Play/Tombola content is immediately accessible
- **MembershipBenefitsSection placement**: Positioned after Hero (before steps) to establish value proposition early
- **StepThreeRewards removal**: "Claim FREE BONUS" functionality moved to separate rewards page; not part of linear onboarding flow
- **Maintainability**: Three-step limit keeps ProgressIndicator simple and user journey focused

## External Dependencies
- **AI Concierge**: OpenAI API
- **E-commerce**: Shopify
- **Payments**: Stripe
- **Email**: SendGrid
- **Database**: PostgreSQL (with Drizzle ORM)
- **Deployment**: Nginx (template configurations provided)