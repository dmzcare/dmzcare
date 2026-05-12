import type { CSSProperties } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";

/** Full-bleed photo (`/public`), grayscale + black gradient overlays. */
const RIDE_READY_BG = "/assisting_passengers_at_a_care_facility_entrance.webp";

const fixedCover: CSSProperties = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
};

const photoLayerStyle: CSSProperties = {
  ...fixedCover,
  backgroundImage: `url(${RIDE_READY_BG})`,
  filter: "grayscale(1) contrast(1.08)",
};

const darkOverlayStyle: CSSProperties = {
  ...fixedCover,
  backgroundImage:
    "linear-gradient(to top, rgba(0, 0, 0, 0.35), transparent 40%), linear-gradient(to bottom, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.7) 45%, rgba(0, 0, 0, 0.92) 100%)",
  backgroundAttachment: "fixed, fixed",
  backgroundSize: "cover, cover",
  backgroundPosition: "center, center",
};

type RideReadyCtaProps = {
  /** Defaults to `/booking`. Pass a hash (e.g. `#about-book-a-ride`) to scroll on the same page. */
  bookTripHref?: string;
};

export function RideReadyCta({ bookTripHref = "/booking" }: RideReadyCtaProps) {
  const isHashLink = bookTripHref.startsWith("#");
  const linkClassName =
    "font-heading inline-block text-xl tracking-tight text-dmz-dark underline decoration-dmz-dark/35 underline-offset-[0.35em] transition hover:decoration-dmz-dark sm:text-2xl";

  return (
    <section
      className="relative isolate min-h-[min(72svh,52rem)] overflow-hidden bg-dmz-dark"
      aria-labelledby="ride-ready-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0" style={photoLayerStyle} />
        <div className="absolute inset-0" style={darkOverlayStyle} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl items-center px-4 py-16 sm:px-6 md:py-20 lg:min-h-[min(72svh,52rem)] lg:px-8 lg:py-24">
        <div className="w-full max-w-3xl bg-dmz-accent p-10 shadow-[0_16px_36px_-12px_rgba(26,26,26,0.35)] sm:p-12 lg:max-w-[58%] lg:p-14 xl:p-16">
          <p className="inline-flex">
            <span className="relative inline-block rotate-[-2deg] bg-dmz-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-dmz-dark shadow-sm sm:text-sm">
              Ready To Ride?
            </span>
          </p>

          <h2
            id="ride-ready-heading"
            className="font-heading mt-8 text-[clamp(1.75rem,4.5vw,2.75rem)] leading-[1.15] tracking-tight text-dmz-dark"
          >
            Today, Book Your Journey to Care Starts Here
          </h2>

          <p className="mt-6 text-base leading-relaxed text-dmz-dark/85 sm:text-lg">
            Trust {SITE.name} for safe, compassionate non-emergency medical transportation across{" "}
            {SITE.city} and surrounding communities. Request your ride now and let our team handle
            scheduling and coordination. We&apos;re here when you need us.
          </p>

          <p className="mt-10">
            {isHashLink ? (
              <a href={bookTripHref} className={linkClassName}>
                Book Your Trip Today
              </a>
            ) : (
              <Link href={bookTripHref} className={linkClassName}>
                Book Your Trip Today
              </Link>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
