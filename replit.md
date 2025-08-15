# DeliWer - Dubai's iPhone-to-Water Trade Platform

## Overview

DeliWer is Dubai's first sustainability game where you complete real-world eco-missions — like upgrading tech or purifying water at home — to earn rewards, level up, and make the planet proud. The platform gamifies environmental actions through various mission types including iPhone trade-ins, water delivery, and future sustainable services. Users earn environmental impact points, climb leaderboards, and unlock rewards while making real positive impact on Dubai's environment through engaging gameplay mechanics.

## Brand Positioning

"We are the sustainability game of Dubai — complete missions, save money, save the planet."

The services (water, iPhones, future products) are mission types, not separate businesses. This positioning provides clarity: Dubai's first gamified sustainability platform where real-world eco-actions earn rewards and level progression.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (August 14, 2025)

### Hero Content Updates & Navigation Merge (August 14, 2025)
- **Hero Headline Updated**: Changed main headline to "AquaCafe the sustainability game of Dubai — complete missions, save money, save the planet -- Become The Planet Hero"
- **Subheading Revised**: Updated to "The worlds first sustainability game where you complete real-world eco-missions — like upgrading tech or purifying water at home — to earn rewards, level up, and make the planet proud"
- **Impact & Rewards Merge**: Combined Impact and Rewards pages into single "Impact & Rewards" navigation item and merged DubaiRewardsSystem into impact dashboard
- **Navigation Streamlined**: Reduced navigation complexity by consolidating related functionality
- **Page Entry Scroll Enhancement**: Updated scroll-to-top to instant scrolling for immediate page top positioning on all navigations

### Replit Environment Migration (August 14, 2025)
- **Complete Migration Success**: Successfully migrated from Replit Agent to standard Replit environment
- **TypeScript Fixes**: Resolved type compatibility issues in dubai-rewards-system component for proper date handling
- **Security Validation**: Confirmed proper client/server separation and secure Express.js configuration
- **Performance Verification**: Validated API endpoints functioning correctly with proper caching (304 responses)
- **Real-time Features**: Confirmed live leaderboard and impact stats polling working as expected
- **Mobile Navigation Enhancement**: Added responsive mobile menu with hamburger button, expandable navigation, and proper mobile UX for all navigation items and action buttons
- **Tutorial Dismissal Enhancement**: Added click-outside-to-dismiss functionality to hero onboarding tutorial for improved user experience

### Vercel Deployment Configuration Fix (August 15, 2025)
- **Resolved Runtime Conflicts**: Fixed conflicting builds/functions configuration causing "Function Runtimes must have a valid version" error
- **Simplified Configuration**: Removed complex runtime specifications and used Vercel auto-detection for Node.js functions
- **Compiled API Endpoints**: Built TypeScript API files to JavaScript for serverless deployment compatibility
- **Path Conflict Resolution**: Eliminated file path conflicts between source and compiled files for clean deployment
- **Serverless API Handler**: Created dedicated serverless function for all API endpoints with proper CORS handling
- **Static File Serving**: Configured proper routing for frontend assets and API endpoints in Vercel deployment

### Mission-Based Gaming Platform Implementation 
- **Interactive Onboarding Walkthrough**: Created animated multi-step hero registration process with real-time impact calculations and progress tracking
- **Mission Selection Interface**: Converted hero section to mission-based gameplay with clear paths for different environmental challenges
- **Gamified Onboarding Flow**: Implemented step-by-step walkthrough with animated UI elements, trade value calculations, and environmental impact visualization
- **Hero Profile Creation**: Integrated onboarding with backend API to create hero profiles with mission preferences and starting points
- **Mission Types Framework**: Established water delivery and iPhone trade-ins as distinct mission categories within the sustainability game
- **Progress Tracking System**: Built comprehensive progress indicators and completion feedback for mission onboarding

### Hero Package Pricing & UI Enhancement Update (August 13, 2025)
- **AquaCafe Hero Pricing**: Updated packages to start at AED 999 after discount for Heroes with three tiers: Hero Starter (AED 999), Hero Premium (AED 1,499), Hero Elite (AED 2,299)
- **Visual Enhancement**: Added distinct background colors and improved contrast across all sections for better visibility
- **Calculator Integration**: Replaced leaderboard with calculator output display in hero-challenge-landing component showing real-time trade valuation, environmental impact, and action buttons
- **Card Design Updates**: Enhanced all cards with gradient backgrounds, shadows, and improved text readability
- **Section Differentiation**: Each major section now has unique colored backgrounds (blue, emerald, amber, purple, indigo, orange gradients) for clear visual separation

### Previous Platform Features (August 12, 2025)
- **Footer Integration**: Added comprehensive footer with DeliWer ecosystem projects (AquaCafe, EcoTrade, Recycle, Dawn)
- **Delivery Page**: Created complete delivery network page with Dubai zone coverage, live tracking, and eco-fleet features
- **Community Hub**: Built Planet Heroes community with leaderboards, challenges, social features, and achievements
- **Partnership Programs**: Enhanced with delivery agent, eco-recycling, and restaurant collection partner options
- **Contact Integration**: Multiple support channels (WhatsApp, phone, email) with partnership inquiry forms
- **Navigation Updates**: Added Community and Delivery sections to main navigation
- **Real-time Features**: Live impact stats, leaderboard updates, and tracking simulation

### Shopify Hydrogen Integration & Product Expansion
- **Vercel Deployment**: Added vercel.json configuration for production deployment
- **Shopify Integration**: Created shopify.app.toml for Hydrogen framework compatibility
- **Product Catalog**: Built comprehensive /products page with iPhone preowned models, premium water, Kangen systems
- **E-commerce CTAs**: Updated all order buttons to link to www.deliwer.com/products/aquacafe for AED 99 pricing
- **Product Categories**: AquaCafe water systems, certified iPhone preowned, Icelandic premium water, Kangen delivery/installation
- **Legal Pages**: Added Privacy Policy, Terms of Service, and Environmental Impact pages
- **Multi-platform Support**: Added Netlify configuration for alternative deployment options

## System Architecture

### Frontend Architecture
The application uses a modern React-based frontend built with:
- **Vite** as the build tool for fast development and optimized production builds
- **React 18** with TypeScript for type-safe component development
- **Wouter** for lightweight client-side routing instead of React Router
- **shadcn/ui** component library with Radix UI primitives for accessible, customizable components
- **Tailwind CSS** for utility-first styling with custom Dubai-themed color palette
- **TanStack Query** for server state management, caching, and real-time data synchronization

The frontend follows a component-driven architecture with clear separation between pages, reusable UI components, and business logic hooks. Custom hooks manage specific concerns like leaderboard data (`useLeaderboard`) and impact statistics (`useImpactStats`).

### Backend Architecture
The backend is built with Express.js following a RESTful API pattern:
- **Express.js** server with TypeScript for type safety
- **Modular route handling** with centralized route registration
- **In-memory storage implementation** with interface-based design for easy database migration
- **Error handling middleware** for consistent API responses
- **Request/response logging** for debugging and monitoring

The storage layer uses an interface (`IStorage`) that abstracts data operations, currently implemented with in-memory storage but designed for easy migration to PostgreSQL with Drizzle ORM.

### Database Design
The schema is defined using Drizzle ORM with PostgreSQL-compatible tables:
- **heroes** - User profiles with gamification data (points, level, badges, environmental impact)
- **tradeIns** - Trade transaction records with status tracking
- **impactStats** - Global environmental impact aggregations
- **referrals** - Referral system for viral growth

The schema uses UUIDs for primary keys and includes proper foreign key relationships and indexing considerations.

### AI Integration
- **OpenAI GPT-4** integration for the AI Concierge feature
- **Fallback mechanisms** for when AI services are unavailable
- **Context-aware conversations** for trade valuation and user guidance
- **LangChain** planned for advanced conversation memory and context handling

### Real-time Features
- **Firebase Realtime Database** simulation for live leaderboard updates
- **Polling-based updates** for impact statistics (10-second intervals)
- **Optimistic UI updates** for immediate user feedback

### Authentication & Security
The application currently operates without authentication but includes user identification through email-based hero profiles. The architecture supports future integration of session-based authentication.

### Gamification System
- **Multi-tier hero levels** (Bronze, Silver, Gold Hero) based on points
- **Badge system** with JSON storage for flexible achievement tracking
- **Real-time leaderboards** with environmental impact metrics
- **Social sharing** capabilities for viral growth

## External Dependencies

### Database Services
- **Neon Database** - Serverless PostgreSQL database with connection pooling
- **Drizzle ORM** - Type-safe SQL query builder and schema management
- **Drizzle Kit** - Database migrations and schema synchronization

### AI & ML Services
- **OpenAI API** - GPT-4 integration for conversational AI features
- **LangChain** - Planned integration for advanced AI conversation management

### Frontend Libraries
- **Radix UI** - Comprehensive set of accessible UI primitives
- **Tailwind CSS** - Utility-first CSS framework with custom theming
- **Lucide React** - Icon library for consistent iconography
- **TanStack Query** - Powerful data synchronization and caching

### Development & Deployment
- **Vite** - Modern build tool with fast HMR and optimized bundling
- **Replit** - Development environment with integrated deployment
- **TypeScript** - Static type checking across the entire codebase

### Planned Integrations
- **Shopify Headless** - E-commerce backend with Hydrogen/Oxygen framework
- **Firebase** - Real-time database for live updates and notifications
- **Cloudinary** - Image management for user profiles and badges
- **Google Calendar API** - Scheduling system for device pickup/delivery
- **WhatsApp Business API** - Customer communication and valuation flow

The architecture is designed for scalability with clear separation of concerns, making it easy to add new features like payment processing, inventory management, and advanced gamification mechanics.