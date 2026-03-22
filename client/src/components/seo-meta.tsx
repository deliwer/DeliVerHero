import { Helmet } from "react-helmet";

interface SEOMetaProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
}

const SITE_NAME = "DeliWer";
const DEFAULT_OG_IMAGE = "https://www.deliwer.com/deliwer-og-image.png";
const DEFAULT_KEYWORDS =
  "Ejari Dubai, Ejari Registration, DEWA Activation Dubai, Move-In Services Dubai, Dubai Relocation, Moving to Dubai, Dubai Tenant Services, Apartment Activation Dubai, Move-Out Services Dubai, DeliWer, Dubai Expats";

const SCHEMA_ORG = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "DeliWer",
  url: "https://www.deliwer.com",
  logo: "https://www.deliwer.com/logo.png",
  description:
    "DeliWer is Dubai's relocation back-office — handling Ejari registration, DEWA activation, movers coordination, move-in and move-out concierge, and rental intelligence for tenants, expats, and property managers.",
  telephone: "+971523946311",
  areaServed: { "@type": "City", name: "Dubai" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+971523946311",
    contactType: "customer service",
    areaServed: "AE",
    availableLanguage: ["English", "Arabic"],
  },
  sameAs: ["https://wa.me/971523946311"],
  priceRange: "AED 399–4500",
  openingHours: "Mo-Su 08:00-22:00",
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 25.2048,
      longitude: 55.2708,
    },
    geoRadius: "50000",
  },
});

export function SEOMeta({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  keywords = DEFAULT_KEYWORDS,
}: SEOMetaProps) {
  const url =
    canonical ||
    (typeof window !== "undefined" ? window.location.href : "https://www.deliwer.com");

  const fullTitle = `${title} | ${SITE_NAME} Dubai`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {url && <link rel="canonical" href={url} />}

      {/* Mobile & PWA */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      <meta name="theme-color" content="#10b981" />
      <meta name="format-detection" content="telephone=no" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_AE" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@DeliWerDubai" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Indexing — search engines and AI/LLM crawlers */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="DeliWer Dubai" />
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai, United Arab Emirates" />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />

      {/* Structured Data — LocalBusiness schema for Google & AI knowledge bases */}
      <script type="application/ld+json">{SCHEMA_ORG}</script>
    </Helmet>
  );
}
