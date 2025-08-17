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
- **Vite**: Build tool.
- **Replit**: Development environment.
- **TypeScript**: Static type checking.
- **Vercel**: Production deployment optimized for Shopify Hydrogen with direct homepage routing.

### Current Third-Party Integrations
- **Shopify Headless (via shopify.app.toml)**: E-commerce backend, with dedicated Shopify API handler for webhooks and product sync.
- **GOAFFPRO**: Integrated for affiliate tracking and viral marketing features.