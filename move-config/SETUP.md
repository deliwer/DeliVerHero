# move.deliwer.com — Vercel Rewrite Setup

## Goal

`https://move.deliwer.com` → serves content from `https://deliwer.com/move-in-services`
The browser URL stays as `move.deliwer.com` — no redirect, transparent proxy.

---

## How It Works

```
User visits move.deliwer.com/
        │
        ▼
Vercel edge (move project)
        │  rewrite (not redirect)
        ▼
deliwer.com/move-in-services   ← content served here
        │
        ▼
Browser still shows move.deliwer.com ✓
```

All nested paths (`/api/*`, `/assets/*`) are forwarded via the wildcard rewrite,
so images, fonts, API calls, and WebSockets all resolve correctly through the origin.

---

## Part 1 — Create the Vercel Project

This config lives in a **separate, minimal Vercel project** — it contains no
application code, only routing rules. The main `deliwer.com` project is unchanged.

```bash
# From inside the move-config/ directory:
cd move-config
vercel --prod
```

When prompted:
- **Project name:** `deliwer-move-portal`
- **Framework:** Other (no framework)
- **Build command:** *(leave blank)*
- **Output directory:** *(leave blank)*
- **Root directory:** `move-config/`

---

## Part 2 — DNS Setup

Add a CNAME record in your DNS provider (Namecheap, Cloudflare, GoDaddy, etc.):

| Type  | Host    | Value                  | TTL  |
|-------|---------|------------------------|------|
| CNAME | `move`  | `cname.vercel-dns.com` | 3600 |

> **Cloudflare users:** Set the proxy status to **DNS only** (grey cloud) during
> initial setup so Vercel can complete SSL certificate provisioning. You can
> re-enable the proxy (orange cloud) after the domain is verified.

Then, in the Vercel dashboard for `deliwer-move-portal`:
1. Go to **Settings → Domains**
2. Click **Add Domain**
3. Enter `move.deliwer.com`
4. Vercel confirms the CNAME and issues an SSL cert automatically via Let's Encrypt

---

## Part 3 — Deployment Commands

```bash
# First-time deploy
cd move-config
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
# Should return 200 and show deliwer.com/move-in-services content
curl -I https://move.deliwer.com/

# Check the HTML body contains move-in content
curl -s https://move.deliwer.com/ | grep -i "move\|ejari\|dewa\|jvc" | head -5

# Verify SSL certificate
openssl s_client -connect move.deliwer.com:443 -servername move.deliwer.com </dev/null 2>&1 | grep "subject\|issuer\|Verify"

# Confirm DNS is resolving correctly
dig move.deliwer.com CNAME
```

---

## Part 5 — Troubleshooting

### DEPLOYMENT_NOT_FOUND
**Cause:** The domain is pointing to a deleted or unlinked Vercel deployment.
**Fix:**
1. Run `vercel --prod` from inside `move-config/` to create a fresh deployment
2. Re-add `move.deliwer.com` under Settings → Domains in the Vercel dashboard
3. Confirm DNS: `dig move.deliwer.com CNAME`

---

### Rewrite Loops
**Cause:** Both source and destination resolve to the same Vercel project.
**Fix:** The wildcard rule points to `deliwer.com` (the main project), not
`move.deliwer.com`. Keep these as two separate Vercel projects. If you ever
consolidate them, replace the wildcard with explicit non-circular path rules.

---

### SSL Certificate Issues
**Symptom:** `ERR_CERT_AUTHORITY_INVALID` or certificate name mismatch.
**Fix:**
1. Confirm CNAME is present: `dig move.deliwer.com`
2. In Vercel dashboard → **Settings → Domains** → click **Refresh** next to the domain
3. If using Cloudflare proxy (orange cloud), temporarily disable it for cert issuance
4. Allow up to 24 hours for global DNS propagation

---

### 404 on Static Assets (JS, CSS, images)
**Cause:** Browser requests `/assets/index-xxxx.js` relative to `move.deliwer.com`
but the asset only exists on `deliwer.com`.
**Fix:** The wildcard rewrite `"source": "/(.*)"` → `"destination": "https://deliwer.com/$1"`
handles this automatically. If assets still 404:
- Confirm the Vite build uses `base: "/"` (not an absolute domain)
- Check there are no hardcoded `https://deliwer.com/assets/...` paths in the HTML head

---

### Domain Verification Issues
**Symptom:** Vercel dashboard shows "Invalid Configuration" for `move.deliwer.com`.
**Fix:**
1. Run `dig move.deliwer.com CNAME` — must show `cname.vercel-dns.com`
2. If the domain was previously added to another Vercel project, remove it there first
3. Use `vercel domains inspect move.deliwer.com` to check the current state

---

## Part 6 — SEO Notes

- Rewrites serve content transparently — search engines will index under `move.deliwer.com`
- To consolidate SEO equity to the main domain, add a canonical tag inside the
  `/move-in-services` page component:
  ```html
  <link rel="canonical" href="https://deliwer.com/move-in-services" />
  ```
- Use Google Search Console to monitor both `move.deliwer.com` and `deliwer.com/move-in-services`

---

## Architecture Summary

```
deliwer.com                      (main Vercel project)
  ├── /move-in-services          ← move-in concierge page lives here
  ├── /earn
  ├── /broker-onboard
  ├── /realestate
  └── ...all other routes

move.deliwer.com                 (separate Vercel project — move-config/)
  ├── vercel.json                ← rewrites / → deliwer.com/move-in-services
  └── (no application code)

earn.deliwer.com                 (separate Vercel project — earn-config/)
brokers.deliwer.com              (separate Vercel project — brokers-config/)
realestate.deliwer.com           (separate Vercel project — redirect-config/)
```
