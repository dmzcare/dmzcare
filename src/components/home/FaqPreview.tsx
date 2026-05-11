import Link from "next/link";
import { FaqAccordionTwoColumn } from "@/components/FaqAccordion";
import { FAQ_COLUMN_LEFT, FAQ_COLUMN_RIGHT } from "@/lib/faqs";

export function FaqPreview() {
  return (
    <section className="bg-dmz-soft">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dmz-text">FAQs</p>
          <h2 className="font-heading mt-4 text-[52px] font-bold leading-[1.12] tracking-tight text-dmz-dark">
            Clear Answers For Common Questions
          </h2>
          <p className="mt-4 text-dmz-text">
            Quick clarity: read more on our{" "}
            <Link href="/faqs" className="font-semibold text-dmz-dark underline underline-offset-4">
              full FAQ page
            </Link>
            .
          </p>
        </div>
        <div className="mt-12">
          <FaqAccordionTwoColumn
            left={FAQ_COLUMN_LEFT}
            right={FAQ_COLUMN_RIGHT}
            idPrefix="home-faq"
          />
        </div>
      </div>
    </section>
  );
}
