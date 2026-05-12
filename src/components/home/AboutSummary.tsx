import Image from "next/image";
import { ABOUT_MISSION_IMAGE } from "@/lib/card-images";
import { SITE } from "@/lib/site";

/** Heroicons 24 solid Phone (MIT); reads clearly on small badge backgrounds */
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const ABOUT_PATTERN = "/Pattern%20DMZ%20Care%20Logo.webp";

export function AboutSummary() {
  return (
    <section className="relative overflow-hidden bg-dmz-white">
      <div
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-[min(310px,50vw)] w-[min(380px,80vw)] opacity-10 sm:h-[min(360px,44vw)] sm:w-[min(440px,72vw)] lg:h-[min(400px,40vw)] lg:w-[min(500px,48vw)]"
        aria-hidden
      >
        <Image
          src={ABOUT_PATTERN}
          alt=""
          fill
          unoptimized
          className="object-contain object-bottom object-right"
          sizes="(max-width: 1024px) 80vw, 500px"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:flex lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div className="relative mb-12 lg:mb-0 lg:w-7/12">
          <div className="relative aspect-[5/4] min-h-[280px] overflow-hidden ring-1 ring-dmz-border sm:min-h-[340px] lg:aspect-[6/5] lg:min-h-[min(520px,52vh)]">
            <Image
              src={ABOUT_MISSION_IMAGE}
              alt="Warm greeting outside a suburban home, reflecting approachable transportation care"
              fill
              sizes="(max-width: 1023px) 100vw, 58vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -right-2 top-8 hidden bg-dmz-accent px-4 py-3 text-sm font-semibold text-dmz-dark sm:block">
            Built around dignity &amp; punctuality
          </div>
        </div>
        <div className="lg:w-5/12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dmz-text">
            About DMZ Care
          </p>
          <h2 className="font-heading mt-4 text-[44px] sm:text-[48px] lg:text-[52px] font-bold leading-[1.12] tracking-tight text-dmz-dark">
            Respectful Transportation For Every Person
          </h2>
          <p className="mt-6 text-base leading-relaxed text-dmz-text">
            We started DMZ Care to close the gap between clinical schedules and real life, coordinating
            door-through-door assistance when needed, aligning pickups with facility protocols, and treating
            every rider with patience and clear communication so families and staff can hand off with
            confidence.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-dmz-orange text-white"
              aria-hidden
            >
              <PhoneIcon className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="font-heading text-base font-bold leading-tight text-dmz-dark sm:text-lg">
                Have Questions
              </p>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="mt-1 block text-base font-normal text-dmz-muted transition-colors hover:text-dmz-dark"
              >
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
