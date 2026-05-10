# water.deliwer.com — Vercel Rewrite Setup

## Goal

`https://water.deliwer.com` → serves content from `https://deliwer.com/aquacafe`
The browser URL stays as `water.deliwer.com` — no redirect, transparent proxy.

---

## How It Works

```
User visits water.deliwer.com/
        │
        ▼
Vercel edge (water project)
        │  rewrite (not redirect)
        ▼
deliwer.com/aquacafe   ← content served here
        │
        ▼
Browser still shows water.deliwer.com ✓
```

All nested paths (`/api/*`, `/assets/*`) are forwarded via the wildcard rewrite,
so images, fonts, API calls, and subscription flows all resolve correctly.

---

## Part 1 — Create the Vercel Project

```bash
cd water-config
vercel --prod
```

When prompted:
- **Project name:** `deliwer-water-portal`
- **Framework:** Other (no framework)
- **Build command:** *(leave blank)*
- **Output directory:** *(leave blank)*
- **Root directory:** `water-config/`

---

## Part 2 — DNS Setup

Add a CNAME record in your DNS provider:

| Type  | Host    | Value                  | TTL  |
|-------|---------|------------------------|------|
| CNAME | `water` | `cname.vercel-dns.com` | 3600 |

> **Cloudflare users:** Set proxy to **DNS only** (grey cloud) during initial setup.
> Re-enable after Vercel issues the SSL certificate.

Then in the Vercel dashboard for `deliwer-water-portal`:
1. **Settings → Domains → Add Domain**
2. Enter `water.deliwer.com`
3. Vercel confirms the CNAME and issues SSL automatically

---

## Part 3 — Deployment Commands

```bash
# First-time deploy
cd water-config
vercel --prod

# Re-deploy after changes
vercel --prod --force

# Check deployments
vercel ls

# Inspect a deployment
vercel inspect <deployment-url>
```

---

## Part 4 — Verifying It Works

```bash
# Should return 200 with AquaCafe content
curl -I https://water.deliwer.com/

# Check page content
curl -s https://water.deliwer.com/ | grep -i "water\|aqua\|filter\|subscription" | head -5

# Verify SSL
openssl s_client -connect water.deliwer.com:443 -servername water.deliwer.com </dev/null 2>&1 | grep "subject\|issuer\|Verify"

# DNS check
dig water.deliwer.com CNAME
```

---

## Part 5 — Troubleshooting

### DEPLOYMENT_NOT_FOUND
1. Run `vercel --prod` from `water-config/`
2. Re-add `water.deliwer.com` in Vercel dashboard → Settings → Domains
3. Verify DNS: `dig water.deliwer.com CNAME`

### Rewrite Loops
The wildcard points to `deliwer.com`, not `water.deliwer.com`. Keep as separate Vercel projects.

### SSL Certificate Issues
1. Confirm CNAME: `dig water.deliwer.com`
2. Vercel dashboard → Domains → click **Refresh**
3. Disable Cloudflare orange cloud temporarily if needed

### 404 on Static Assets
The wildcard rewrite `/(.*) → https://deliwer.com/$1` handles all assets automatically.
Ensure Vite builds with `base: "/"`.

### Domain Verification Issues
1. `dig water.deliwer.com CNAME` must show `cname.vercel-dns.com`
2. Remove domain from any other Vercel project first
3. `vercel domains inspect water.deliwer.com`

---

## Part 6 — Campaign Usage

`water.deliwer.com` is ideal for:
- QR codes printed on building handover packets
- Property manager WhatsApp referrals
- Building manager partnership flyers
- Move-in bundle upsell messages

Example WhatsApp message:
```
Your new apartment needs clean water from day one.
Order your AquaCafe filter: water.deliwer.com
Free installation included with move-in package.
```

---

## Full Subdomain Architecture

```
deliwer.com                        (main Vercel project)
  ├── /aquacafe                    ← water filter / subscription page
  ├── /ejari-registration
  ├── /move-in-services
  ├── /earn
  ├── /broker-onboard
  ├── /realestate
  └── ...all other routes

water.deliwer.com                  (separate Vercel project — water-config/)
ejari.deliwer.com                  (separate Vercel project — ejari-config/)
move.deliwer.com                   (separate Vercel project — move-config/)
earn.deliwer.com                   (separate Vercel project — earn-config/)
brokers.deliwer.com                (separate Vercel project — brokers-config/)
realestate.deliwer.com             (separate Vercel project — redirect-config/)
```
