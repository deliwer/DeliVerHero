# DeliWer Full-Stack Application - Replit Setup

## Overview
DeliWer is a full-stack JavaScript application leveraging React, Express.js, and various integrations for e-commerce, AI, and rewards. It aims to provide a comprehensive platform for sustainable living, including a climate activism initiative ("Pakistan Planet Hero Mission") and a B2B platform for wholesale phone inventory ("ChainTrack"). The project emphasizes responsive design, gamification, and a user-friendly experience, with a focus on specific regional markets like Dubai and Pakistan.

## User Preferences
Not specified.

## System Architecture
The application features a React + TypeScript frontend with Vite, an Express.js backend with TypeScript, and uses Tailwind CSS + Radix UI for the UI. Data fetching is managed with React Query, and Wouter handles frontend routing. The database is configured for PostgreSQL with Drizzle ORM. The system supports subpath deployments and includes a comprehensive security model for the ChainTrack B2B platform, protecting trade secrets and implementing role-based access control with manual verification for B2B buyers. The UI/UX prioritizes conversion optimization, visual engagement through collapsible sections, consistent iconography, and strategic placement of CTAs and social proof elements. Key design decisions include context-aware routing, a dual fee model for B2B transactions, and a multi-tiered membership structure.

## External Dependencies
- **AI Concierge**: OpenAI API
- **E-commerce**: Shopify
- **Payments**: Stripe
- **Email**: SendGrid
- **Database**: PostgreSQL (with Drizzle ORM)
- **Deployment**: Nginx (template configurations provided)