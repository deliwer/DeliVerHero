import { Helmet } from "react-helmet";

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface HowToStep {
  name: string;
  text: string;
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
  dateModified?: string;
  breadcrumbs?: BreadcrumbItem[];
  webPageType?: "WebPage" | "AboutPage" | "ServicePage" | "FAQPage" | "CollectionPage" | "ContactPage" | "Article";
  howTo?: {
    name: string;
    description: string;
    steps: HowToStep[];
    totalTime?: string;
    estimatedCost?: string;
  };
}

const SITE_NAME = "DeliWer";
const BASE_URL = "https://www.deliwer.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/deliwer-og-image.png`;

const DEFAULT_KEYWORDS =
  // Core move-in services
  "Ejari Dubai, Ejari Registration Dubai, DEWA Activation Dubai, Move-In Services Dubai, " +
  "Dubai Relocation, Moving to Dubai, Dubai Tenant Services, Apartment Activation Dubai, " +
  "Move-Out Services Dubai, Movers Dubai, Cleaning Dubai, Internet Setup Dubai, " +
  // Flex living / monthly rooms
  "Room for Rent Dubai Monthly, Flex Living Dubai, Monthly Rooms Dubai, " +
  "Shared Villa Dubai Monthly, Partition Room Dubai, Bed Space Dubai, Studio Dubai Monthly, " +
  "Room Rent Dubai No Annual Contract, Furnished Room Dubai Monthly, " +
  "Dubai Shared Accommodation, Monthly Rental Dubai, Short-Term Rental Dubai, " +
  "Co-Living Dubai, Room for Rent JVC Dubai, Room for Rent Dubai Marina, " +
  "Room for Rent Business Bay, Room for Rent Al Barsha, Room for Rent Deira, " +
  "Room for Rent International City, Dubizzle Dubai Rooms, " +
  // Business
  "Dubai Business Setup, Free Zone Dubai, DAFZA, Dubai South Free Zone, " +
  "Golden Visa Dubai, Investor Visa UAE, Dubai Company Formation, Mainland License Dubai, " +
  "Relocation Consultant Dubai, " +
  // Ejari specifics
  "Ejari Renewal Dubai, Ejari Cancellation Dubai, How to Register Ejari, Ejari Documents, " +
  "Ejari Transfer Dubai, RERA Dubai, Dubai Land Department, RERA Trustee Center Dubai, " +
  // Move-in areas
  "Move In JVC Dubai, Move In Dubai Marina, Move In Business Bay Dubai, Move In Downtown Dubai, " +
  "Move In Al Nahda Dubai, Move In Al Barsha Dubai, Move In Deira Dubai, Move In JLT Dubai, " +
  "Move In Dubai Hills, Move In Palm Jumeirah, Move In Karama Dubai, Move In Bur Dubai, " +
  "Move In International City Dubai, Move In Discovery Gardens Dubai, Move In Mirdif Dubai, " +
  "Move In Silicon Oasis Dubai, Move In Al Furjan Dubai, Move In Jumeirah Dubai, " +
  // GEO / expat intent — phrases AI engines answer
  "Dubai Expats, Dubai Rent Increase, UAE Tenancy Law, Dubai Rental Market, " +
  "How to move to Dubai, Moving to Dubai guide, Dubai expat housing, " +
  "Bayut Dubai, Property Finder Dubai, Dubizzle Dubai, " +
  // DeliWer brand
  "DeliWer, DeliWer Dubai, AquaCafe Dubai, Icelandic Glacial Dubai, " +
  // Emergency / preparedness
  "UAE emergency exit plan, Dubai evacuation plan, expat safety Dubai, emergency preparedness UAE";

// Comprehensive organization schema reused across all pages
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
        "DeliWer is Dubai's all-in-one move-in and relocation platform — handling Ejari registration through RERA-authorized Trustee Centers, DEWA activation, movers, professional cleaning, internet setup, water filtration, flexible monthly accommodation (rooms, shared villas, studios, bed spaces with no annual contract), Dubai business setup in Free Zones, and full relocation concierge for expats and entrepreneurs.",
      telephone: "+971523946311",
      email: "info@deliwer.com",
      foundingDate: "2023",
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
          url: "https://wa.me/971523906019",
          contactType: "sales",
          description: "WhatsApp — fastest response, no forms required",
        },
      ],
      sameAs: [
        "https://wa.me/971523906019",
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
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "27",
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Zoya Abassi" },
          datePublished: "2026-04-15",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          reviewBody:
            "I recently had shower filters installed in my shower heads, and I'm very happy with the results. The installation process was smooth and hassle-free, and the team was professional and efficient. The water feels cleaner and gentler, especially on skin and hair. I would definitely recommend their service.",
          publisher: { "@type": "Organization", name: "Google" },
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Nicole Oliver" },
          datePublished: "2026-04-15",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          reviewBody:
            "Just moved into my new place at Marina and DeliWer set up the complete water system for me — including a free hair shower filter! The installation team was fast and professional. Worth every dirham!",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "DeliWer Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ejari Registration Dubai", description: "RERA-authorized Ejari registration for Dubai tenancy contracts" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "DEWA Activation Dubai", description: "Electricity and water connection activation for new Dubai apartments" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Move-In Concierge Dubai", description: "Full move-in coordination: Ejari, DEWA, movers, cleaning, internet setup" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Move-Out Concierge Dubai", description: "Ejari cancellation, final cleaning, and exit coordination" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Flex Living Dubai — Monthly Rooms", description: "Flexible monthly rooms, shared villas, studios and bed spaces in Dubai with no annual contract. From AED 550/month." } },
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
      description: "Dubai's move-in concierge, Ejari, DEWA and flexible monthly accommodation platform",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "en-AE",
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/search?q={search_term_string}`,
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

function buildBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      ...breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: b.name,
        item: b.url.startsWith("http") ? b.url : `${BASE_URL}${b.url}`,
      })),
    ],
  });
}

function buildWebPageSchema(type: string, title: string, description: string, url: string, modDate: string) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "en-AE",
    dateModified: modDate,
  });
}

function buildHowToSchema(howTo: NonNullable<SEOMetaProps["howTo"]>) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    ...(howTo.totalTime && { totalTime: howTo.totalTime }),
    ...(howTo.estimatedCost && {
      estimatedCost: { "@type": "MonetaryAmount", currency: "AED", value: howTo.estimatedCost },
    }),
    step: howTo.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
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
  dateModified,
  breadcrumbs,
  webPageType,
  howTo,
}: SEOMetaProps) {
  const url =
    canonical ||
    (typeof window !== "undefined" ? window.location.href : BASE_URL);

  const fullTitle = title.includes("DeliWer") ? title : `${title} | ${SITE_NAME} Dubai`;
  const modDate = dateModified || "2026-05-25";

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
      <meta property="article:modified_time" content={modDate} />

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

      {/* Geo — Dubai, UAE */}
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai, United Arab Emirates" />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />

      {/* AI / GEO — Generative Engine Optimization signals */}
      <link rel="alternate" type="text/plain" href="/llms.txt" />
      <meta name="ai-content-declaration" content="human-written" />

      {/* Base structured data */}
      <script type="application/ld+json">{SCHEMA_ORG}</script>

      {/* FAQ structured data */}
      {faqs && faqs.length > 0 && (
        <script type="application/ld+json">{buildFAQSchema(faqs)}</script>
      )}

      {/* Service structured data */}
      {serviceSchema && (
        <script type="application/ld+json">{buildServiceSchema(serviceSchema)}</script>
      )}

      {/* BreadcrumbList */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json">{buildBreadcrumbSchema(breadcrumbs)}</script>
      )}

      {/* WebPage entity */}
      {webPageType && (
        <script type="application/ld+json">{buildWebPageSchema(webPageType, fullTitle, description, url, modDate)}</script>
      )}

      {/* HowTo */}
      {howTo && (
        <script type="application/ld+json">{buildHowToSchema(howTo)}</script>
      )}
    </Helmet>
  );
}
