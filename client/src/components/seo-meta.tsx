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
  keywords = "Dubai Move-In Concierge, Relocation Services Dubai, Ejari Support, DEWA Assistance, Dubai Expats, DeliWer Partners"
}: SEOMetaProps) {
  const url = canonical || typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Helmet>
      <title>{title} | DeliWer Dubai</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {url && <link rel="canonical" href={url} />}

      <meta property="og:title" content={`${title} | DeliWer Dubai`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="DeliWer" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | DeliWer Dubai`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
}
