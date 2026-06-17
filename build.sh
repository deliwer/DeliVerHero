#!/usr/bin/env bash
set -e

echo "==> Setting up esbuild platform binaries"

setup_esbuild() {
  local prefix="$1"
  local src="${prefix}@esbuild/linux-x64/bin/esbuild"
  local dst="${prefix}esbuild/bin/esbuild"
  if [ -f "$src" ] && [ -d "${prefix}esbuild" ]; then
    mkdir -p "${prefix}esbuild/bin"
    cp "$src" "$dst"
    chmod +x "$dst"
    echo "    installed: $dst"
  fi
}

# Root esbuild
setup_esbuild "node_modules/"
# Nested instances
setup_esbuild "node_modules/vite/node_modules/"
setup_esbuild "node_modules/tsx/node_modules/"
setup_esbuild "node_modules/drizzle-kit/node_modules/"
setup_esbuild "node_modules/@esbuild-kit/core-utils/node_modules/"

echo "==> Building app"
npm run build

echo "==> Build complete"
