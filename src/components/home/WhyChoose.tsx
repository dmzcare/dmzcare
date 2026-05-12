import type { CSSProperties, FC } from "react";

type Reason = {
  title: string;
  body: string;
  Icon: FC;
};

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

function IconMessages() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function IconShieldCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconCalendarClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 13.5v3m0 0l1.5-1.5M12 16.5L10.5 15" />
    </svg>
  );
}

const reasons: Reason[] = [
  {
    title: "Dispatch that listens",
    body: "Real people answer scheduling questions. No endless phone trees when timing matters.",
    Icon: IconPhone,
  },
  {
    title: "Predictable communication",
    body: "Pickup windows and driver introductions are shared so families know what to expect.",
    Icon: IconMessages,
  },
  {
    title: "Safety-first mindset",
    body: "Equipment checks, securement protocols, and calm driving habits are non-negotiable.",
    Icon: IconShieldCheck,
  },
  {
    title: "Flexible for real schedules",
    body: "We adapt when appointments run long or discharge paperwork delays exit.",
    Icon: IconCalendarClock,
  },
];

const WHY_CHOOSE_BG = "/caregiver_assisting_elderly_woman_to_vehicle.webp";

const fixedCover: CSSProperties = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
};

const photoLayerStyle: CSSProperties = {
  ...fixedCover,
  backgroundImage: `url(${WHY_CHOOSE_BG})`,
  filter: "grayscale(1) contrast(1.08)",
};

/** Black overlay so headline + cards stay readable over the photo. */
const darkOverlayStyle: CSSProperties = {
  ...fixedCover,
  backgroundImage:
    "linear-gradient(to bottom, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.68) 45%, rgba(0, 0, 0, 0.86) 100%)",
};

export function WhyChoose() {
  return (
    <section className="relative isolate overflow-hidden bg-dmz-dark">
      {/* Background stack (fixed attachment via inline styles) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0" style={photoLayerStyle} />
        <div className="absolute inset-0" style={darkOverlayStyle} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-16 lg:px-8 lg:pb-32 lg:pt-20">
        {/* Intro (narrower measure) */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dmz-accent">
            Why DMZ Care
          </p>
          <h2 className="font-heading mt-4 text-[44px] sm:text-[48px] lg:text-[52px] font-bold leading-[1.12] tracking-tight text-white">
            Thoughtful Transportation For Every Mile
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-[1.0625rem]">
            Every ride reflects our commitment to safety, communication, and professionalism, so passengers
            and families get dependable care from booking through drop-off.
          </p>
        </div>

        {/* Cards: taller; outer columns staggered up on lg; icon tucked higher */}
        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 sm:mt-12 md:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:items-start lg:gap-6">
          {reasons.map((r, i) => {
            const CardIcon = r.Icon;
            const staggerWrap =
              i === 0 || i === 3 ? "lg:-translate-y-9" : "lg:translate-y-8";
            return (
              <div key={r.title} className={`transition-transform ${staggerWrap}`}>
                <article className="relative flex min-h-[300px] flex-col justify-center bg-dmz-accent px-7 py-10 shadow-[0_16px_36px_-12px_rgba(26,26,26,0.35)] duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-14px_rgba(26,26,26,0.4)] sm:min-h-[320px] sm:px-8 lg:min-h-[360px] lg:py-12">
                  <div
                    className="pointer-events-none absolute right-4 top-3 h-9 w-9 text-dmz-dark [&>svg]:h-full [&>svg]:w-full"
                    aria-hidden
                  >
                    <CardIcon />
                  </div>
                  <div className="flex max-w-[28ch] flex-col gap-5">
                    <h3 className="font-heading pr-10 text-xl font-bold leading-snug tracking-tight text-dmz-dark">
                      {r.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-dmz-dark/85">{r.body}</p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
