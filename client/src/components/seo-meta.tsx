import { Helmet } from "react-helmet";

interface SEOMetaProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
}

export function SEOMeta({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = "/deliwer-og-image.png",
  keywords = "AquaCafe Move-In Welcome Service, Ejari Dubai, Ejari Registration, Move-In Services Dubai, DEWA Activation, Moving Coordination Dubai, Relocation Services Dubai, Dubai Expats, DeliWer Partners"
}: SEOMetaProps) {
  const url = canonical || typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Helmet>
      <title>{title} | DeliWer Dubai</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {url && <link rel="canonical" href={url} />}

      {/* Mobile & Viewport Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="DeliWer" />
      <meta name="theme-color" content="#10b981" />
      <meta name="format-detection" content="telephone=no" />

      {/* Open Graph */}
      <meta property="og:title" content={`${title} | DeliWer Dubai`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="DeliWer" />
      <meta property="og:locale" content="en_AE" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | DeliWer Dubai`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Indexing & SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="DeliWer Dubai" />
    </Helmet>
  );
}
