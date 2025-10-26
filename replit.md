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

### Trade Secret Protection & Security
✅ **Security Enhancement**: Protected trade secrets by removing all supplier names from UI
✅ **Region-Based Classification**: Database schema updated with region field (US, Japan, China, Europe)
✅ **Landing Page**: Supplier names replaced with regional market coverage (United States, Japan, China)
✅ **Dashboard Updates**: "Source" filter and column replaced with "Region" throughout
✅ **Trade Secret Protection**: Confidential supplier identities (WeSellCellular, GSMBid, B2BMobileAuction) completely hidden

### Navigation & Routing (Latest Update)
✅ **Context-Aware Home Button**: Home button links to /chaintrack in B2B mode, regular homepage in Consumer mode
✅ **ChainTrack Integration**: ChainTrack now serves as B2B homepage (not a separate menu item)
✅ **Domain Routing**: Only www.chaintrack.com routes to /chaintrack (deliwer.com routing untouched)
✅ **Consumer/B2B Toggle**: Preserved for easy switching between modes

### B2B Buyer Authentication & Verification
✅ **Login-Gated Access**: Inventory and prices visible only to verified B2B wholesale buyers
✅ **User Schema Enhancement**: Added userType ('consumer' or 'b2b_buyer'), isB2BVerified, businessLicense, tradeLicense fields
✅ **Registration Flow**: B2B wholesale buyer signup collects company name, business license, and trade license
✅ **Manual Verification**: New B2B accounts require admin approval (isB2BVerified defaults to false)
✅ **Access Control**: Three user states handled - unauthenticated (landing page), authenticated but unverified (pending message), verified B2B buyer (full dashboard access)
✅ **Security Model**: Matches industry standards (wesellcellular, handelot, gsmb2b)

### ChainTrack Membership Tiers (October 23, 2025)
✅ **API Endpoint**: GET /api/chaintrack/tiers returns all membership tier data
✅ **Tier Structure**: 4 tiers with volume-based pricing (On-Demand 0-49, Starter 50-249, Growth 250-499, Enterprise 500+)
✅ **Dual Fee Model**: Separate pricing for ASIS auction stock (0.2-0.5%) vs ready-to-ship tested stock (0.35-0.5%)
✅ **Cost Coverage**: All tiers enforce $500 minimum monthly fee (stored as 50000 cents in database)
✅ **Storage Implementation**: In-memory tier data with production-ready structure including features, badges, and access flags
✅ **Schema Fields**: Comprehensive chaintrackMembershipTiers table with volume ranges, fee basis points, stock access flags, and display metadata

**Membership Tiers:**
- **On-Demand** (FREE): 0-49 devices/month, Ready-to-Ship access only, 0.5% transaction fee, $500 minimum
- **Starter** (MOST POPULAR): 50-249 devices, ASIS + Ready-to-Ship access, 0.3%/0.5% fees, $500 minimum
- **Growth**: 250-499 devices, lower fees (0.25%/0.4%), dedicated account manager, $500 minimum
- **Enterprise**: 500+ devices, custom rates (0.2%/0.35%), API integration, white-glove service, $500 minimum

### Enhanced Landing Page & User Experience (October 24, 2025)
✅ **Dubai Airport Freezone Context**: Hero section emphasizes operating from Dubai Airport Freezone
✅ **Global Market Access**: Visual cards for US, Japan, China, Europe with distinct colors and regional descriptions
✅ **Inventory Categories**: Prominent ASIS Auction Stock vs Ready-to-Ship Tested cards with feature badges
✅ **Traditional vs Reverse Bidding**: Side-by-side comparison showing 4-step traditional process vs streamlined reverse bidding with timeline and pricing guarantees
✅ **Simplified 3-Step Process**: Clear visual breakdown of Post → Compete → Accept flow
✅ **Enhanced CTA**: Dubai Airport Freezone emphasis with global market/inventory summary in final call-to-action
✅ **Page Flow**: Hero → Regions/Inventory → Traditional vs Reverse Comparison → 3-Step Process → Membership Tiers → Final CTA

**User Access Control (October 24, 2025)**:
✅ **Public Landing Page**: ChainTrack landing page at /chaintrack is publicly accessible for wholesale buyer education
✅ **Smart Routing**: Conditional rendering based on user state:
  - Unauthenticated users → Public landing page (educational marketing)
  - Consumer users → Public landing page (educational access)
  - Unverified B2B buyers → Verification pending screen
  - Verified B2B buyers → Full ChainTrack dashboard and inventory access
✅ **B2B Navigation**: Enhanced menu with featured "Reverse Bidding" link styled with gradient blue background and TrendingDown icon
✅ **Code Quality**: Fixed all 16 LSP errors - corrected auction field names (title, productType, startingPrice, endDate) and apiRequest calls to match schema signature

### ChainTrack Security Policy
- Supplier source names are confidential and stored only in backend database
- Frontend displays only regional classifications to buyers
- Trade secrets protected: no supplier names exposed in UI, API responses, or marketing copy
- Region classifications: US, Japan, China, Europe (extensible for new markets)
- B2B buyers must be manually verified before accessing inventory and pricing

## Homepage Visual Enhancements (October 26, 2025)
✅ **Premium Bundle Showcase**: K8 Kangen Water machine + iPhone bundle prominently featured in Shop Smart section with flagship offer banner
✅ **Reorganized User Flow**: Three-step process now follows intuitive sequence: Shop Smart → Claim Rewards → Create Impact
✅ **Step Indicators Alignment**: Fixed ProgressIndicator components to correctly display ShoppingCart → Gift → Play icons matching each section
✅ **Collapsible Rewards Section**: "Get Rewarded" renamed to "Claim Rewards" with expandable/collapsible interface
✅ **Visual Assets Integration**: 
  - K8 machine image (without_text_1756065010951.jpg) in Shop Smart section
  - Shower filter collage (collage_1755270492135.jpg) in Claim Rewards section
  - Membership card (Aquacafe_byDeliWer_Card_Corners_1755482696304.png) in AquaCafe tab
✅ **Enhanced Impact Visualization**: Water Renewal, Recycling, and Food Security icons added to Create Impact section
✅ **AquaCafe Membership Benefits**: Converted to collapsible section with membership card display for Starter Kit (AED 99)
✅ **Flow Connectors**: Visual arrow indicators with gradient backgrounds guide users through the three-step journey

**Component Updates:**
- `client/src/components/hero-challenge-landing.tsx` - Main homepage flow with corrected step sequence
- `client/src/components/aquacafe-tab.tsx` - Collapsible membership benefits section

## Notes
- Service worker for image optimization may show registration warnings in development - this is normal
- Application includes extensive UI components and gamification features
- Ready for production deployment on Replit with autoscale configuration
- Pakistan Mission page accessible at www.deliwer.com/pakistan-mission when deployed with subpath build
- ChainTrack accessible at www.chaintrack.com or chaintrack.deliwer.com (auto-redirects to /chaintrack)
