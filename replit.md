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

## Key Features
- AI Concierge integration (requires OPENAI_API_KEY)
- Shopify integration for e-commerce
- Stripe integration for payments (requires STRIPE_SECRET_KEY)
- SendGrid integration for emails (requires SENDGRID_API_KEY)
- Rewards and gamification systems
- Image optimization service worker
- Responsive design with dark mode support

## Development Commands
- `npm run dev` - Start development server (already configured in workflow)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes

## Environment Setup
The application is designed to work with optional environment variables:
- `OPENAI_API_KEY` - For AI chat functionality
- `STRIPE_SECRET_KEY` - For payment processing
- `SENDGRID_API_KEY` - For email functionality
- `DATABASE_URL` - For PostgreSQL connection

Without these variables, the application runs in demo mode with mock data.

## Recent Changes (Import Setup)
- ✅ Installed missing `tsx` dependency
- ✅ Configured workflow to run on port 5000
- ✅ Verified Vite development server integration
- ✅ Set up deployment configuration for autoscale
- ✅ Confirmed frontend/backend integration working properly

## Notes
- Service worker for image optimization may show registration warnings in development - this is normal
- Application includes extensive UI components and gamification features
- Ready for production deployment on Replit with autoscale configuration