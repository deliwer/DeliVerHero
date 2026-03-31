import { Helmet } from "react-helmet";

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOMetaProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
  noIndex?: boolean;
  faqs?: FAQItem[];
  serviceSchema?: {
    name: string;
    description: string;
    price?: string;
    area?: string;
  };
}

const SITE_NAME = "DeliWer";
const BASE_URL = "https://www.deliwer.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/deliwer-og-image.png`;

const DEFAULT_KEYWORDS =
  // Core services
  "Ejari Dubai, Ejari Registration Dubai, DEWA Activation Dubai, Move-In Services Dubai, " +
  "Dubai Relocation, Moving to Dubai, Dubai Tenant Services, Apartment Activation Dubai, " +
  "Move-Out Services Dubai, Movers Dubai, Cleaning Dubai, Internet Setup Dubai, " +
  // Business
  "Dubai Business Setup, Free Zone Dubai, DAFZA, Dubai South Free Zone, Commercity Dubai, " +
  "Golden Visa Dubai, Investor Visa UAE, Dubai Company Formation, Mainland License Dubai, " +
  "Relocation Consultant Dubai, " +
  // Ejari specifics
  "Ejari Renewal Dubai, Ejari Cancellation Dubai, How to Register Ejari, Ejari Documents, " +
  "Ejari Transfer Dubai, RERA Dubai, Dubai Land Department, " +
  // Move-in areas
  "Move In JVC Dubai, Move In Dubai Marina, Move In Business Bay Dubai, Move In Downtown Dubai, " +
  "Move In Al Nahda Dubai, Move In Al Barsha Dubai, Move In Deira Dubai, Move In JLT Dubai, " +
  "Move In Dubai Hills, Move In Palm Jumeirah, Move In Karama Dubai, Move In Bur Dubai, " +
  "Move In International City Dubai, Move In Discovery Gardens Dubai, " +
  // GEO / expat intent
  "Dubai Expats, Dubai Rent Increase, UAE Tenancy Law, Dubai Rental Market, " +
  "Bayut Dubai, Property Finder Dubai, Dubizzle Dubai, " +
  // DeliWer brand
  "DeliWer, DeliWer Dubai, AquaCafe Dubai, Icelandic Glacial Dubai, " +
  // Emergency / preparedness
  "UAE emergency exit plan, Dubai evacuation plan, expat safety Dubai, emergency preparedness UAE";

const SCHEMA_ORG = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#organization`,
      name: "DeliWer",
      url: BASE_URL,
      logo: `${BASE_URL}/deliwer-logo.png`,
      image: `${BASE_URL}/deliwer-og-image.png`,
      description:
        "DeliWer is Dubai's all-in-one move-in and relocation platform — handling Ejari registration, DEWA activation, movers coordination, cleaning, internet setup, Free Zone company formation, Golden Visa assistance, and professional relocation concierge for expats and entrepreneurs.",
      telephone: "+971523946311",
      email: "info@deliwer.com",
      areaServed: [
        { "@type": "City", name: "Dubai" },
        { "@type": "City", name: "Sharjah" },
        { "@type": "State", name: "United Arab Emirates" },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "50 9WC 523 Block C, Dubai Airport Freezone",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+971523946311",
          contactType: "customer service",
          areaServed: "AE",
          availableLanguage: ["English", "Arabic"],
        },
        {
          "@type": "ContactPoint",
          email: "admin@deliwer.com",
          contactType: "reservation",
          description: "Book a relocation consultation session",
        },
      ],
      sameAs: [
        "https://wa.me/971523946311",
        "https://www.instagram.com/deliwerdubai",
      ],
      priceRange: "AED 320–9,999",
      openingHours: "Mo-Su 08:00-22:00",
      currenciesAccepted: "AED",
      paymentAccepted: "Cash, Credit Card, Bank Transfer",
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 25.2048,
          longitude: 55.2708,
        },
        geoRadius: "80000",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "DeliWer Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ejari Registration Dubai" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "DEWA Activation Dubai" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Move-In Concierge Dubai" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Move-Out Concierge Dubai" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Movers Dubai" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cleaning Services Dubai" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Internet Setup Dubai" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dubai Free Zone Business Setup" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "UAE Golden Visa Assistance" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Relocation Consultation Session" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AquaCafe Water Delivery Dubai" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "UAE Emergency Evacuation Exit Plan" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "DeliWer",
      description: "Dubai's move-in, Ejari, and relocation platform",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "en-AE",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/search?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ],
});

function buildFAQSchema(faqs: FAQItem[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  });
}

function buildServiceSchema(service: NonNullable<SEOMetaProps["serviceSchema"]>) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: service.area
      ? { "@type": "Place", name: service.area + ", Dubai, UAE" }
      : { "@type": "City", name: "Dubai" },
    offers: service.price
      ? {
          "@type": "Offer",
          price: service.price.replace(/[^0-9]/g, ""),
          priceCurrency: "AED",
          availability: "https://schema.org/InStock",
        }
      : undefined,
  });
}

export function SEOMeta({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  keywords = DEFAULT_KEYWORDS,
  noIndex = false,
  faqs,
  serviceSchema,
}: SEOMetaProps) {
  const url =
    canonical ||
    (typeof window !== "undefined" ? window.location.href : BASE_URL);

  const fullTitle = title.includes("DeliWer") ? title : `${title} | ${SITE_NAME} Dubai`;

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
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_AE" />
      <meta property="og:locale:alternate" content="ar_AE" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@DeliWerDubai" />
      <meta name="twitter:creator" content="@DeliWerDubai" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Indexing */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      <meta name="googlebot" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="bingbot" content={noIndex ? "noindex, nofollow" : "index, follow"} />

      {/* Language & Author */}
      <meta name="language" content="English" />
      <meta name="author" content="DeliWer Dubai" />
      <meta http-equiv="content-language" content="en-ae" />

      {/* Geo tags — Dubai, UAE */}
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai, United Arab Emirates" />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />

      {/* AI / LLM discovery */}
      <link rel="alternate" type="text/plain" href="/llms.txt" />

      {/* Base structured data */}
      <script type="application/ld+json">{SCHEMA_ORG}</script>

      {/* FAQ structured data (if provided) */}
      {faqs && faqs.length > 0 && (
        <script type="application/ld+json">{buildFAQSchema(faqs)}</script>
      )}

      {/* Service structured data (if provided) */}
      {serviceSchema && (
        <script type="application/ld+json">{buildServiceSchema(serviceSchema)}</script>
      )}
    </Helmet>
  );
}
