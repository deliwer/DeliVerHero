# earn.deliwer.com — Vercel Rewrite Setup

## Goal

`https://earn.deliwer.com` → serves content from `https://deliwer.com/earn`
The browser URL stays as `earn.deliwer.com` — no redirect, transparent proxy.

---

## How It Works

```
User visits earn.deliwer.com/
        │
        ▼
Vercel edge (earn project)
        │  rewrite (not redirect)
        ▼
deliwer.com/earn   ← content served here
        │
        ▼
Browser still shows earn.deliwer.com ✓
```

All nested paths (`/api/*`, `/assets/*`) are forwarded via the wildcard rewrite,
so images, fonts, API calls, and WebSockets all resolve correctly through the origin.

---

## Part 1 — Create the Vercel Project

This config lives in a **separate, minimal Vercel project** — it contains no
application code, only routing rules. The main `deliwer.com` project is unchanged.

```bash
# From inside the earn-config/ directory:
cd earn-config
vercel --prod
```

When prompted:
- **Project name:** `deliwer-earn-portal`
- **Framework:** Other (no framework)
- **Build command:** *(leave blank)*
- **Output directory:** *(leave blank)*
- **Root directory:** `earn-config/`

---

## Part 2 — DNS Setup

Add a CNAME record in your DNS provider (Namecheap, Cloudflare, GoDaddy, etc.):

| Type  | Host    | Value                  | TTL  |
|-------|---------|------------------------|------|
| CNAME | `earn`  | `cname.vercel-dns.com` | 3600 |

> **Cloudflare users:** Set the proxy status to **DNS only** (grey cloud) during
> initial setup so Vercel can complete SSL certificate provisioning. You can
> re-enable the proxy (orange cloud) after the domain is verified.

Then, in the Vercel dashboard for `deliwer-earn-portal`:
1. Go to **Settings → Domains**
2. Click **Add Domain**
3. Enter `earn.deliwer.com`
4. Vercel confirms the CNAME and issues an SSL cert automatically via Let's Encrypt

---

## Part 3 — Deployment Commands

```bash
# First-time deploy
cd earn-config
vercel --prod

# Re-deploy after updating vercel.json
vercel --prod --force

# Check all deployments for this project
vercel ls

# Inspect a specific deployment
vercel inspect <deployment-url>

# Reconnect to an existing Vercel project
vercel link
```

---

## Part 4 — Verifying It Works

```bash
# Should return 200 and show deliwer.com/earn content
curl -I https://earn.deliwer.com/

# Check the HTML body contains earn page content
curl -s https://earn.deliwer.com/ | grep -i "earn\|affiliate\|partner" | head -5

# Verify SSL certificate
openssl s_client -connect earn.deliwer.com:443 -servername earn.deliwer.com </dev/null 2>&1 | grep "subject\|issuer\|Verify"

# Confirm DNS is resolving correctly
dig earn.deliwer.com CNAME
```

---

## Part 5 — Troubleshooting

### DEPLOYMENT_NOT_FOUND
**Cause:** The domain is pointing to a deleted or unlinked Vercel deployment.
**Fix:**
1. Run `vercel --prod` from inside `earn-config/` to create a fresh deployment
2. Re-add `earn.deliwer.com` under Settings → Domains in the Vercel dashboard
3. Confirm DNS: `dig earn.deliwer.com CNAME`

---

### Rewrite Loops
**Cause:** Both the source and destination resolve to the same Vercel project.
**Fix:** The wildcard rule points to `deliwer.com` (the main project), not
`earn.deliwer.com`. Keep these as two separate Vercel projects. If you ever
consolidate them, replace the wildcard with explicit non-circular path rules.

---

### SSL Certificate Issues
**Symptom:** `ERR_CERT_AUTHORITY_INVALID` or certificate name mismatch.
**Fix:**
1. Confirm CNAME is present: `dig earn.deliwer.com`
2. In Vercel dashboard → **Settings → Domains** → click **Refresh** next to the domain
3. If using Cloudflare proxy (orange cloud), temporarily disable it for cert issuance
4. Allow up to 24 hours for global DNS propagation

---

### 404 on Static Assets (JS, CSS, images)
**Cause:** Browser requests `/assets/index-xxxx.js` relative to `earn.deliwer.com`
but the asset only exists on `deliwer.com`.
**Fix:** The wildcard rewrite `"source": "/(.*)"` → `"destination": "https://deliwer.com/$1"`
handles this automatically. If assets still 404:
- Confirm the Vite build uses `base: "/"` (not an absolute domain)
- Check there are no hardcoded `https://deliwer.com/assets/...` paths in the HTML head

---

### Domain Verification Issues
**Symptom:** Vercel dashboard shows "Invalid Configuration" for `earn.deliwer.com`.
**Fix:**
1. Run `dig earn.deliwer.com CNAME` — must show `cname.vercel-dns.com`
2. If the domain was previously added to another Vercel project, remove it there first
3. Use `vercel domains inspect earn.deliwer.com` to check the current state

---

## Part 6 — SEO Notes

- Rewrites serve content transparently — search engines will index under `earn.deliwer.com`
- To consolidate SEO equity to the main domain, add a canonical tag inside the `/earn`
  page component:
  ```html
  <link rel="canonical" href="https://deliwer.com/earn" />
  ```
- Use Google Search Console to monitor both `earn.deliwer.com` and `deliwer.com/earn`

---

## Architecture Summary

```
deliwer.com                    (main Vercel project)
  ├── /earn                    ← affiliate/influencer earn page lives here
  ├── /broker-onboard
  ├── /realestate
  └── ...all other routes

earn.deliwer.com               (separate Vercel project — earn-config/)
  ├── vercel.json              ← rewrites / → deliwer.com/earn
  └── (no application code)

brokers.deliwer.com            (separate Vercel project — brokers-config/)
realestate.deliwer.com         (separate Vercel project — redirect-config/)
```
