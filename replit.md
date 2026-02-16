# DeliWer Full-Stack Application

## Overview
DeliWer is a full-stack JavaScript application designed for sustainable living, e-commerce, AI integration, and rewards. It serves as a comprehensive platform including a climate activism initiative ("Pakistan Planet Hero Mission"), a B2B wholesale platform ("ChainTrack"), and a Dubai-based relocation and investment gateway ("DeliWer Relocate").

## Recent Updates (Feb 16, 2026)
- **Project Import to Replit**: Successfully migrated and configured the application in the Replit environment.
  - Set up PostgreSQL database and pushed schema with Drizzle ORM.
  - Workflow configured to use `npx tsx server/index.ts` for development.
  - Configured workflow for development server on port 5000 with webview output.
  - Application running successfully with Express backend and Vite frontend.
  - Deployment configured for autoscale with `npm run build` and `node dist/index.js`.

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
