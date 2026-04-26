#!/usr/bin/env bash
# Pre-deploy gate:
#   1) build the app
#   2) static name-resolution check (catches missing imports)
#   3) boot the built server on a temp port and ping every route
# Blocks deployment if any step fails.
set -euo pipefail

SMOKE_PORT="${SMOKE_PORT:-5050}"
SMOKE_BOOT_TIMEOUT="${SMOKE_BOOT_TIMEOUT:-30}"
SERVER_PID=""
SERVER_LOG="$(mktemp)"

cleanup() {
  if [[ -n "$SERVER_PID" ]] && kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "[predeploy] Shutting down smoke server (pid=$SERVER_PID)"
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
  rm -f "$SERVER_LOG"
}
trap cleanup EXIT INT TERM

echo "[predeploy] Step 1/3 — building app (npm run build)"
npm run build

echo ""
echo "[predeploy] Step 2/3 — running static route smoke check"
npx tsx scripts/smoke-routes.ts --static-only

echo ""
echo "[predeploy] Step 3/3 — booting built server on port $SMOKE_PORT for HTTP smoke"
NODE_ENV=production PORT="$SMOKE_PORT" node dist/index.js > "$SERVER_LOG" 2>&1 &
SERVER_PID=$!
echo "[predeploy] Server pid=$SERVER_PID, waiting up to ${SMOKE_BOOT_TIMEOUT}s for readiness..."

ready=0
for ((i=0; i<SMOKE_BOOT_TIMEOUT; i++)); do
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "[predeploy] ✖ Server process died before becoming ready. Last log lines:"
    tail -n 40 "$SERVER_LOG" || true
    exit 1
  fi
  if curl -sf -o /dev/null "http://localhost:$SMOKE_PORT/" 2>/dev/null; then
    ready=1
    break
  fi
  sleep 1
done

if [[ "$ready" -ne 1 ]]; then
  echo "[predeploy] ✖ Server did not respond within ${SMOKE_BOOT_TIMEOUT}s. Last log lines:"
  tail -n 40 "$SERVER_LOG" || true
  exit 1
fi

echo "[predeploy] Server ready, running HTTP smoke against port $SMOKE_PORT"
SMOKE_BASE_URL="http://localhost:$SMOKE_PORT" npx tsx scripts/smoke-routes.ts

echo ""
echo "[predeploy] ✓ All checks passed — ready to deploy."
