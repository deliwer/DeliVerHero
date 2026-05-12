/**
 * next.config.js — Rewrite configuration reference
 *
 * NOTE: DeliWer runs on Vite + Express, NOT Next.js.
 * This file is provided as a reference for any future Next.js micro-frontend
 * or if the realestate portal is ever migrated to a Next.js standalone project.
 *
 * For the active Vercel deployment, use vercel.json in this same directory.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        /**
         * Root rewrite — maps realestate.deliwer.com/ to the real estate portal page.
         * The browser URL remains realestate.deliwer.com; content comes from deliwer.com.
         */
        source: "/",
        destination: "https://deliwer.com/realestate",
      },
      {
        /**
         * Wildcard rewrite — maps all other paths (e.g. /api/*, /assets/*) through
         * to deliwer.com so static assets, fonts, and API calls resolve correctly.
         * :path* captures and forwards the full path segment.
         */
        source: "/:path*",
        destination: "https://deliwer.com/:path*",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",          value: "SAMEORIGIN" },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
