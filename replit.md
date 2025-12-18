# DeliWer Full-Stack Application

## Overview
DeliWer is a full-stack JavaScript application designed for sustainable living, e-commerce, AI integration, and rewards. It serves as a comprehensive platform including a climate activism initiative ("Pakistan Planet Hero Mission"), a B2B wholesale platform ("ChainTrack"), and a new Dubai-based relocation and investment gateway ("DeliWer Relocate"). The project focuses on responsive design, gamification, and a user-friendly experience, targeting markets in Dubai and Pakistan, with a strong emphasis on lead generation and conversion optimization for production launch.

## User Preferences
Not specified.

## System Architecture
The application uses a React + TypeScript frontend with Vite, an Express.js + TypeScript backend, and styles with Tailwind CSS and Radix UI. React Query manages data fetching, and Wouter handles frontend routing. PostgreSQL with Drizzle ORM is used for the database. The system supports subpath deployments and implements a comprehensive security model for ChainTrack, including role-based access control and manual verification for B2B buyers. UI/UX design prioritizes conversion optimization, visual engagement via collapsible sections, consistent iconography, and strategic placement of CTAs and social proof. Architectural decisions include context-aware routing, a dual fee model for B2B transactions, multi-tiered membership structures, and feature flags for safe incremental deployment of new features, such as the water filtration campaign.

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