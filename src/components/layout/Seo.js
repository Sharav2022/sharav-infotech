import Head from "next/head";
import { SITE } from "../../content/site";

// Per-page metadata: title, description, canonical URL, Open Graph and
// Twitter cards, plus optional JSON-LD structured data.
export default function Seo({
  title,
  description = SITE.description,
  path = "/",
  image = "/brand/og-image.png",
  type = "website",
  noindex = false,
  jsonLd,
}) {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} | Software, Cloud & IT Consulting`;
  const url = `${SITE.url}${path === "/" ? "/" : path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE.url}${image}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_CA" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd && (
        <script
          type="application/ld+json"
          // JSON.stringify output is safe here; escape "<" to prevent </script> breakout.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </Head>
  );
}

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/brand/icon-512.png`,
  image: `${SITE.url}/brand/og-image.png`,
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phone.e164,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  areaServed: "CA",
  sameAs: SITE.social.map((profile) => profile.url),
});
