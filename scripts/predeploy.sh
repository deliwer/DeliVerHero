#!/usr/bin/env bash
# Pre-deploy gate: build the app, then run the static smoke check.
# Blocks deployment if either step fails.
set -euo pipefail

echo "[predeploy] Step 1/2 — building app (npm run build)"
npm run build

echo ""
echo "[predeploy] Step 2/2 — running static route smoke check"
npx tsx scripts/smoke-routes.ts --static-only

echo ""
echo "[predeploy] ✓ All checks passed — ready to deploy."
