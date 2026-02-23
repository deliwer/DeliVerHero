# DeliWer Full-Stack Application

## Overview
DeliWer is a full-stack JavaScript application designed for sustainable living, e-commerce, AI integration, and rewards. It serves as a comprehensive platform including a climate activism initiative ("Pakistan Planet Hero Mission"), a B2B wholesale platform ("ChainTrack"), and a Dubai-based relocation and investment gateway ("DeliWer Relocate").

## Recent Updates (Feb 23, 2026)
- **Navigation & UX Refinement**: 
  - Centralized navigation with logo on the right and sticky behavior.
  - Integrated "Trust Strip" directly below the main navigation for consistent social proof.
- **Service Page Redesign**:
  - Overhauled `/relocate` and `/residents` pages with high-impact, cognitive layouts.
  - Simplified service cards on `/residents` to a focused 3-card layout (Maintenance, Move-In Activation, Relocation).
  - Added a "3 Step Journey" explainer to `/relocate` for better user orientation.
- **Homepage Optimization**:
  - Updated hero section with bold typography and clear "Arrive in Dubai. Ready to Live." messaging.
  - Improved auto-scroll logic for service exploration.

## Previous Updates (Feb 8, 2026)
- **Instagram -> WhatsApp Lead Engine**:
  - Implemented lead capture and social listening strategy for relocation conversations.
  - Added `lead_applications` table with marketing stage tracking (intercepted, handshake, redirected, closed).
  - Created `/api/marketing/assets` endpoint serving one-page checklists, DM templates, and WhatsApp scripts.
  - Added a **Marketing Lead Engine Dashboard** (`/marketing`) for co-founders to track manual interceptions and conversions.
  - Updated main navigation and routing to include the new marketing tools.

## System Architecture
The application uses a React + TypeScript frontend with Vite, an Express.js + TypeScript backend, and styles with Tailwind CSS and Radix UI.

### Lead Engine Architecture
- **Marketing Dashboard**: Real-time tracking of expat intent interceptions.
- **Asset Service**: Centralized repository for "Dubai Newcomer Essentials" and concierge scripts.
- **Conversion Flow**: Instagram DM -> WhatsApp Handshake -> Starter Basket Order on deliwer.com.

## External Dependencies
- **AI Concierge**: OpenAI API
- **E-commerce**: Shopify
- **Payments**: Stripe, PayPal
- **Email**: SendGrid
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
