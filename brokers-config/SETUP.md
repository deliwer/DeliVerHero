# brokers.deliwer.com — Vercel Rewrite Setup

## Goal

`https://brokers.deliwer.com` → serves content from `https://deliwer.com/broker-onboard`
The browser URL stays as `brokers.deliwer.com` — no redirect, transparent proxy.

---

## How It Works

```
User visits brokers.deliwer.com/
        │
        ▼
Vercel edge (brokers project)
        │  rewrite (not redirect)
        ▼
deliwer.com/broker-onboard   ← content served here
        │
        ▼
Browser still shows brokers.deliwer.com ✓
```

All nested paths (`/api/*`, `/assets/*`) are forwarded via the wildcard rewrite,
so images, fonts, API calls, and HMR all resolve correctly through the origin.

---

## Part 1 — Create the Vercel Project

This config lives in a **separate, minimal Vercel project** — it contains no
application code, only routing rules. The main `deliwer.com` project is unchanged.

```bash
# From inside the brokers-config/ directory:
vercel --prod
```

When prompted:
- **Project name:** `deliwer-brokers-portal`
- **Framework:** Other (no framework)
- **Build command:** *(leave blank)*
- **Output directory:** *(leave blank)*
- **Root directory:** `brokers-config/` (or run from inside it)

---

## Part 2 — DNS Setup

Add a CNAME record in your DNS provider (e.g. Namecheap, Cloudflare, GoDaddy):

| Type  | Host               | Value                  | TTL  |
|-------|--------------------|------------------------|------|
| CNAME | `brokers`          | `cname.vercel-dns.com` | 3600 |

> **Cloudflare users:** Set the proxy status to **DNS only** (grey cloud) during
> initial setup so Vercel can complete SSL certificate provisioning. You can
> re-enable the proxy (orange cloud) after the domain is verified.

Then, in the Vercel dashboard for `deliwer-brokers-portal`:
1. Go to **Settings → Domains**
2. Click **Add Domain**
3. Enter `brokers.deliwer.com`
4. Vercel will confirm the CNAME is pointing correctly and issue an SSL cert automatically

---

## Part 3 — Deployment Commands

```bash
# First-time deploy (run from the project root or brokers-config/ directory)
cd brokers-config
vercel --prod

# Re-deploy after updating vercel.json
vercel --prod --force

# Check deployment status
vercel ls

# Inspect the live deployment
vercel inspect <deployment-url>

# Link an existing project (if you need to reconnect)
vercel link
```

---

## Part 4 — Verifying It Works

```bash
# Should return 200 and show deliwer.com/broker-onboard content
curl -I https://brokers.deliwer.com/

# Should proxy through — check that the HTML body contains broker page markup
curl -s https://brokers.deliwer.com/ | grep "broker" | head -5

# Check SSL certificate
openssl s_client -connect brokers.deliwer.com:443 -servername brokers.deliwer.com </dev/null 2>&1 | grep "subject\|issuer\|Verify"
```

---

## Part 5 — Troubleshooting

### DEPLOYMENT_NOT_FOUND
**Cause:** The domain is pointing to a deleted or unlinked Vercel deployment.
**Fix:**
1. Run `vercel --prod` from inside `brokers-config/` to create a fresh deployment
2. Re-add `brokers.deliwer.com` under Settings → Domains in the Vercel dashboard
3. Confirm the CNAME still resolves: `dig brokers.deliwer.com CNAME`

---

### Rewrite Loops
**Cause:** Vercel rewrites the request back to itself.
**Fix:** The wildcard rule `"destination": "https://deliwer.com/$1"` points to the
**main domain** (`deliwer.com`), not `brokers.deliwer.com`. As long as these are
different projects on different domains, no loop can occur. If you ever point both
domains at the same Vercel project, replace the wildcard with explicit path rules.

---

### SSL Certificate Issues
**Symptom:** `ERR_CERT_AUTHORITY_INVALID` or `NET::ERR_CERT_COMMON_NAME_INVALID`
**Fix:**
1. Confirm the CNAME record is present and propagated: `dig brokers.deliwer.com`
2. In the Vercel dashboard, go to **Settings → Domains** and click **Refresh** next to
   the domain — Vercel will re-trigger the Let's Encrypt certificate issuance
3. If using Cloudflare proxy (orange cloud), temporarily disable it so Vercel can
   complete the ACME challenge, then re-enable after ~5 minutes
4. Wait up to 24 hours for DNS propagation in edge cases

---

### 404 on Static Assets (JS, CSS, images)
**Cause:** The browser requests `/assets/index-xxxx.js` relative to `brokers.deliwer.com`
but the asset only exists on `deliwer.com`.
**Fix:** The wildcard rewrite `"source": "/(.*)"` → `"destination": "https://deliwer.com/$1"`
handles this automatically. If assets still 404, check:
- The Vite build is setting the correct `base` URL (should be `/` not an absolute domain)
- No hardcoded `https://deliwer.com/assets/...` URLs in the HTML head

---

### Domain Verification Issues
**Symptom:** Vercel dashboard shows "Invalid Configuration" for the domain.
**Fix:**
1. Run `dig brokers.deliwer.com CNAME` and confirm it shows `cname.vercel-dns.com`
2. If the domain was previously added to another Vercel project, remove it there first
   (a domain can only be verified on one Vercel project at a time)
3. Use `vercel domains inspect brokers.deliwer.com` to see the current state

---

## Part 6 — SEO Notes

- Rewrites (unlike redirects) do **not** pass canonical signals to search engines.
  The content will be indexed under `brokers.deliwer.com`.
- Add a `<link rel="canonical" href="https://deliwer.com/broker-onboard">` tag inside
  the broker-onboard page component if you want search equity to flow to the main domain.
- Google will eventually discover both URLs; use Search Console to monitor indexing.

---

## Architecture Summary

```
deliwer.com                   (main Vercel project — deliwer.com, www.deliwer.com)
  ├── /broker-onboard         ← broker portal content lives here
  ├── /realestate
  └── ...all other routes

brokers.deliwer.com           (separate Vercel project — deliwer-brokers-portal)
  ├── vercel.json             ← rewrites everything to deliwer.com
  └── (no application code)

realestate.deliwer.com        (separate Vercel project — redirect-config/)
  ├── vercel.json             ← rewrites to deliwer.com
  └── (no application code)
```
