import Image from "next/image";
import Link from "next/link";
import { cardBackgroundAt } from "@/lib/card-images";
import { SITE } from "@/lib/site";

function ArrowIcon({ className, inverse }: { className?: string; inverse?: boolean }) {
  return (
    <svg
      className={`block size-6 ${className ?? ""}`}
      viewBox="0 0 8 9"
      fill="none"
      aria-hidden
    >
      <g stroke={inverse ? "#fff" : "#000"} strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 4.5h7M3.5 1L7 4.5 3.5 8" />
      </g>
    </svg>
  );
}

type SlideVariant = "dark" | "accent" | "white";

function slideSurface(variant: SlideVariant) {
  switch (variant) {
    case "dark":
      return {
        panel: "bg-dmz-dark text-white",
        title: "text-white",
        body: "text-white/85",
        bodyHover: "group-hover:text-white/90",
        ctaWrap: "bg-dmz-white text-dmz-dark",
        ctaInverse: false as const,
      };
    case "accent":
      return {
        panel: "bg-dmz-accent text-dmz-dark",
        title: "text-dmz-dark group-hover:text-white",
        body: "text-dmz-dark/85 group-hover:text-white/85",
        bodyHover: "",
        ctaWrap: "bg-dmz-dark text-white",
        ctaInverse: true as const,
      };
    case "white":
      return {
        panel: "bg-dmz-soft text-dmz-dark",
        title: "text-dmz-dark group-hover:text-white",
        body: "text-dmz-text group-hover:text-white/85",
        bodyHover: "",
        ctaWrap: "bg-dmz-dark text-white",
        ctaInverse: true as const,
      };
  }
}

const SLIDES = [
  {
    no: "01",
    image: cardBackgroundAt(0),
    title: "Everyone Deserves Access",
    body: `At ${SITE.name}, we believe everyone deserves access to safe, reliable, and respectful transportation to healthcare appointments. Anchored in ${SITE.fullAddress}, our mission is to give our communities more than a ride, with a steady hand at the door and calm for families who are already carrying enough.`,
    variant: "dark" as const,
  },
  {
    no: "02",
    image: cardBackgroundAt(1),
    title: "Safe Travel",
    body: "Dependable vehicles, trained operators, and careful coordination so every trip to care arrives on time and under control.",
    variant: "accent" as const,
  },
  {
    no: "03",
    image: cardBackgroundAt(2),
    title: "Compassionate Care",
    body: "Respectful assistance at the curb and in the cabin, with patient-centered language, patience with mobility needs, and dignity by default.",
    variant: "white" as const,
  },
] as const;

export function GuidingPrinciplesSlider() {
  return (
    <section className="bg-dmz-white">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-dmz-text">
          What guides us
        </p>
        <h2 className="font-heading mx-auto mt-4 max-w-4xl text-center text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.12] tracking-tight text-dmz-dark">
          Compassionate Standards For Every Passenger
        </h2>
      </div>

      <div className="mt-14 overflow-x-auto pb-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:pb-24">
        <div className="mx-auto w-max px-4 pb-2 sm:px-6 lg:px-8">
          <div
            role="list"
            aria-label="What guides us"
            className="flex snap-x snap-mandatory gap-[1.31rem]"
          >
            {SLIDES.map((slide, index) => {
              const s = slideSurface(slide.variant);
              return (
                <article
                  key={slide.title}
                  role="listitem"
                  className={`group relative flex h-[37.5rem] w-[min(90vw,35.1875rem)] shrink-0 snap-start flex-col items-stretch justify-start overflow-hidden p-8 transition-shadow duration-300 ease-out hover:shadow-[0_22px_44px_-18px_rgba(26,26,26,0.18)] sm:p-10 ${s.panel}`}
                >
                  {/* Full-bleed photo: fixed crop; calm crossfade on hover (no pan / zoom) */}
                  <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
                    <Image
                      src={slide.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 90vw, 35rem"
                      priority={index === 0}
                      className="object-cover object-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:duration-200 motion-reduce:group-hover:opacity-100"
                      aria-hidden
                    />
                  </div>

                  {/* Readability wash on hover (top-weighted copy) */}
                  <div
                    className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/80 via-black/45 to-black/10 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:duration-200 motion-reduce:group-hover:opacity-100"
                    aria-hidden
                  />

                  {/* Large watermark */}
                  <span
                    className="pointer-events-none absolute right-4 top-5 z-[3] font-heading text-[clamp(3rem,11vw,5.5rem)] leading-none tracking-tight text-white opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-[0.2] sm:right-6 sm:top-6 motion-reduce:opacity-[0.12]"
                    aria-hidden
                  >
                    {slide.no}
                  </span>

                  <div className="relative z-[4] flex w-full flex-col">
                    <div className="flex min-h-[6.5rem] flex-col justify-start sm:min-h-[7.25rem]">
                      <h3
                        className={`font-heading max-w-[22ch] text-2xl leading-tight tracking-tight transition-colors duration-300 ease-out sm:text-3xl ${s.title}`}
                      >
                        {slide.title}
                      </h3>
                    </div>
                    <p
                      className={`mt-6 max-w-md pl-12 text-base leading-relaxed transition-colors duration-300 ease-out sm:pl-16 sm:text-[1.0625rem] ${s.body} ${s.bodyHover}`}
                    >
                      {slide.body}
                    </p>
                  </div>

                  <Link
                    href="/services"
                    className={`absolute bottom-8 right-8 z-[5] inline-flex h-14 w-14 items-center justify-center rounded-full transition-[colors,transform] duration-300 ease-out hover:brightness-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-10 sm:right-10 ${s.ctaWrap}`}
                    aria-label="View services"
                  >
                    <span
                      className="inline-block origin-center transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                      aria-hidden
                    >
                      <ArrowIcon inverse={s.ctaInverse} />
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
