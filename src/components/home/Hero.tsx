import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SITE } from "@/lib/site";

/** Large hero (right column desktop; top strip mobile) */
const HERO_MAIN = "/17306.jpg";
/** Small inset left of copy (mobile overlay + desktop left column) */
const HERO_INSET = "/full-shot-friends-taking-selfie-together-681x1024.jpg";

export function Hero() {
  return (
    <section className="relative z-10 overflow-hidden bg-dmz-dark lg:min-h-[calc(100dvh-3.5rem)]">
      {/* Mobile: full-width photo + overlapping framed inset */}
      <div className="relative z-10 w-full pb-[max(4rem,calc(520px+2.75rem-min(52vh,420px)+1.5rem))] lg:hidden">
        <div className="relative z-0 h-[min(52vh,420px)] w-full">
          <Image
            src={HERO_MAIN}
            alt="DMZ Care medical transportation"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-9 z-10 pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-4 sm:top-11">
          <div className="relative h-[520px] w-full overflow-hidden">
            <Image
              src={HERO_INSET}
              alt="Community members sharing a moment together"
              fill
              loading="lazy"
              className="object-cover object-center"
              sizes="(max-width: 1024px) 90vw, 277px"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex min-h-0 flex-col lg:grid lg:min-h-[calc(100dvh-3.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(220px,38%)] lg:items-stretch">
        <div className="flex min-h-0 flex-col justify-center px-6 py-10 pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-4 sm:py-12 lg:justify-center lg:py-16 lg:pr-5 xl:py-20 xl:pr-6">
          <div className="w-full max-w-none xl:max-w-4xl">
            <div className="flex min-w-0 items-center gap-0">
              <span className="inline-flex shrink-0 items-center border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:px-3.5 sm:py-2 sm:text-[11px] sm:tracking-[0.22em]">
                Louisville &amp; surrounding counties
              </span>
              <span className="h-px min-w-[2rem] flex-1 bg-white/18" aria-hidden />
            </div>

            <h1 className="font-heading mt-8 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-white sm:mt-10">
              Dependable Medical Transportation For Every Ride
            </h1>

            <div className="mt-3 grid gap-5 sm:mt-4 lg:grid-cols-[minmax(0,277px)_minmax(0,1fr)] lg:items-start lg:gap-10">
              <div className="relative mx-auto hidden h-[400px] w-full max-w-[277px] shrink-0 overflow-hidden lg:mx-0 lg:block lg:w-[277px] lg:max-w-none">
                <Image
                  src={HERO_INSET}
                  alt="Community members sharing a moment together"
                  fill
                  className="object-cover object-center"
                  sizes="277px"
                />
              </div>

              <div className="flex min-w-0 flex-col lg:pt-0">
                <p className="max-w-xl text-lg leading-relaxed text-white/75">
                  {SITE.name} provides courteous, on-schedule non-emergency medical transportation, so patients,
                  families, and facilities can focus on health instead of logistics.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4 sm:mt-12">
                  <ButtonLink href="/booking">Request a ride</ButtonLink>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white underline-offset-4 hover:underline"
                  >
                    Explore services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden h-full min-h-0 w-full min-w-0 lg:flex lg:min-h-[calc(100dvh-3.5rem)] lg:items-center">
          <div className="relative h-[min(62vh,600px)] w-full sm:h-[min(64vh,640px)] lg:h-[min(90vh,860px)] xl:h-[min(92vh,900px)] 2xl:h-[min(94vh,960px)]">
            <Image
              src={HERO_MAIN}
              alt="DMZ Care medical transportation"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1280px) 38vw, 480px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
