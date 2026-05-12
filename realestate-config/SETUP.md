# realestate.deliwer.com — Vercel Rewrite Setup

## Goal

`https://realestate.deliwer.com` → serves content from `https://deliwer.com/realestate`
The browser URL stays as `realestate.deliwer.com` — no redirect, transparent proxy.

---

## How It Works

```
User visits realestate.deliwer.com/
        │
        ▼
Vercel edge (realestate project)
        │  rewrite (not redirect)
        ▼
deliwer.com/realestate   ← content served here
        │
        ▼
Browser still shows realestate.deliwer.com ✓
```

All nested paths (`/api/*`, `/assets/*`) are forwarded via the wildcard rewrite,
so images, fonts, API calls, and HMR all resolve correctly through the origin.

---

## Part 1 — Create the Vercel Project

This config lives in a **separate, minimal Vercel project** — it contains no
application code, only routing rules. The main `deliwer.com` project is unchanged.

```bash
# From inside the realestate-config/ directory:
vercel --prod
```

When prompted:
- **Project name:** `deliwer-realestate-portal`
- **Framework:** Other
- **Root directory:** `./` (the realestate-config folder)
- **Build command:** _(leave blank)_
- **Output directory:** _(leave blank)_

---

## Part 2 — Add the Custom Domain

1. Go to the Vercel dashboard → select the `deliwer-realestate-portal` project
2. Settings → Domains → Add Domain
3. Enter `realestate.deliwer.com`
4. Vercel will show you the required DNS record

---

## Part 3 — DNS Configuration

Add a **CNAME** record in your DNS provider (e.g. Cloudflare, Namecheap):

| Type  | Name        | Value                  | TTL  |
|-------|-------------|------------------------|------|
| CNAME | realestate  | cname.vercel-dns.com   | Auto |

> If `deliwer.com` is on Cloudflare, set the proxy status to **DNS only** (grey cloud)
> for the `realestate` CNAME until Vercel provisions the SSL certificate, then
> re-enable proxying if desired.

---

## Verification

```bash
# Check DNS propagation
dig realestate.deliwer.com CNAME

# Check HTTP response
curl -I https://realestate.deliwer.com/

# Confirm content is the real estate page
curl -s https://realestate.deliwer.com/ | grep -i "real estate" | head -5
```

---

## Frontend Routing (already live)

The main DeliWer SPA (`client/src/App.tsx`) includes hostname detection:

```js
if ((hostname === 'realestate.deliwer.com' || hostname === 'www.realestate.deliwer.com') && location === '/') {
  setLocation('/realestate');
}
```

This ensures the correct page loads whether the user arrives via the subdomain
or navigates directly within the SPA.

---

## Troubleshooting

**SSL not provisioning:**
1. Confirm the CNAME record has propagated: `dig realestate.deliwer.com CNAME`
2. Re-add `realestate.deliwer.com` under Settings → Domains in the Vercel dashboard
3. Confirm the CNAME still resolves: `dig realestate.deliwer.com CNAME`

**Assets returning 404:**
The wildcard rewrite (`/(.*) → deliwer.com/$1`) forwards all asset requests to the
**main domain** (`deliwer.com`), not `realestate.deliwer.com`. As long as these are
served correctly on `deliwer.com`, they will resolve on the subdomain too.

**Page not loading after DNS change:**
Allow up to 48 hours for full propagation. Use `dig realestate.deliwer.com` to check.
