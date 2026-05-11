import { FAQ_ALL } from "@/lib/faqs";
import { getSiteUrl } from "@/lib/seo";

/** FAQ rich results — pairs with `/faqs` content. */
export function FaqPageJsonLd() {
  const base = getSiteUrl().replace(/\/$/, "");

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${base}/faqs#faqpage`,
    url: `${base}/faqs`,
    mainEntity: FAQ_ALL.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
