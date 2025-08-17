# DeliWer Vercel + Shopify Horizon Deployment Guide

## Prerequisites
1. Vercel account with deployment permissions
2. Shopify Partner account
3. Domain access (deliwer-ecosystem.vercel.app or custom domain)

## 1. Environment Setup

### Required Environment Variables in Vercel Dashboard:
```bash
# Shopify Configuration
SHOPIFY_API_KEY=your_shopify_api_key
SHOPIFY_API_SECRET=your_shopify_api_secret
SHOPIFY_WEBHOOK_SECRET=your_webhook_secret

# OpenAI (Optional - for AI Concierge)
OPENAI_API_KEY=your_openai_api_key

# Production Environment
NODE_ENV=production
VITE_API_URL=https://deliwer-ecosystem.vercel.app/api
```

## 2. Shopify App Setup

### Create Shopify App:
1. Go to Shopify Partners Dashboard
2. Create new app: "DeliWer Ecosystem"
3. Configure app URLs in `shopify.app.toml`:
   - Application URL: `https://deliwer-ecosystem.vercel.app`
   - Redirect URLs: Include all URLs from shopify.app.toml

### Configure Webhooks:
The following webhooks are auto-configured:
- `orders/paid` → `/shopify/webhooks/orders/paid`
- `customers/create` → `/shopify/webhooks/customers/create`
- `app/uninstalled` → `/shopify/webhooks/app/uninstalled`

## 3. Vercel Deployment

### Deploy Command:
```bash
# Build and deploy to Vercel
npm run build
vercel --prod
```

### Vercel Configuration:
- Build Command: `npm run build`
- Output Directory: `dist/public`
- Node.js Version: 20.x
- Function Memory: 1024MB (for order processing)

## 4. API Endpoints

### Core DeliWer API:
- `/api/heroes` - Hero management
- `/api/impact-stats` - Environmental impact data
- `/api/calculate-trade-value` - iPhone trade calculations
- `/api/ai-chat` - AI Concierge integration

### Shopify Integration API:
- `/shopify/webhooks/orders/paid` - Order processing
- `/shopify/products/sync` - Product catalog sync
- `/shopify/customers/:id` - Customer data integration
- `/shopify/auth/verify` - App installation verification

## 5. Testing

### Local Development:
```bash
npm run dev  # Starts Express server on port 5000
```

### Production Testing:
1. Deploy to Vercel staging
2. Test webhook endpoints with Shopify webhook tester
3. Verify order processing creates hero profiles
4. Confirm product sync displays AquaCafe starter kit

## 6. Shopify Store Integration

### Install App:
1. Use Partner Dashboard to install on development store
2. Configure app permissions (all scopes in shopify.app.toml)
3. Test order flow: Shopify order → DeliWer hero creation

### Product Configuration:
- AquaCafe Planet Hero Starter Kit (AED 99)
- Metafields for hero level upgrades
- Inventory tracking (47 units initially)

## 7. Monitoring

### Key Metrics:
- Order processing success rate
- Hero profile creation accuracy
- API response times
- Webhook delivery reliability

### Logs:
- Vercel Function logs for debugging
- Shopify webhook delivery logs
- Hero creation audit trail

## 8. Security

### Webhook Verification:
- HMAC signature validation for all Shopify webhooks
- Environment variable protection for API keys
- CORS restrictions for Shopify app embedding

### Best Practices:
- Regular API key rotation
- Monitor webhook endpoint access
- Audit hero profile creation logs