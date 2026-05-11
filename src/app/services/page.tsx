import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatWeOfferGrid } from "@/components/services/WhatWeOfferGrid";
import { SERVICES_HERO_IMAGE } from "@/lib/card-images";
import { pageMetadata } from "@/lib/seo";
import { SERVICE_AREAS, SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Ambulatory and wheelchair-accessible NEMT in Louisville, KY: hospital coordination, dialysis and infusion routes, therapy and dental visits, behavioral health rides, and senior-community partnerships.",
  pathname: "/services",
  keywords: [
    "wheelchair van services Louisville",
    "dialysis transportation KY",
    "hospital outpatient rides",
    "dental appointment transportation",
    "behavioral health transport",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <section
        className="relative flex min-h-[calc(100dvh-3.5rem)] flex-col justify-center overflow-hidden bg-dmz-dark"
        aria-labelledby="services-hero-heading"
      >
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={SERVICES_HERO_IMAGE}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-dmz-dark/92 via-dmz-dark/88 to-dmz-dark/95"
            aria-hidden
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/55">
            Services
          </p>
          <h1
            id="services-hero-heading"
            className="font-heading mt-4 max-w-4xl text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-white"
          >
            Medical Transportation For How You Move And Heal
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            From ambulatory escorts to wheelchair-accessible fleets, {SITE.name} aligns vehicles and staffing with
            each itinerary. Explore categories below, then request the ride that fits.
          </p>
        </div>
      </section>

      <WhatWeOfferGrid hideFooterServicesLink />

      <section
        className="border-t border-dmz-border bg-dmz-white pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-20"
        aria-labelledby="services-contact-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div className="flex flex-col border border-dmz-border bg-dmz-soft p-8 sm:p-10">
              <h2
                id="services-contact-heading"
                className="font-heading text-[24px] font-bold leading-tight text-dmz-dark"
              >
                Contact us
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-dmz-text">
                Questions about coverage, scheduling, or the right ride type? Send a note; we reply during posted
                hours. {SITE.hours}
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <div
              className="flex flex-col border border-dmz-border bg-dmz-soft p-8 sm:p-10"
              aria-labelledby="services-areas-heading"
            >
              <h2
                id="services-areas-heading"
                className="font-heading text-[24px] font-bold leading-tight text-dmz-dark"
              >
                Service areas
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-dmz-text">
                Counties and regions we regularly serve:
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {SERVICE_AREAS.map((area) => (
                  <li
                    key={area}
                    className="border border-dmz-border bg-dmz-white px-4 py-2 text-sm font-medium text-dmz-dark"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
