// ─────────────────────────────────────────────────────────────────────────────
// next.config.js — Next.js redirect fallback for realestate.deliwer.com
//
// Purpose:
//   Acts as a second layer of redirect logic if vercel.json is not processed
//   (e.g. during local `next dev` testing, or in edge cases on older Vercel plans).
//
// This file is intentionally minimal — it only handles redirects.
// It does NOT affect the main deliwer.com Next.js/Express configuration.
// ─────────────────────────────────────────────────────────────────────────────

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Redirects ──────────────────────────────────────────────────────────────
  // async redirects() is called at build time by Next.js.
  // Vercel processes vercel.json FIRST; this runs as a fallback.
  async redirects() {
    return [
      {
        // Redirect the bare root path
        source: "/",
        destination: "https://deliwer.com/realestate",
        // permanent: true  →  HTTP 308 (Next.js maps this to 301 in Vercel output)
        permanent: true,
      },
      {
        // Catch-all: redirect any sub-path to the main /realestate page.
        // Use /:path* as destination if you want to forward sub-paths.
        source: "/:path*",
        destination: "https://deliwer.com/realestate",
        permanent: true,
      },
    ];
  },

  // ── Optional rewrite alternative ───────────────────────────────────────────
  // Uncomment the block below (and comment out the redirects block above) if
  // you want the URL to STAY as realestate.deliwer.com while serving
  // deliwer.com/realestate content invisibly (proxy/rewrite mode).
  //
  // async rewrites() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "https://deliwer.com/realestate",
  //     },
  //     {
  //       source: "/:path*",
  //       destination: "https://deliwer.com/realestate/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
