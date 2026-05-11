import type { Metadata } from "next";
import { FaqAccordionTwoColumn } from "@/components/FaqAccordion";
import { PageIntro } from "@/components/PageIntro";
import { FAQ_COLUMN_LEFT, FAQ_COLUMN_RIGHT } from "@/lib/faqs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQs",
  description: `Frequently asked questions about booking, accessibility, coverage, and billing for ${SITE.name} non-emergency medical transportation.`,
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  return (
    <>
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
