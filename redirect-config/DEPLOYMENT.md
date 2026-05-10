# Redirect Setup: realestate.deliwer.com → deliwer.com/realestate

## Overview

This is a **standalone Vercel project** whose only job is to permanently redirect
`realestate.deliwer.com` to `https://deliwer.com/realestate`.

It does **not** touch or affect the main DeliWer application.

---

## File Reference

| File | Purpose |
|---|---|
| `vercel.json` | Primary redirect logic (processed first by Vercel's edge network) |
| `next.config.js` | Fallback redirect via Next.js (runs if vercel.json is bypassed) |
| `DEPLOYMENT.md` | This guide |

---

## Step 1 — DNS Configuration

Add a **CNAME record** in your DNS provider (GoDaddy, Cloudflare, Namecheap, etc.):

```
Type:  CNAME
Host:  realestate          (subdomain only, not the full domain)
Value: cname.vercel-dns.com
TTL:   3600 (or "Automatic")
```

> If you are on **Cloudflare**, turn the proxy (orange cloud) **OFF** for this record.
> Vercel manages its own SSL — Cloudflare's proxy can conflict with Vercel's TLS certificate provisioning.

DNS changes can take 5 minutes to 48 hours to propagate globally.

---

## Step 2 — Create the Vercel Project

### Option A — Vercel CLI (recommended)

```bash
# Install Vercel CLI if you don't have it
npm i -g vercel

# From inside the redirect-config/ folder
cd redirect-config
vercel

# Follow the prompts:
#   Set up and deploy? → Yes
#   Which scope?       → your Vercel team/account
#   Link to existing?  → No (create new project)
#   Project name       → deliwer-realestate-redirect
#   Directory          → ./  (current)
```

### Option B — Vercel Dashboard

1. Go to https://vercel.com/new
2. Import from Git (push this `redirect-config/` folder to a repo), OR drag-and-drop the folder
3. Name the project `deliwer-realestate-redirect`
4. Click **Deploy**

---

## Step 3 — Add the Custom Domain in Vercel

1. Open the Vercel project dashboard
2. Go to **Settings → Domains**
3. Add `realestate.deliwer.com`
4. Vercel will automatically provision an SSL certificate (Let's Encrypt) — this takes 1–5 minutes after DNS propagates

---

## Step 4 — Verify

```bash
# Check DNS resolution
dig CNAME realestate.deliwer.com

# Check redirect (should return 301 and Location header)
curl -I https://realestate.deliwer.com

# Expected response:
# HTTP/2 301
# location: https://deliwer.com/realestate
```

---

## Rewrite Alternative (URL stays as realestate.deliwer.com)

If you want the browser address bar to **stay** as `realestate.deliwer.com` while
**serving** `deliwer.com/realestate` content:

1. Open `vercel.json` and **comment out** the `"redirects"` block
2. **Uncomment** the `"rewrites"` block
3. Do the same in `next.config.js`
4. Redeploy

> **Warning:** Rewrites require that `deliwer.com` does not block proxy requests
> via `X-Frame-Options: DENY` or strict CSP headers. Test before going live.

---

## Troubleshooting

### `DEPLOYMENT_NOT_FOUND`

**Symptom:** Vercel returns a 404 `DEPLOYMENT_NOT_FOUND` page.

**Causes & Fixes:**
- The custom domain is not added in the Vercel project under **Settings → Domains**
  → Add `realestate.deliwer.com` and redeploy
- The project was deleted or the domain was moved to a different project
  → Confirm the domain is assigned to `deliwer-realestate-redirect`
- There is no `index.js` or `index.html` — this is a config-only project, which is fine,
  but Vercel needs at least a `vercel.json` at the root
  → Ensure `vercel.json` is at the **root** of the deployed folder, not inside a subfolder

---

### DNS Propagation Delays

**Symptom:** `realestate.deliwer.com` still resolves to the old server or returns NXDOMAIN.

**Fixes:**
- Wait up to 48 hours — this is a DNS TTL issue, not a code issue
- Check propagation: https://dnschecker.org/#CNAME/realestate.deliwer.com
- Flush your local DNS cache:
  - macOS: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
  - Windows: `ipconfig /flushdns`
  - Linux: `sudo systemd-resolve --flush-caches`

---

### Invalid Domain Configuration

**Symptom:** Vercel dashboard shows "Invalid Configuration" next to the domain.

**Fixes:**
- Ensure the CNAME points to `cname.vercel-dns.com` (not an A record)
- If using Cloudflare: disable the proxy (grey cloud, DNS-only mode)
- If there is an existing A record for `realestate`, delete it — CNAME and A records conflict
- Verify with: `dig CNAME realestate.deliwer.com +short`
  → Should return `cname.vercel-dns.com.`

---

### SSL / HTTPS Issues

**Symptom:** Browser shows "Your connection is not private" or certificate error.

**Fixes:**
- Wait 5–10 minutes after DNS propagates — Vercel provisions SSL automatically
- If still failing after 30 minutes, go to **Settings → Domains** in Vercel
  and click **Refresh** next to the domain to trigger re-provisioning
- Ensure port 443 is not blocked at the DNS/firewall level
- Do NOT use Cloudflare proxy (orange cloud) — use DNS-only mode so Vercel
  can complete the ACME challenge for Let's Encrypt

---

## Deployment Checklist

- [ ] CNAME record added: `realestate` → `cname.vercel-dns.com`
- [ ] Cloudflare proxy OFF (if applicable)
- [ ] Vercel project created and deployed
- [ ] Domain `realestate.deliwer.com` added in Vercel Settings → Domains
- [ ] SSL certificate provisioned (green lock in browser)
- [ ] `curl -I https://realestate.deliwer.com` returns `301` and correct `location` header
- [ ] Main `deliwer.com` routes are unaffected
