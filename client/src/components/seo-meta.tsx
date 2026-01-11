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
  keywords = "iPhone trade-in Dubai, sell iPhone UAE, Planet Points, water delivery Dubai, sustainability rewards, eco-friendly Dubai, iPhone buyback, DeliWer"
}: SEOMetaProps) {
  const fullTitle = `${title} | DeliWer - Dubai's iPhone to Water Trade Platform`;
  const url = canonical || window.location.href;

  return (
    <Helmet>
      <title>Dubai Everyday Living | DeliWer - Lifestyle Marketplace</title>
      <meta name="description" content="Dubai Everyday Living - Premium lifestyle services, sustainable water solutions, and iPhone trade-ins. Experience the best of Dubai living with DeliWer." />
      <meta name="keywords" content="Dubai Everyday Living, Dubai lifestyle, sustainable Dubai, water delivery Dubai, iPhone trade-in Dubai, DeliWer marketplace" />
      <link rel="canonical" href={url} />

      <meta property="og:title" content="Dubai Everyday Living | DeliWer" />
      <meta property="og:description" content="Dubai Everyday Living - Premium lifestyle services, sustainable water solutions, and iPhone trade-ins." />
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
