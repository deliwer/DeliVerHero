# DeliWer - Dubai's iPhone-to-Water Trade Platform

## Overview
DeliWer is Dubai's pioneering gamified sustainability platform where users engage in real-world eco-missions, such as tech upgrades and water purification, to earn rewards and contribute to environmental betterment. The platform aims to gamify environmental action, allowing users to earn impact points, climb leaderboards, and unlock rewards while making a tangible positive impact on Dubai's environment. DeliWer envisions being "the sustainability game of Dubai — complete missions, save money, save the planet," integrating services like water delivery and iPhone trade-ins as core mission types.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is a React 18 application built with TypeScript, using Vite, Wouter for routing, shadcn/ui with Radix UI for components, and Tailwind CSS for styling with a custom Dubai-themed color palette. TanStack Query handles server state management. The architecture is component-driven with custom hooks for business logic.

### Backend Architecture
The backend is an Express.js server, written in TypeScript, following a RESTful API pattern. It features modular route handling, an in-memory storage implementation designed for easy migration to a database, error handling middleware, and request/response logging. The storage layer uses an `IStorage` interface for abstraction.

### Database Design
The application uses a Drizzle ORM schema compatible with PostgreSQL, defining tables for `heroes`, `tradeIns`, `impactStats`, and `referrals`. UUIDs are used for primary keys.

### AI Integration
OpenAI GPT-4 is integrated for the AI Concierge feature, providing context-aware conversations for trade valuation and user guidance. LangChain is planned for advanced conversation memory and context handling.

### Real-time Features
Real-time capabilities include Firebase Realtime Database simulation for live leaderboard updates and polling-based updates for impact statistics. Optimistic UI updates provide immediate user feedback.

### Gamification System
The platform incorporates a multi-tier hero level system (Bronze, Silver, Gold), a flexible badge system for achievements, real-time leaderboards, and social sharing features.

### UI/UX Decisions
The design incorporates distinct background colors, improved contrast, gradient backgrounds and shadows for cards. Each major section features unique colored backgrounds for clear visual separation. A contextual tooltip hints system provides guided user experiences. The AI Concierge is strategically placed for immediate accessibility. Device simulator and trade calculator are unified.

### Feature Specifications
Key features include an interactive onboarding walkthrough with real-time impact calculations, a mission selection interface, gamified onboarding flows, and integration of hero profile creation with backend APIs. It supports water delivery and iPhone trade-ins as core mission types. Navigation is streamlined, combining related functionality like "Impact" and "Rewards." The AquaCafe is the primary Planet Hero Program entry gateway, featuring a starter kit, shower filter gift, and referral program.

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
- **Vite**: Build tool for static frontend optimized for Vercel deployment.
- **Replit**: Development environment with hot-reload capabilities.
- **TypeScript**: Static type checking across full-stack.
- **Vercel Deployment**: Production-ready static site with serverless API functions.
  - **Static Frontend**: Built as static assets served via CDN for optimal performance.
  - **Serverless Functions**: API endpoints deployed as Edge Functions in `/api` directory.
  - **Shopify Integration**: Dedicated serverless handlers for webhooks and product sync.
- **Build Configuration**: Optimized for static deployment with automatic redeployment triggers.

### Current Third-Party Integrations
- **Shopify Headless (via shopify.app.toml)**: E-commerce backend with complete webhook integration for order processing and customer management.
  - Webhook handlers: `/shopify/webhooks/orders/paid`, `/shopify/webhooks/customers/create`
  - Product sync endpoint: `/shopify/products/sync`
  - OAuth verification: `/shopify/auth/verify`
- **GOAFFPRO**: Integrated for affiliate tracking and viral marketing features.
- **Vercel Edge Functions**: Serverless API architecture for scalable deployment.

### Migration Status
**Project migrated from Replit Agent to standard Replit environment on August 19, 2025**
- ✅ Dependencies and packages verified and installed
- ✅ Workflow configuration optimized for development
- ✅ Static build configuration ready for Vercel deployment
- ✅ Serverless API functions optimized for production
- ✅ Shopify Hydrogen integration fully configured
- ✅ Security best practices implemented with client/server separation
- ✅ **Migration completed successfully** - All systems operational
- ✅ OpportunitiesSection repositioned above "Dubai Environmental Champions"
- ✅ Enhanced tooltip system with user-controlled display and click-outside dismissal (August 18, 2025)
- ✅ Hero section background updated with responsive iPhone-water circular exchange image
- ✅ Dark overlay removed for cleaner theme appearance  
- ✅ Background image optimized for all screen sizes with proper aspect ratio
- ✅ Original theme colors restored with subtle gradients and animated elements
- ✅ Background image positioned as full background without heavy dark overlays
- ✅ Comprehensive image optimization system implemented with responsive sizing, lazy loading, and performance monitoring
- ✅ OptimizedImage component created with automatic format detection, device capability detection, and service worker integration
- ✅ Image performance monitoring dashboard added for development tracking
- ✅ Navigation simplified: "Shop AquaCafe" changed to "Shop" for cleaner menu (August 19, 2025)
- ✅ Sponsorship page merged into Partners page for unified partnership experience
- ✅ "Share & Join Heroes" button removed from navigation to streamline user interface
- ✅ "Trade iPhone" menu item removed from navigation (August 19, 2025)
- ✅ "Impact & Rewards" renamed to "Rewards" and repositioned before "Partners" for better flow
- ✅ "Get My Trade Value" button updated to scroll to Meet Deli interactive section with input focus
- ✅ "Heroes Community" renamed to "Community" and positioned before "Partners" for cleaner navigation flow
- ✅ "Start Mission" button simplified to "Start" for cleaner desktop navigation
- ✅ **Planet Heroes Rewards system redesigned** with impressive Planet Points visualization (August 19, 2025)
- ✅ Three-step participation workflow implemented: exchange → collect → redeem
- ✅ Eco-friendly products showcase featuring iPhone 17, AquaCafe water systems, Kangen Water, and Bakers Kitchen
- ✅ AED 1,000+ starter kit value highlight with comprehensive rewards visualization
- ✅ Partner ecosystem integration: AquaCafe, Bakers Kitchen, and expanding network
- ✅ Impact dashboard updated with consolidated sustainability path replacing old Dubai rewards system
- ✅ Comprehensive product categories: Technology, Water Systems, Healthy Food with point-based redemption
- ✅ **"How to Participate" section merged with Planet Heroes Rewards** maintaining neon CTA style (August 19, 2025)
- ✅ Dubai Environmental Champions replaced to avoid repetition and streamline user journey
- ✅ Products removed from main landing page - dedicated to AquaCafe shop page
- ✅ Neon-style "SHOP AQUACAFE NOW" CTA prominently placed for conversion optimization
- ✅ Three-step participation process: Exchange → Collect → Redeem with clear visual progression
- ✅ **Redundant Planet Heroes Rewards sections merged into single unified section** (August 19, 2025)
- ✅ Section repositioned after Etisalat & Du section with focus on "start now and earn rewards"
- ✅ All product displays removed from main page to streamline user journey to AquaCafe
- ✅ **Migration from Replit Agent to Replit completed successfully** (August 19, 2025)
- ✅ Comprehensive Campaign Section redesigned as gamified iPhone 17 Planet Points Challenge
- ✅ Three-step participation process: Exchange → Collect Points → Redeem for iPhone 17
- ✅ Strategic timing integration: Apple Event Sep 9 & GITEX 2025 launch benefits
- ✅ Maximum store credit strategy to minimize cash contribution for iPhone 17 upgrade
- ✅ "Fulfill Your Dreams" CTA with Planet Mission gamification
- ✅ All relevant content aligned with mission objectives, irrelevant content removed
- ✅ **Get Trade-in Offer section restructured as Step 1 in three-step process** (August 19, 2025)
- ✅ Repositioned below hero section and integrated with Meet Deli as Step 2
- ✅ Updated step headers to clearly indicate process flow: Step 1 → Step 2 → Step 3
- ✅ Maintained Planet Points Challenge styling with neon-style CTAs for navigation
- ✅ Enhanced user journey with clear progression through trade-in process