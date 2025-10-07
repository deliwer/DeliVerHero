# Subpath Deployment Guide

## Overview
This guide explains how to deploy the application under a subpath (e.g., `/pakistan-mission`) on www.deliwer.com.

## Build Instructions

### Option 1: Build with absolute base path (Recommended)
```bash
VITE_BASE_PATH=/pakistan-mission npm run build
```

### Option 2: Build with PUBLIC_URL (alternative)
```bash
PUBLIC_URL=https://www.deliwer.com/pakistan-mission npm run build
```

The build output will be in `dist/public/` directory.

## Deployment Steps

### 1. Build the Application
Run one of the build commands above based on your preference.

### 2. Deploy Static Files
Upload the contents of `dist/public/` to your web server under the `/pakistan-mission` directory.

### 3. Configure Web Server
Choose your web server configuration:

#### Nginx Configuration
Add the following to your nginx server block (see `nginx.subpath.conf` for full config):

```nginx
location /pakistan-mission/ {
    try_files $uri $uri/ /pakistan-mission/index.html;
}

# Cache static assets
location ~* \.(?:js|css|svg|gif|png|jpg|jpeg|webp)$ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}

# No cache for index.html
location = /pakistan-mission/index.html {
    add_header Cache-Control "no-store";
}
```

#### Netlify Configuration
Create a `_redirects` file in the public directory:
```
/pakistan-mission/*  /pakistan-mission/index.html  200
```

#### Vercel Configuration
Create/update `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/pakistan-mission/(.*)",
      "destination": "/pakistan-mission/index.html"
    }
  ]
}
```

#### CloudFront + S3
1. Upload build files to S3 under `pakistan-mission/` prefix
2. Set Custom Error Responses: 404 → `/pakistan-mission/index.html` (HTTP 200)

## Testing Locally

### Test the production build locally:
```bash
npm run build
npx serve -s dist/public -l 5000
```

Then open: `http://localhost:5000/pakistan-mission`

## Common Issues

### Blank Page or Missing Assets
- **Cause**: Asset paths not configured correctly
- **Fix**: Rebuild with `VITE_BASE_PATH=/pakistan-mission npm run build`

### 404 on Page Refresh or Deep Links
- **Cause**: Web server not configured for SPA routing
- **Fix**: Ensure server rewrites all `/pakistan-mission/*` paths to `/pakistan-mission/index.html`

### API Calls Failing
- **Cause**: API endpoints not configured for subpath
- **Fix**: Ensure your backend API is accessible at the correct path or use absolute URLs

## Environment Variables

For subpath deployment, set:
```bash
VITE_BASE_PATH=/pakistan-mission
```

For production with custom domain:
```bash
VITE_BASE_PATH=/pakistan-mission
PUBLIC_URL=https://www.deliwer.com/pakistan-mission
```

## Notes

- Current version uses in-memory storage (MemStorage)
- API endpoints should be configured separately if using a backend
- The wouter router is configured to work with the base path automatically
