import { SERVICE_AREAS, SITE, SITE_LOGO } from "@/lib/site";
import { DEFAULT_OG_IMAGE, getSiteUrl } from "@/lib/seo";

/** Organization + WebSite structured data for rich results and local relevance. */
export function SiteJsonLd() {
  const base = getSiteUrl().replace(/\/$/, "");
  const logoUrl = new URL(SITE_LOGO.src, base).toString();
  const imageUrl = new URL(DEFAULT_OG_IMAGE.url, base).toString();

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": `${base}/#business`,
        name: SITE.name,
        description: SITE.tagline,
        url: base,
        telephone: SITE.phoneTel,
        email: SITE.email,
        image: imageUrl,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
          width: SITE_LOGO.width,
          height: SITE_LOGO.height,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.city,
          addressRegion: SITE.state,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 38.2527,
          longitude: -85.7585,
        },
        areaServed: SERVICE_AREAS.map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "07:00",
            closes: "19:00",
          },
        ],
        sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: SITE.name,
        url: base,
        description: SITE.tagline,
        publisher: { "@id": `${base}/#business` },
        about: { "@id": `${base}/#business` },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
