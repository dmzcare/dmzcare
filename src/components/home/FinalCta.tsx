import { SITE } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-dmz-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(202,244,2,0.12)_0%,transparent_45%,rgba(26,26,26,0.04)_100%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="bg-dmz-dark px-8 py-14 text-center sm:px-14">
          <h2 className="font-heading text-[52px] font-bold leading-[1.12] tracking-tight text-white">
            Schedule Your Next Ride When You Are Ready
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75">
            Share your itinerary and mobility needs. Our team will confirm timing, vehicle type, and
            any special instructions before pickup day.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href="/booking">Start booking</ButtonLink>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center justify-center border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-dmz-accent hover:text-dmz-accent"
            >
              Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
