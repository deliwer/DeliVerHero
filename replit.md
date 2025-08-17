# DeliWer - Dubai's iPhone-to-Water Trade Platform

## Overview
DeliWer is Dubai's pioneering gamified sustainability platform where users engage in real-world eco-missions, such as tech upgrades and water purification, to earn rewards and contribute to environmental betterment. The platform aims to gamify environmental action, allowing users to earn impact points, climb leaderboards, and unlock rewards while making a tangible positive impact on Dubai's environment. DeliWer envisions being "the sustainability game of Dubai — complete missions, save money, save the planet," integrating services like water delivery and iPhone trade-ins as core mission types.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is a modern React 18 application built with TypeScript, using Vite for fast development and optimized builds. It employs Wouter for client-side routing, shadcn/ui with Radix UI for accessible components, and Tailwind CSS for styling with a custom Dubai-themed color palette. TanStack Query handles server state management, caching, and real-time data synchronization. The architecture is component-driven, with clear separation of concerns and custom hooks for business logic.

### Backend Architecture
The backend is an Express.js server, written in TypeScript, following a RESTful API pattern. It features modular route handling, an in-memory storage implementation designed for easy migration to a database, error handling middleware, and request/response logging. The storage layer uses an `IStorage` interface for abstraction.

### Database Design
The application uses a Drizzle ORM schema compatible with PostgreSQL, defining tables for `heroes` (user profiles, gamification data), `tradeIns` (transaction records), `impactStats` (global aggregations), and `referrals`. UUIDs are used for primary keys, with appropriate foreign key relationships.

### AI Integration
OpenAI GPT-4 is integrated for the AI Concierge feature, providing context-aware conversations for trade valuation and user guidance. LangChain is planned for advanced conversation memory and context handling, with fallback mechanisms in place.

### Real-time Features
Real-time capabilities include Firebase Realtime Database simulation for live leaderboard updates and polling-based updates for impact statistics (every 10 seconds). Optimistic UI updates provide immediate user feedback.

### Gamification System
The platform incorporates a multi-tier hero level system (Bronze, Silver, Gold) based on points, a flexible badge system for achievements, real-time leaderboards showcasing environmental impact, and social sharing features.

### UI/UX Decisions
The design incorporates distinct background colors and improved contrast across sections. Cards are enhanced with gradient backgrounds and shadows. Each major section features unique colored backgrounds (blue, emerald, amber, purple, indigo, orange gradients) for clear visual separation. A contextual tooltip hints system provides guided user experiences.

### Feature Specifications
Key features include an interactive onboarding walkthrough with real-time impact calculations, a mission selection interface, gamified onboarding flows, and integration of hero profile creation with backend APIs. It supports water delivery and iPhone trade-ins as core mission types. Navigation is streamlined, combining related functionality like "Impact" and "Rewards."

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database.
- **Drizzle ORM**: Type-safe SQL query builder.
- **Drizzle Kit**: Database migrations and schema synchronization.

### AI & ML Services
- **OpenAI API**: For GPT-4 integration.
- **LangChain**: Planned for advanced AI conversation management.

### Frontend Libraries
- **Radix UI**: Accessible UI primitives.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React**: Icon library.
- **TanStack Query**: Data synchronization and caching.

### Development & Deployment
- **Vite**: Build tool.
- **Replit**: Development environment.
- **TypeScript**: Static type checking.
- **Vercel**: Production deployment.

### Current Third-Party Integrations
- **Shopify Headless (via shopify.app.toml)**: E-commerce backend.

## Recent Changes

### Planet Hero Program Entry Gateway (January 2025)
AquaCafe has been transformed into the primary Planet Hero Program entry gateway, serving as the main revenue-generating section:

**Key Features Implemented:**
- **AED 99 Starter Kit**: Entry-level Planet Hero program with instant AED 1000+ value proposition
- **FREE Shower Filter Gift**: AquaCafe Beauty Hair & Skincare Ionic Shower Filter (AED 399 value) with free installation (AED 299 value) 
- **Planet Hero Benefits**: Instant Level 2 status, 1000 Planet Points with 2X multiplier, 20% discount on all future plans
- **Referral Program**: AED 100 Bakers Kitchen meal vouchers for successful referrals plus 500 bonus Planet Points each
- **Revenue Urgency**: Limited-time messaging with stock scarcity (47 starter kits left)
- **"Love is in the Hair" Campaign**: Showcasing the 4-level filtration ionic shower filter as primary gift

**Ambassador Program Enhancements:**
- **Enhanced Commission Structure**: 35% commission on AED 99 starter kit sales + 25% on iPhone trade-in values
- **Projected Earnings**: AED 4,200+ monthly potential (up from AED 3,465+)
- **Bakers Kitchen Integration**: Ambassadors share in voucher rewards for referrals they generate
- **Revenue Model**: Focus on high-conversion AED 99 entry point with immediate value delivery

**Partnership Program Terminology:**
- **Affiliates → Ambassadors**: Individual entrepreneurs earning 35% commission on Planet Hero starter kits
- **Restaurant Partners → Champions**: Collection points earning AED 25 per trade-in with foot traffic benefits
- **Eco-Trade Partners**: Wholesale program for pre-owned electronics retailers with AI sourcing and bulk pricing

### Migration to Replit Environment (August 2025)
Successfully migrated the project from Replit Agent to standard Replit environment with full production deployment readiness:

**Migration Achievements:**
- **Full-Stack Architecture**: Express.js backend with Vite frontend properly configured for both development and production
- **Vercel Deployment Ready**: Updated `vercel.json` configuration with proper API routing and static file serving
- **Shopify Integration**: Maintained `shopify.app.toml` configuration for headless commerce deployment
- **Build Process**: Verified npm build process generates optimized production assets in `dist/public/`
- **API Compatibility**: Enhanced serverless API (`api/index.js`) to handle all existing endpoints without 404 errors
- **Security Hardening**: Implemented proper CORS headers and environment-specific configurations
- **Development Workflow**: Working "Start application" workflow running Express server on port 5000

**Vercel Production Deployment (August 2025):**
- **Optimized Build**: Clean production build with SEO-enhanced HTML, proper meta tags and Open Graph data
- **Asset Caching**: Configured differential caching - static assets (1 year) vs dynamic content (immediate revalidation)
- **Serverless API**: Comprehensive API handler supporting all endpoints with fallback AI responses
- **Clean Deployment**: Removed Replit-specific scripts and banners for production-ready deployment
- **Error-Free Routing**: All API endpoints properly mapped to prevent 404 errors including leaderboard, impact stats, trade calculations
- **Dubai Commerce Ready**: All Dubai-specific features (AquaCafe, Planet Hero Program, Ambassador rewards) fully functional
- **SEO Optimization**: Title, description, and social sharing meta tags configured for Dubai market
- **CORS Security**: Production-ready security headers for cross-origin requests
- **Trust Elements**: Founders section with verified contact information and professional credentials
- **Build Verified**: Successful npm build with optimized 734KB bundle and proper asset organization

**UI/UX Enhancement (August 2025):**
- **AI Concierge Repositioning**: Moved Deli AI Input component to appear directly below "Become a Planet Hero" heading for better user flow and immediate accessibility
- **Enhanced User Journey**: Streamlined hero challenge landing page layout to prioritize AI assistance and trade calculation flow
- **Impact Calculator Organization**: Removed Interactive Impact Randomizer from homepage and consolidated it exclusively on Impact & Rewards Dashboard page to eliminate redundancy and improve focused user experience

**UI/UX Consolidation (August 2025):**
- **Merged Components**: Combined founding hero perks and leaderboard into single compact section
- **Simplified Onboarding**: Eliminated redundant sections for cleaner first-glance understanding
- **Strategic Positioning**: Placed consolidated hero program above slot machines for better conversion flow
- **Maintained Urgency**: Preserved countdown timers and scarcity messaging in streamlined format
- **Opportunities Consolidation**: Combined partnership, sponsorship, and ambassador programs into unified "Join the Movement" section
- **Environmental Champions**: Added realistic Dubai professionals with authentic job titles and sober color schemes
- **Device Calculator Merger**: Unified Device Simulator and Trade Calculator into single comprehensive component to eliminate duplication, featuring side-by-side device selection and detailed impact breakdown with complete user journey options

**GOAFFPRO Affiliate Integration & Bakers Kitchen Enhancement (August 2025):**
- **Enhanced Welcome Bonus**: Updated to "Bakers Kitchen AED100 Kangen Water voucher when a friend signs up" with shareable links
- **Viral Marketing Features**: Integrated GOAFFPRO affiliate tracking across all major CTAs for maximum shareability
- **Smart Share Buttons**: Added one-click sharing with auto-generated affiliate links and branded messaging
- **Social Media Integration**: Enhanced navigation and product CTAs with share functionality and referral tracking
- **WhatsApp Integration**: Pre-filled messages with affiliate tracking for expert consultation requests
- **Cross-Platform Consistency**: Updated all Bakers Kitchen mentions across AquaCafe and other components
- **UTM Parameter Tracking**: Added comprehensive campaign tracking for conversion optimization
- **Dubaican Initiative**: Replaced Dubai Municipality certification with highlighted Dubaican Initiative support

**Ambassador Program & Trust Enhancement (August 2025):**
- **Founders Section**: Added Hassan Jawad (Founder, ReCommerce Pro, linkedin.com/in/formatix) and Rubab Hassan (Co-Founder & MD, Cancer Warrior & Health Coach, +971 56 714 8381) for trust building
- **Enhanced AI Concierge**: Added Ambassador recruitment and direct partnership links to AI responses
- **Multiple CTA Strategies**: WhatsApp info, training videos, and instant signup options
- **Comprehensive Sharing**: All major actions now include share functionality with referral tracking
- **Ambassador Training Links**: Integrated video training and WhatsApp consultation for potential Ambassadors
- **Live Challenge Integration**: Added viral sharing to community challenges and leaderboard competitions
- **Action-Oriented CTAs**: Added 12+ strategic CTAs across homepage, including challenge friends, share kit deals, and trade calculator sharing
- **Revenue Optimization**: Positioned AED 4,200+ monthly earnings prominently across Ambassador touchpoints
- **Clean References**: Removed third-party affiliate platform references for direct partnership focus

### Vercel + Shopify Horizon Integration (August 2025)
Converted the project for optimal Vercel deployment with comprehensive Shopify Horizon integration:

**Shopify Integration Architecture:**
- **Dedicated Shopify API Handler**: Created `/api/shopify.js` with comprehensive webhook handling for orders, customers, and app lifecycle events
- **Enhanced Product Sync**: AquaCafe Planet Hero Starter Kit configured as Shopify product with metafields for hero level upgrades and planet points
- **Webhook Processing**: Automated hero profile creation from Shopify order payments with proper HMAC verification structure
- **Extended Scopes**: Added inventory, fulfillment, and draft order permissions for complete e-commerce integration

**Vercel Production Optimization:**
- **Advanced Routing**: Updated vercel.json with dedicated Shopify routes, enhanced CORS headers, and serverless function optimization
- **Memory Allocation**: Increased serverless function memory to 1024MB for complex order processing
- **Environment Configuration**: Added comprehensive .env.example with all required Shopify API keys and webhook secrets
- **Build Process**: Optimized for both development (Express server) and production (serverless functions) environments

**Security & Compliance:**
- **Webhook Verification**: Structure in place for Shopify HMAC signature verification
- **CORS Configuration**: Shopify-specific CORS headers for secure app embedding
- **API Segmentation**: Separated Shopify endpoints from core DeliWer API for better security isolation
- **Environment Variables**: Secure configuration management for API keys and secrets