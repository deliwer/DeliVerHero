# DeliWer Full-Stack Application

## Overview
DeliWer is a full-stack JavaScript application designed for sustainable living, e-commerce, AI integration, and rewards. It serves as a comprehensive platform including a climate activism initiative ("Pakistan Planet Hero Mission"), a B2B wholesale platform ("ChainTrack"), and a Dubai-based relocation and investment gateway ("DeliWer Relocate"). The project focuses on responsive design, gamification, and a user-friendly experience, targeting markets in Dubai and Pakistan, with a strong emphasis on lead generation and conversion optimization for production launch.

## Recent Updates (Jan 21, 2026)
- **Residence & Relocate Integration**:
  - Added `/residence/move-in` and `/residence/move-out` subpages for targeted enquiries
  - Integrated WhatsApp enquiry links with pre-filled targeted messages for move-in/out services
  - Implemented a sitewide `ExitPricingCalculator` component for move-out/exit packages
  - Added smooth click flow CTAs between `/residence` and `/relocate` to guide users through the living journey
  - Enhanced `/relocate` hero with a direct path to `/residence` for users still looking for a home

## User Preferences
Not specified.

## System Architecture
The application uses a React + TypeScript frontend with Vite, an Express.js + TypeScript backend, and styles with Tailwind CSS and Radix UI. React Query manages data fetching, and Wouter handles frontend routing. PostgreSQL with Drizzle ORM is used for the database. The system supports subpath deployments and implements a comprehensive security model for ChainTrack, including role-based access control and manual verification for B2B buyers. UI/UX design prioritizes conversion optimization, visual engagement via collapsible sections, consistent iconography, and strategic placement of CTAs and social proof. 

### /Relocate Page Architecture (Production Ready)
- **Audience**: Exclusively B2B (investors, founders, C-suite executives, high-net-worth individuals)
- **Primary CTA**: Investment validation form with auto-scroll and service pre-fill
- **Email Integration**: SendGrid campaign management with dual notifications
- **Calendar Integration**: Calendly popup with dynamic script loading (now fully functional)
- **Hero Section**: Dubai skyline with trust badges (Dealroom, FounderHQ verified)
- **Services**: Capital Relocation, Business Setup, Real Estate Investment, Legal & Compliance
- **Social Proof**: Investor testimonials with capital amounts and positive ROI messaging
- **Comparison Table**: Dubai vs Singapore, Panama, Georgia for capital relocation
- **Conversion Flow**: Hero → Services → Why Dubai → Form → Investor Network CTAs
- **Pricing Section**: 3 packages (Family, Capital & Business [featured], Premium) with holiday discount
- **All Buttons**: Functional and tested, scroll to form or open Calendly

Architectural decisions include context-aware routing, a dual fee model for B2B transactions, multi-tiered membership structures, and feature flags for safe incremental deployment of new features, such as the water filtration campaign.

The AquaCafe Loyalty Journey features a 3-step "How it Works" onboarding funnel (Shop Smart → Sell iPhone → Play to Create Impact) with early placement of membership benefits. The backend incorporates a "Zero Lead Loss System" for robust lead capture, saving submissions to PostgreSQL, sending dual email notifications via SendGrid, and console logging as a fallback.

## External Dependencies
- **AI Concierge**: OpenAI API
- **E-commerce**: Shopify
- **Payments**: Stripe, PayPal
- **Email**: SendGrid
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Deployment**: Nginx
- **Scheduling**: Calendly

## Deployment Status
- **/relocate**: ✅ PRODUCTION READY - ALL FIXES COMPLETE
  - Calendly popup fully functional
  - All buttons working (form scroll and popup triggers)
  - Text visibility optimized
  - API endpoints tested and working
  - Build successful (16.66s, no errors)
  - Zero browser console errors
  - Ready for immediate deployment
