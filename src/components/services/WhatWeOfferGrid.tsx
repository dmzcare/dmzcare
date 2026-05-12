import Image from "next/image";
import Link from "next/link";
import {
  ADULTS_DAY_CARE_FACILITIES_CARD_IMAGE,
  BEHAVIORAL_MENTAL_HEALTH_CARD_IMAGE,
  DENTAL_APPOINTMENTS_CARD_IMAGE,
  DIALYSIS_TREATMENTS_CARD_IMAGE,
  DOCTOR_VISITS_CARD_IMAGE,
  HOSPITAL_OUTPATIENT_SERVICES_CARD_IMAGE,
  PHYSICAL_THERAPY_SESSIONS_CARD_IMAGE,
} from "@/lib/card-images";
import { SERVICE_OFFERINGS } from "@/lib/site";

/** Same watermark as homepage About DMZ Care (`AboutSummary`). */
const OFFER_PATTERN = "/Pattern%20DMZ%20Care%20Logo.webp";

type Plate = "dark" | "accent" | "gray" | "white" | "orange";

type ServiceBlock = {
  slug: string;
  title: string;
  description: string;
  plate: Plate;
  /** Full-bleed photo on hover (same pattern as About → What guides us) */
  image: string;
};

/** Appointment-type tiles; used on the Services page (masonry grid). */
const SERVICE_BLOCKS: ServiceBlock[] = [
  {
    slug: SERVICE_OFFERINGS[0].slug,
    title: SERVICE_OFFERINGS[0].label,
    description:
      "Door-to-clinic rides that keep annual exams, specialty consults, and imaging days steady. Arrivals lined up with registration and labs.",
    plate: "dark",
    image: DOCTOR_VISITS_CARD_IMAGE,
  },
  {
    slug: SERVICE_OFFERINGS[1].slug,
    title: SERVICE_OFFERINGS[1].label,
    description:
      "Chair-time fidelity for dialysis and infusion: recurring routes planned so tight treatment windows stay dependable visit after visit.",
    plate: "accent",
    image: DIALYSIS_TREATMENTS_CARD_IMAGE,
  },
  {
    slug: SERVICE_OFFERINGS[2].slug,
    title: SERVICE_OFFERINGS[2].label,
    description:
      "Timed around rehab gains, with extra patience at pickup when braces, soreness, or gait aids slow each step.",
    plate: "gray",
    image: PHYSICAL_THERAPY_SESSIONS_CARD_IMAGE,
  },
  {
    slug: SERVICE_OFFERINGS[3].slug,
    title: SERVICE_OFFERINGS[3].label,
    description:
      "Same-day suites handled with coordinated arrivals, then a composed ride home while discharge guidance is still top of mind.",
    plate: "white",
    image: HOSPITAL_OUTPATIENT_SERVICES_CARD_IMAGE,
  },
  {
    slug: SERVICE_OFFERINGS[4].slug,
    title: SERVICE_OFFERINGS[4].label,
    description:
      "Respectful transportation to therapy, psychiatry, IOP, and related visits. Details stay private from booking through drop-off.",
    plate: "dark",
    image: BEHAVIORAL_MENTAL_HEALTH_CARD_IMAGE,
  },
  {
    slug: SERVICE_OFFERINGS[5].slug,
    title: SERVICE_OFFERINGS[5].label,
    description:
      "Reliable pickup and return for adult day programs, aligned with facility schedules, friendly curb assistance, and calm rides home after a full day of activities.",
    plate: "accent",
    image: ADULTS_DAY_CARE_FACILITIES_CARD_IMAGE,
  },
  {
    slug: SERVICE_OFFERINGS[6].slug,
    title: SERVICE_OFFERINGS[6].label,
    description:
      "Quick hops for cleanings or longer rides after oral surgery, with a softer trip home when jaws ache or dizziness lingers.",
    plate: "orange",
    image: DENTAL_APPOINTMENTS_CARD_IMAGE,
  },
];

function plateClasses(plate: Plate) {
  switch (plate) {
    case "dark":
      return {
        panel: "bg-dmz-dark text-white",
        title: "text-white",
        body: "text-white/78",
      };
    case "accent":
      return {
        panel: "bg-dmz-accent text-dmz-dark",
        title: "text-dmz-dark",
        body: "text-dmz-dark/85",
      };
    case "gray":
      return {
        panel: "bg-dmz-soft text-dmz-dark",
        title: "text-dmz-dark",
        body: "text-dmz-text",
      };
    case "white":
      return {
        panel: "bg-dmz-white text-dmz-dark",
        title: "text-dmz-dark",
        body: "text-dmz-text",
      };
    case "orange":
      return {
        panel: "bg-dmz-orange text-white",
        title: "text-white",
        body: "text-white/78",
      };
  }
}

function OfferCard({
  block,
  gridArea,
  visualOrder,
  className = "",
}: {
  block: ServiceBlock;
  gridArea: string;
  /** 1-based index following on-screen tile order (matches lg layout + stacked mobile order). */
  visualOrder: number;
  className?: string;
}) {
  const no = String(visualOrder).padStart(2, "0");
  const s = plateClasses(block.plate);
  const imagePriority = visualOrder === 1;

  return (
    <div
      id={block.slug}
      style={{ gridArea }}
      className={`scroll-mt-28 group relative flex min-h-[13rem] flex-col justify-center overflow-hidden p-8 transition-shadow duration-300 ease-out hover:shadow-[0_22px_44px_-18px_rgba(26,26,26,0.18)] sm:p-9 sm:scroll-mt-32 lg:min-h-[15.5rem] lg:p-10 lg:scroll-mt-36 ${s.panel} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <Image
          src={block.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
          priority={imagePriority}
          className="object-cover object-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:duration-200 motion-reduce:group-hover:opacity-100"
          aria-hidden
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/80 via-black/45 to-black/10 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:duration-200 motion-reduce:group-hover:opacity-100"
        aria-hidden
      />

      <span
        className="pointer-events-none absolute right-3 top-2 z-[3] font-heading text-[clamp(3.5rem,14vw,6.5rem)] leading-none text-white opacity-0 transition-opacity duration-300 ease-out select-none group-hover:opacity-[0.2] motion-reduce:opacity-[0.12] motion-reduce:transition-opacity motion-reduce:duration-200 motion-reduce:group-hover:opacity-[0.2]"
        aria-hidden
      >
        {no}
      </span>

      <h3
        className={`font-heading relative z-[4] text-lg leading-snug tracking-tight transition-colors duration-300 ease-out group-hover:text-white sm:text-xl !font-bold ${s.title}`}
      >
        {block.title}
      </h3>
      <p
        className={`relative z-[4] mt-4 max-w-prose text-sm leading-relaxed transition-colors duration-300 ease-out group-hover:text-white/85 sm:text-[0.9375rem] ${s.body}`}
      >
        {block.description}
      </p>
    </div>
  );
}

type WhatWeOfferGridProps = {
  /** Hide “View all services” when this block already lives on `/services`. */
  hideFooterServicesLink?: boolean;
};

export function WhatWeOfferGrid({ hideFooterServicesLink = false }: WhatWeOfferGridProps) {
  const [b1, b2, b3, b4, b5, b6, b7] = SERVICE_BLOCKS;

  return (
    <section
      className="relative z-10 overflow-hidden bg-gradient-to-b from-dmz-white to-dmz-soft"
      aria-labelledby="services-preview-heading"
    >
      <div
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-[min(620px,100vw)] w-[min(760px,160vw)] opacity-5 sm:h-[min(720px,88vw)] sm:w-[min(880px,144vw)] lg:h-[min(800px,80vw)] lg:w-[min(1000px,96vw)]"
        aria-hidden
      >
        <Image
          src={OFFER_PATTERN}
          alt=""
          fill
          unoptimized
          className="object-contain object-bottom object-right"
          sizes="(max-width: 1024px) 160vw, 1000px"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-20 sm:px-6 sm:pb-16 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-28">
        <div className="mt-2 w-full shadow-[0_28px_64px_-28px_rgba(26,26,26,0.35)]">
          <div className="services-preview-grid">
            <IntroPanel />
            <OfferCard block={b1} gridArea="c01" visualOrder={1} className="lg:min-h-[17rem]" />
            <OfferCard block={b3} gridArea="c03" visualOrder={2} />
            <OfferCard block={b4} gridArea="c04" visualOrder={3} />
            <OfferCard block={b2} gridArea="c02" visualOrder={4} />
            <OfferCard block={b6} gridArea="c07" visualOrder={5} className="min-h-[16rem] lg:min-h-[17rem]" />
            <OfferCard block={b5} gridArea="c05" visualOrder={6} className="lg:min-h-[17rem]" />
            <OfferCard block={b7} gridArea="c06" visualOrder={7} className="lg:min-h-[17rem]" />
          </div>
        </div>

        {!hideFooterServicesLink ? (
          <p className="mx-auto mt-12 max-w-3xl text-center text-dmz-text lg:mt-14">
            <Link
              href="/services"
              className="text-xs font-semibold uppercase tracking-[0.18em] text-dmz-dark underline decoration-dmz-border underline-offset-4 transition hover:decoration-dmz-dark"
            >
              View all services
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}

function IntroPanel() {
  return (
    <div
      style={{ gridArea: "intro" }}
      className="flex flex-col justify-center bg-dmz-white p-8 sm:p-10 lg:min-h-[min(22rem,34vh)] lg:p-12"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-dmz-text">What we offer</p>
      <h2
        id="services-preview-heading"
        className="font-heading mt-4 text-[clamp(1.65rem,3.5vw,2.35rem)] leading-[1.15] tracking-tight text-dmz-dark !font-bold"
      >
        Medical Transportation For Every Appointment
      </h2>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-dmz-text sm:text-base">
        DMZ Care coordinates dependable non-emergency transportation throughout Louisville and neighboring counties.
        Whether your trip is covered through Medicaid programs, managed-care authorizations, or booked directly as
        private pay, we obsess over departure times and curb details so your attention stays on clinicians, not
        traffic.
      </p>
    </div>
  );
}
