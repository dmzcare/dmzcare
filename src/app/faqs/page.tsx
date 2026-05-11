import type { Metadata } from "next";
import { FaqAccordionTwoColumn } from "@/components/FaqAccordion";
import { PageIntro } from "@/components/PageIntro";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { FAQ_COLUMN_LEFT, FAQ_COLUMN_RIGHT } from "@/lib/faqs";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "FAQs",
  description: `Frequently asked questions about booking ${SITE.name} rides, wheelchair-accessible vehicles, service areas, billing, insurance, and driver assistance in the Louisville region.`,
  pathname: "/faqs",
  keywords: [
    "NEMT FAQ Louisville",
    "wheelchair ride questions",
    "medical transportation booking help",
  ],
});

export default function FaqsPage() {
  return (
    <>
      <FaqPageJsonLd />
      <PageIntro
        eyebrow="FAQs"
        title="Straight Answers For Booking And Rides"
        description={`Transparency builds trust. Here is how ${SITE.name} approaches scheduling, accessibility, and coordination across the Louisville region.`}
      />
      <section className="bg-dmz-soft pb-20 lg:pb-28">
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
          <FaqAccordionTwoColumn
            left={FAQ_COLUMN_LEFT}
            right={FAQ_COLUMN_RIGHT}
            idPrefix="faq-page"
          />
        </div>
      </section>
    </>
  );
}
