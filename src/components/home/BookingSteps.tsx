import Link from "next/link";

type Step = {
  step: string;
  title: string;
  body: string;
  panelClass: string;
  watermarkClass: string;
  headingClass: string;
  bodyClass: string;
};

const steps: Step[] = [
  {
    step: "01",
    title: "Request your ride online or by phone",
    body: "Submit your pickup, destination, and timing online or with a quick call.",
    panelClass: "bg-dmz-accent",
    watermarkClass:
      "text-transparent [-webkit-text-stroke:1.5px_rgba(26,26,26,0.14)] sm:[-webkit-text-stroke:2px_rgba(26,26,26,0.14)]",
    headingClass: "text-dmz-dark",
    bodyClass: "text-dmz-dark/85",
  },
  {
    step: "02",
    title: "We confirm your details",
    body: "Dispatch confirms addresses, entrances, and vehicle fit before ride day.",
    panelClass: "bg-dmz-soft",
    watermarkClass:
      "text-transparent [-webkit-text-stroke:1.5px_rgba(26,26,26,0.11)] sm:[-webkit-text-stroke:2px_rgba(26,26,26,0.11)]",
    headingClass: "text-dmz-dark",
    bodyClass: "text-dmz-text",
  },
  {
    step: "03",
    title: "Your driver arrives on time",
    body: "Your driver arrives in the agreed window, with updates if anything shifts.",
    panelClass: "bg-dmz-orange",
    watermarkClass:
      "text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.18)] sm:[-webkit-text-stroke:2px_rgba(255,255,255,0.18)]",
    headingClass: "text-white",
    bodyClass: "text-white/90",
  },
];

export function BookingSteps() {
  return (
    <section className="relative overflow-hidden bg-dmz-dark text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(202,244,2,0.06),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <header className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/55">
            Simple booking
          </p>
          <h2 className="font-heading mt-4 text-[52px] font-bold leading-[1.12] tracking-tight text-white">
            Book A Ride Quickly
          </h2>
        </header>

        <div className="mt-12 flex flex-col gap-6 lg:mt-16 lg:flex-row lg:items-stretch lg:gap-8">
          <div className="relative flex shrink-0 flex-col justify-center bg-dmz-white px-8 py-10 pb-14 text-dmz-dark shadow-xl lg:w-[min(100%,380px)] xl:w-[420px]">
            <div>
              <h3 className="font-heading text-xl font-bold tracking-tight text-dmz-dark sm:text-2xl">
                Scheduling a ride
              </h3>
              <p className="mt-5 text-base leading-relaxed text-dmz-text">
                With DMZ Care it is simple and fast. Just request online or by phone. We handle the rest with
                care.
              </p>
            </div>
            <Link
              href="/booking"
              className="group absolute bottom-5 right-5 z-10 inline-flex size-11 items-center justify-center bg-dmz-accent text-dmz-dark transition-colors duration-200 hover:bg-dmz-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dmz-dark sm:bottom-6 sm:right-6 sm:size-12"
              aria-label="Book a ride"
            >
              <svg
                className="size-5 transition-transform duration-200 ease-out will-change-transform group-hover:translate-x-0.5 sm:size-6 sm:group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-3">
            {steps.map((s) => (
              <article
                key={s.step}
                className={`relative flex min-h-[220px] flex-col px-6 pb-8 pt-16 sm:min-h-[240px] sm:pt-18 lg:min-h-[260px] lg:px-7 lg:pb-10 lg:pt-20 ${s.panelClass}`}
              >
                <span
                  className={`pointer-events-none absolute right-2 top-2 select-none font-heading text-[3rem] font-bold leading-none tracking-[-0.1em] tabular-nums sm:right-4 sm:top-3 sm:text-[4rem] lg:text-[4.25rem] ${s.watermarkClass}`}
                  aria-hidden
                >
                  {s.step}.
                </span>
                <h3
                  className={`font-heading relative max-w-[20ch] text-lg font-bold leading-snug ${s.headingClass}`}
                >
                  {s.title}
                </h3>
                <p className={`relative mt-4 flex-1 text-sm leading-relaxed ${s.bodyClass}`}>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
