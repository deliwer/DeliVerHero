# DeliWer - Vercel Deployment Guide

## Overview
This project is now configured for Vercel deployment with Shopify Hydrogen compatibility. The application uses a static frontend with serverless API functions.

## Project Structure
```
├── api/                    # Vercel serverless functions
│   ├── index.js           # Main API handler
│   └── shopify.js         # Shopify webhook handler
├── client/                # React frontend (static)
│   ├── src/
│   ├── index.html
│   └── ...
├── dist/public/          # Build output directory
├── vercel.json           # Vercel configuration
├── next.config.js        # Next.js config for static export
└── .vercelignore         # Files to ignore during deployment
```

## Deployment Steps

### 1. Local Testing
```bash
npm run dev  # Test development server
npm run build  # Test production build
```

### 2. Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### 3. Environment Variables
Set these in Vercel dashboard:
- `OPENAI_API_KEY` - For AI concierge functionality
- `DATABASE_URL` - For PostgreSQL database (optional)
- `NODE_ENV=production`

## Key Features

### Static Frontend
- Built with Vite for optimal performance
- Deployed to Vercel Edge Network
- Automatic code splitting and optimization

### Serverless API
- All API routes handled by `api/index.js`
- Stateless design for scalability
- CORS enabled for cross-origin requests

### Shopify Integration
- Ready for Shopify Hydrogen
- Webhook handler in `api/shopify.js`
- Compatible with Shopify Headless Commerce

## Configuration Details

### vercel.json
- Output directory: `dist/public`
- Build command: `vite build`
- API functions with 1GB memory and 30s timeout
- CORS headers configured
- SPA routing with fallback to index.html

### Performance Optimizations
- Code splitting by vendor, UI, and utils
- Asset optimization
- Edge caching
- Serverless function optimization

## Monitoring & Analytics
- Vercel Analytics ready
- Error tracking enabled
- Performance monitoring
- Real-time function logs

## Custom Domain
Configure custom domain in Vercel dashboard for production deployment.

## Scaling
- Automatic scaling with Vercel
- Edge functions for global performance
- CDN distribution worldwide