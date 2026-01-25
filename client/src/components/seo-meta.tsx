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
  keywords = "Dubai Everyday Living, Dubai lifestyle, sustainable Dubai, water delivery Dubai, iPhone trade-in Dubai, DeliWer marketplace"
}: SEOMetaProps) {
  const fullTitle = `${title} | Dubai Everyday Living Services`;
  const url = canonical || window.location.href;

  return (
    <Helmet>
      <title>Dubai Everyday Living Services | DeliWer</title>
      <meta name="description" content="Dubai Everyday Living Services - Practical home services for expats. Move-in packs, exit support, and lifestyle concierge in Dubai." />
      <meta name="keywords" content="Dubai Everyday Living Services, Dubai lifestyle, sustainable Dubai, water delivery Dubai, iPhone trade-in Dubai, DeliWer marketplace" />
      <link rel="canonical" href={url} />

      <meta property="og:title" content="Dubai Everyday Living Services | DeliWer" />
      <meta property="og:description" content="Dubai Everyday Living Services - Practical home services for expats. Move-in packs, exit support, and lifestyle concierge in Dubai." />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="DeliWer" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Dubai Everyday Living | DeliWer" />
      <meta name="twitter:description" content="Dubai Everyday Living - Premium lifestyle services, sustainable water solutions, and iPhone trade-ins." />
      <meta name="twitter:image" content={ogImage} />

      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
    </Helmet>
  );
}
