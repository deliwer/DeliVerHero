# rentals.deliwer.com — Vercel Rewrite Setup

## Goal

`https://rentals.deliwer.com` → serves content from `https://deliwer.com/flexible-rentals`
The browser URL stays as `rentals.deliwer.com` — no redirect, transparent proxy.

---

## How It Works

```
User visits rentals.deliwer.com/
        │
        ▼
Vercel edge (rentals project)
        │  rewrite (not redirect)
        ▼
deliwer.com/flexible-rentals   ← content served here
        │
        ▼
Browser still shows rentals.deliwer.com ✓
```

All nested paths (`/api/*`, `/assets/*`) are forwarded via the wildcard rewrite,
so images, fonts, API calls, and HMR all resolve correctly through the origin.

---

## Part 1 — Create the Vercel Project

This config lives in a **separate, minimal Vercel project** — it contains no
application code, only routing rules. The main `deliwer.com` project is unchanged.

```bash
# From inside the rentals-config/ directory:
vercel --prod
```

When prompted:
- **Project name:** `deliwer-rentals-portal`
- **Framework:** Other
- **Root directory:** `./` (the rentals-config folder)
- **Build command:** _(leave blank)_
- **Output directory:** _(leave blank)_

---

## Part 2 — Add the Custom Domain

1. Go to the Vercel dashboard → select the `deliwer-rentals-portal` project
2. Settings → Domains → Add Domain
3. Enter `rentals.deliwer.com`
4. Vercel will show you the required DNS record

---

## Part 3 — DNS Configuration

Add a **CNAME** record in your DNS provider (e.g. Cloudflare, Namecheap):

| Type  | Name    | Value                  | TTL  |
|-------|---------|------------------------|------|
| CNAME | rentals | cname.vercel-dns.com   | Auto |

> If `deliwer.com` is on Cloudflare, set the proxy status to **DNS only** (grey cloud)
> for the `rentals` CNAME until Vercel provisions the SSL certificate, then re-enable
> proxying if desired.

---

## Verification

```bash
# Check DNS propagation
dig rentals.deliwer.com CNAME

# Check HTTP response
curl -I https://rentals.deliwer.com/

# Confirm content is the Flex Living page
curl -s https://rentals.deliwer.com/ | grep -i "flex" | head -5
```

---

## Frontend Routing (already live)

The main DeliWer SPA (`client/src/App.tsx`) includes hostname detection:

```js
if ((hostname === 'rentals.deliwer.com' || hostname === 'www.rentals.deliwer.com') && location === '/') {
  setLocation('/flexible-rentals');
}
```

This ensures the correct page loads whether the user arrives via the subdomain
or navigates directly within the SPA.

---

## Troubleshooting

**SSL not provisioning:**
1. Confirm the CNAME record has propagated: `dig rentals.deliwer.com CNAME`
2. Re-add `rentals.deliwer.com` under Settings → Domains in the Vercel dashboard
3. Confirm the CNAME still resolves: `dig rentals.deliwer.com CNAME`

**Assets returning 404:**
The wildcard rewrite (`/(.*) → deliwer.com/$1`) forwards all asset requests to the
**main domain** (`deliwer.com`), not `rentals.deliwer.com`. As long as these are
served correctly on `deliwer.com`, they will resolve on the subdomain too.

**Page not loading after DNS change:**
Allow up to 48 hours for full propagation. Use `dig rentals.deliwer.com` to check.
