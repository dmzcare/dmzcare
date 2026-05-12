import type { Metadata } from "next";
import Image from "next/image";
import { AboutHeroLogo } from "@/components/about/AboutHeroLogo";
import { GuidingPrinciplesSlider } from "@/components/about/GuidingPrinciplesSlider";
import { RideReadyCta } from "@/components/about/RideReadyCta";
import { AboutImageReveal } from "@/components/AboutImageReveal";
import { BookingForm } from "@/components/forms/BookingForm";
import { WhatWeOfferGrid } from "@/components/services/WhatWeOfferGrid";
import { ABOUT_MISSION_IMAGE } from "@/lib/card-images";
import { ABOUT_OG_IMAGE, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description: `Learn how ${SITE.name} delivers dependable non-emergency medical transportation across Louisville and the surrounding region. Scheduling discipline, dignity on every trip, and partnerships with care teams.`,
  pathname: "/about",
  keywords: [
    "about DMZ Care",
    "NEMT company Louisville",
    "medical transport mission",
    "patient dignity transportation",
  ],
  ogImage: ABOUT_OG_IMAGE,
});

/** Scroll-zoom visual below the about hero (`AboutImageReveal`). */
const ABOUT_SCROLL_IMG = "/hero%202.webp";

const ABOUT_INTRO = `${SITE.name} exists because getting to care should never be the hardest part of the day. We combine disciplined scheduling with a human touch, so riders feel steady, not rushed.`;

export default function AboutPage() {
  return (
    <>
      <section
        id="about-hero"
        className="relative z-20 isolate flex min-h-[calc(100svh_-_76px_-_10vh)] flex-col bg-dmz-white"
      >
        <div className="grid flex-1 grid-cols-[minmax(0,0.38fr)_1px_minmax(0,1fr)] items-stretch gap-10 px-4 py-10 sm:gap-12 sm:px-6 md:gap-16 md:px-8 lg:gap-28 lg:px-16 lg:py-24 xl:gap-36 xl:px-24">
          <div className="flex items-center justify-center py-2 md:justify-end md:py-8">
            <AboutHeroLogo />
          </div>

          <div className="w-px shrink-0 bg-dmz-border" aria-hidden />

          <div className="flex min-w-0 max-w-5xl items-center xl:max-w-6xl">
            <p className="font-heading text-[clamp(1.05rem,3.4vw,3.25rem)] font-semibold leading-[1.14] tracking-[-0.04em] text-dmz-dark">
              {ABOUT_INTRO}
            </p>
          </div>
        </div>

        <a
          href="#about-visual"
          className="group absolute bottom-28 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-dmz-border/80 bg-white/95 px-4 py-2.5 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-dmz-dark shadow-[0_10px_28px_-14px_rgba(26,26,26,0.35)] backdrop-blur-sm transition hover:border-dmz-dark/25 hover:bg-white hover:text-dmz-dark sm:bottom-32 lg:bottom-36"
          aria-label="Scroll to explore the about page"
        >
          <span className="grid size-4 place-items-center rounded-full border border-dmz-dark/30 transition group-hover:border-dmz-dark/55">
            <span className="size-1 rounded-full bg-dmz-dark/55" />
          </span>
          Scroll to explore
        </a>
      </section>

      <AboutImageReveal src={ABOUT_SCROLL_IMG} heroSectionId="about-hero" />

      <GuidingPrinciplesSlider />

      <section className="bg-dmz-soft">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:flex lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          <div className="relative mb-12 lg:mb-0 lg:w-7/12">
            <div className="relative aspect-[5/4] min-h-[280px] overflow-hidden ring-1 ring-dmz-border sm:min-h-[340px] lg:aspect-[6/5] lg:min-h-[min(520px,52vh)]">
              <Image
                src={ABOUT_MISSION_IMAGE}
                alt="Warm greeting outside a suburban home, reflecting approachable transportation care"
                fill
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -right-2 top-8 hidden bg-dmz-accent px-4 py-3 text-sm font-semibold text-dmz-dark sm:block">
              Built around dignity &amp; punctuality
            </div>
          </div>
          <div className="lg:w-5/12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dmz-text">
              Our Mission
            </p>
            <h2 className="font-heading mt-4 text-[44px] sm:text-[48px] lg:text-[52px] font-bold leading-[1.12] tracking-tight text-dmz-dark">
              Attention To Detail On Every Trip
            </h2>
            <p className="mt-6 text-base leading-relaxed text-dmz-text">
              We move people between home and healing spaces with consistency and respect. That means
              proactive communication, careful assistance at the curb, and partnerships with discharge
              planners and clinic teams who need predictable outcomes, not surprises.
            </p>
            <p className="mt-4 text-base leading-relaxed text-dmz-text">
              Every route is planned with traffic patterns, appointment buffers, and rider comfort in
              mind, because dignity is part of the standard of care.
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <WhatWeOfferGrid />
      </div>

      <RideReadyCta bookTripHref="#about-book-a-ride" />

      <section
        id="about-book-a-ride"
        className="scroll-mt-28 bg-dmz-white pb-20 lg:pb-28"
        aria-labelledby="about-booking-heading"
      >
        <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dmz-text">Book a ride</p>
            <h2
              id="about-booking-heading"
              className="font-heading mt-4 text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-dmz-dark"
            >
              Request your ride
            </h2>
            <p className="mt-4 text-base leading-relaxed text-dmz-text">
              Share pickup and destination, timing, and mobility needs. Dispatch will confirm vehicle type and
              details before ride day. Same form as our{" "}
              <a href="/booking" className="font-semibold text-dmz-dark underline underline-offset-4 hover:text-dmz-text">
                booking page
              </a>
              .
            </p>
            <div className="mt-10 border border-dmz-border bg-dmz-soft p-8 sm:p-10">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
