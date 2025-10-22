# DeliWer Full-Stack Application - Replit Setup

## Overview
DeliWer is a full-stack JavaScript application successfully imported and configured for the Replit environment. It features a React frontend with Vite, Express.js backend, and various integrations for e-commerce, AI, and rewards systems.

## Project Architecture
- **Frontend**: React + TypeScript with Vite build system
- **Backend**: Express.js with TypeScript
- **UI Framework**: Tailwind CSS + Radix UI components
- **State Management**: React Query for data fetching
- **Routing**: Wouter for frontend routing
- **Database**: Configured for PostgreSQL with Drizzle ORM

## Current Configuration Status
✅ **Replit Environment**: Fully configured for development
✅ **Port Configuration**: Server runs on port 5000 (required for Replit)
✅ **Host Configuration**: Properly configured with `allowedHosts: true` for Replit proxy
✅ **Deployment**: Configured with autoscale deployment target
✅ **Workflow**: Development workflow set up and running
✅ **Pakistan Mission**: Climate activism landing page live at /mission-control-pakistan

## Key Features
- AI Concierge integration (requires OPENAI_API_KEY)
- Shopify integration for e-commerce
- Stripe integration for payments (requires STRIPE_SECRET_KEY)
- SendGrid integration for emails (requires SENDGRID_API_KEY)
- Rewards and gamification systems
- Image optimization service worker
- Responsive design with dark mode support
- **Pakistan Planet Hero Mission** - Climate activism platform for overseas Pakistanis
- **ChainTrack B2B Platform** - Wholesale phone inventory aggregation (October 22, 2025)

## Development Commands
- `npm run dev` - Start development server (already configured in workflow)
- `npm run build` - Build for production
- `npm run build:subpath` - Build for subpath deployment (/pakistan-mission)
- `npm start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes

## Environment Setup
The application is designed to work with optional environment variables:
- `OPENAI_API_KEY` - For AI chat functionality
- `STRIPE_SECRET_KEY` - For payment processing
- `SENDGRID_API_KEY` - For email functionality
- `DATABASE_URL` - For PostgreSQL connection
- `VITE_BASE_PATH` - For subpath deployment (set to `/pakistan-mission` for subpath builds)

Without these variables, the application runs in demo mode with mock data.

## Pakistan Mission Page (October 7, 2025)
✅ **Climate Activism Landing Page**: Created comprehensive mission page at /mission-control-pakistan
✅ **PAD Partnership**: Pakistan Association Dubai collaboration prominently featured
✅ **Action CTAs**: Direct links to AquaCafe (onboarding), Leaderboard (tracking), Partners (sponsorship), Contact
✅ **Sponsorship Tiers**: Platinum (AED 10k+), Gold (AED 5k), Silver (AED 2.5k), Bronze (AED 1k)
✅ **YouTube Integration**: Video upload instructions for @vdeliwer channel with hashtags
✅ **Mission Framework**: Three pillars - Water Conservation, Tree Plantation, Flood Relief Support
✅ **Timeline**: Launch → Activation → Recognition phases
✅ **Contact Details**: PAD (community@pad.ae, www.pad.ae) and DeliWer (hello@deliwer.com)

**Founders**: Rubab Hassan and Hassan Jawad

### Future Enhancements (Pakistan Mission)
- Replace YouTube placeholder with real embed/curated playlist
- Wire Share button to social sharing functionality
- Responsive QA testing on mobile breakpoints

## Recent Changes (Import Setup - September 24, 2025)
- ✅ Successfully imported GitHub repository
- ✅ Installed all project dependencies with npm install
- ✅ Configured workflow "Start application" to run on port 5000 with webview output
- ✅ Verified Vite development server with proper `allowedHosts: true` configuration
- ✅ Confirmed Express.js backend serving on 0.0.0.0:5000 for Replit compatibility  
- ✅ Set up deployment configuration for autoscale with proper build/run commands
- ✅ Tested frontend/backend integration - API endpoints working correctly
- ✅ Verified application runs in demo mode with expected API key warnings

## Deployment Configuration
- **Subpath Support**: Application can be deployed at root (www.deliwer.com) or subpath (www.deliwer.com/pakistan-mission)
- **Nginx Config**: Template configuration files available in /deploy directory
- **Build Scripts**: 
  - `npm run build` for root deployment
  - `npm run build:subpath` for /pakistan-mission deployment
- **Documentation**: Full deployment guide in /deploy/README.md

## ChainTrack B2B Platform (October 22, 2025)
✅ **Security Enhancement**: Protected trade secrets by removing all supplier names from UI
✅ **Region-Based Classification**: Database schema updated with region field (US, Japan, China, Europe)
✅ **Landing Page**: Supplier names replaced with regional market coverage (United States, Japan, China)
✅ **Dashboard Updates**: "Source" filter and column replaced with "Region" throughout
✅ **B2B Navigation**: ChainTrack added with highlighted featured styling in B2B menu
✅ **Domain Routing**: chaintrack.deliwer.com and www.chaintrack.com redirect to /chaintrack
✅ **Trade Secret Protection**: Confidential supplier identities (WeSellCellular, GSMBid, B2BMobileAuction) completely hidden
✅ **Database Migration**: Successfully pushed schema changes with region field addition

### ChainTrack Security Policy
- Supplier source names are confidential and stored only in backend database
- Frontend displays only regional classifications to buyers
- Trade secrets protected: no supplier names exposed in UI, API responses, or marketing copy
- Region classifications: US, Japan, China, Europe (extensible for new markets)

## Notes
- Service worker for image optimization may show registration warnings in development - this is normal
- Application includes extensive UI components and gamification features
- Ready for production deployment on Replit with autoscale configuration
- Pakistan Mission page accessible at www.deliwer.com/pakistan-mission when deployed with subpath build
- ChainTrack accessible at www.chaintrack.com or chaintrack.deliwer.com (auto-redirects to /chaintrack)
