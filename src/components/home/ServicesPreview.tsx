"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { cardBackgroundAt } from "@/lib/card-images";

function Bullet({
  children,
  variant = "light",
}: {
  children: React.ReactNode;
  variant?: "light" | "dark" | "onAccent";
}) {
  const textClass =
    variant === "dark"
      ? "text-white"
      : variant === "onAccent"
        ? "text-dmz-dark/85"
        : "text-dmz-text";
  const dotClass =
    variant === "dark" ? "bg-dmz-accent" : variant === "onAccent" ? "bg-dmz-dark" : "bg-dmz-accent";

  return (
    <li className={`flex items-start gap-2.5 text-sm leading-snug ${textClass}`}>
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotClass}`} aria-hidden />
      <span>{children}</span>
    </li>
  );
}

type Plate = "dark" | "accent" | "gray" | "white" | "orange";

type ServiceBlock = {
  title: string;
  description: string;
  bullets: [string, string, string];
  image: string;
  imageAlt: string;
  plate: Plate;
};

const CARD_IMAGE_ALT = "DMZ Care transportation and community photography";

const SERVICE_BLOCKS: ServiceBlock[] = [
  {
    title: "Doctor Visits",
    description:
      "Door-to-clinic rides that keep annual exams, specialty consults, and imaging days steady. Arrivals lined up with registration and labs.",
    bullets: ["On-time pickup", "Caring drivers", "Stress-free travel"],
    image: cardBackgroundAt(0),
    imageAlt: CARD_IMAGE_ALT,
    plate: "dark",
  },
  {
    title: "Dialysis Treatments",
    description:
      "Chair-time fidelity for dialysis and infusion: recurring routes planned so tight treatment windows stay dependable visit after visit.",
    bullets: ["Easy Schedule", "Patient assistance", "Clean vehicles"],
    image: cardBackgroundAt(1),
    imageAlt: CARD_IMAGE_ALT,
    plate: "accent",
  },
  {
    title: "Physical Therapy Sessions",
    description:
      "Timed around rehab gains, with extra patience at pickup when braces, soreness, or gait aids slow each step.",
    bullets: ["Flexible booking", "Assisted mobility", "Safe rides"],
    image: cardBackgroundAt(2),
    imageAlt: CARD_IMAGE_ALT,
    plate: "gray",
  },
  {
    title: "Hospital Outpatient Services",
    description:
      "Same-day suites handled with coordinated arrivals, then a composed ride home while discharge guidance is still top of mind.",
    bullets: ["Safe return trips", "Friendly drivers", "Comfortable"],
    image: cardBackgroundAt(3),
    imageAlt: CARD_IMAGE_ALT,
    plate: "white",
  },
  {
    title: "Behavioral & Mental Health Appointments",
    description:
      "Respectful transportation to therapy, psychiatry, IOP, and related visits. Details stay private from booking through drop-off.",
    bullets: ["Confidential scheduling", "Dignified language", "Reliable pickups"],
    image: cardBackgroundAt(4),
    imageAlt: CARD_IMAGE_ALT,
    plate: "dark",
  },
  {
    title: "Dental Appointments",
    description:
      "Quick hops for cleanings or longer rides after oral surgery, with a softer trip home when jaws ache or dizziness lingers.",
    bullets: ["Timely arrivals", "Easy scheduling", "Comfortable seating"],
    image: cardBackgroundAt(5),
    imageAlt: CARD_IMAGE_ALT,
    plate: "orange",
  },
];

/** Extra px added to sticky `top` per card index (0, 18, 36, … below header baseline). */
const DECK_STICKY_STEP_PX = 18;

/**
 * Sticky baseline below SiteHeader + `index × DECK_STICKY_STEP_PX` via `--deck-sticky-nudge`.
 */
const STICKY_TOP_STACKED =
  "top-[calc(5rem+var(--deck-sticky-nudge,0px))] sm:top-[calc(5.25rem+var(--deck-sticky-nudge,0px))] lg:top-[calc(6.5rem+var(--deck-sticky-nudge,0px))]";
/** Fixed shared plate height keeps every sticky card visually consistent. */
const CARD_HEIGHT =
  "h-[clamp(44rem,calc(100svh-5rem),52rem)] lg:h-[clamp(34rem,calc(100vh-8rem),38rem)]";
/** Slot must be at least plate height + gap so sticky cards have room to stack. */
const CARD_SLOT_MIN_HEIGHT =
  "min-h-[calc(clamp(44rem,calc(100svh-5rem),52rem)+2.5rem)] lg:min-h-[calc(clamp(34rem,calc(100vh-8rem),38rem)+2.5rem)]";
const DECK_SCALE_STEP = 0.1;

/**
 * Per-card variables:
 * - `--deck-sticky-nudge`: progressive sticky top offset (0, 18, 36, ...).
 * - `--deck-scale`: updated on scroll; each incoming card contributes one 10% shrink step.
 * - `--deck-scrim-opacity`: updated on scroll for cards that are being covered.
 */
function deckCardVars(index: number): React.CSSProperties {
  return {
    "--deck-sticky-nudge": `${index * DECK_STICKY_STEP_PX}px`,
    "--deck-scale": "1",
    "--deck-scrim-opacity": "0",
    zIndex: index + 1,
  } as React.CSSProperties;
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function plateClasses(plate: Plate) {
  switch (plate) {
    case "dark":
      return {
        panel: "bg-dmz-dark text-white",
        title: "text-white",
        body: "text-white/78",
        bullet: "dark" as const,
        listBorder: "border-white/12",
        button:
          "border-white/35 bg-transparent text-white hover:border-dmz-accent hover:bg-dmz-accent hover:text-dmz-dark",
      };
    case "accent":
      return {
        panel: "bg-dmz-accent text-dmz-dark",
        title: "text-dmz-dark",
        body: "text-dmz-dark/85",
        bullet: "onAccent" as const,
        listBorder: "border-dmz-dark/18",
        button:
          "border-dmz-dark/35 bg-transparent text-dmz-dark hover:border-dmz-dark hover:bg-dmz-dark hover:text-white",
      };
    case "gray":
      return {
        panel: "bg-dmz-soft text-dmz-dark",
        title: "text-dmz-dark",
        body: "text-dmz-text",
        bullet: "light" as const,
        listBorder: "border-dmz-dark/10",
        button:
          "border-dmz-dark/25 bg-transparent text-dmz-dark hover:border-dmz-dark hover:bg-dmz-white",
      };
    case "white":
      return {
        panel: "bg-dmz-white text-dmz-dark",
        title: "text-dmz-dark",
        body: "text-dmz-text",
        bullet: "light" as const,
        listBorder: "border-dmz-dark/10",
        button:
          "border-dmz-dark/25 bg-transparent text-dmz-dark hover:border-dmz-dark hover:bg-dmz-soft",
      };
    case "orange":
      return {
        panel: "bg-dmz-orange text-white",
        title: "text-white",
        body: "text-white/78",
        bullet: "dark" as const,
        listBorder: "border-white/12",
        button:
          "border-white/35 bg-transparent text-white hover:border-dmz-accent hover:bg-dmz-accent hover:text-dmz-dark",
      };
  }
}

function LayeredServiceCard({
  block,
  priority = false,
}: {
  block: ServiceBlock;
  priority?: boolean;
}) {
  const plateStyle = plateClasses(block.plate);

  return (
    <div className={`relative w-full ${CARD_HEIGHT}`} data-deck-plate>
      {/* Dimmed when card scrolls behind others (lg); opacity driven in globals.css */}
      <div className="deck-card-scrim pointer-events-none absolute inset-0 z-10" aria-hidden />
      <div className="relative h-full overflow-hidden">
        <div className="flex h-full flex-col lg:grid lg:grid-cols-2 lg:items-stretch">
          <div
            className={`order-1 flex flex-col justify-center px-6 py-7 sm:px-8 sm:py-8 lg:px-12 lg:py-12 xl:px-14 ${plateStyle.panel}`}
          >
            <h3 className={`font-heading text-[44px] sm:text-[48px] lg:text-[52px] font-bold leading-[1.12] tracking-tight ${plateStyle.title}`}>
              {block.title}
            </h3>
            <p className={`mt-4 text-sm leading-relaxed sm:text-base lg:mt-5 lg:text-base ${plateStyle.body}`}>
              {block.description}
            </p>
            <ul
              className={`mt-5 space-y-2 border-t pt-5 lg:mt-6 lg:space-y-3 lg:pt-6 ${plateStyle.listBorder}`}
            >
              {block.bullets.map((b) => (
                <Bullet key={b} variant={plateStyle.bullet}>
                  {b}
                </Bullet>
              ))}
            </ul>
            <div className="mt-6 lg:mt-8">
              <Link
                href="/booking"
                className={`inline-flex items-center justify-center border px-8 py-3.5 text-sm font-semibold tracking-tight transition-colors ${plateStyle.button}`}
              >
                Request this ride type
              </Link>
            </div>
          </div>

          <div className="relative order-2 min-h-0 flex-1 bg-dmz-border lg:h-full">
            <Image
              src={block.image}
              alt={block.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={priority}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesPreview() {
  const deckRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const resetCards = () => {
      for (const card of cardRefs.current) {
        if (!card) continue;
        card.style.setProperty("--deck-scale", "1");
        card.style.setProperty("--deck-scrim-opacity", "0");
      }
    };

    const updateCards = () => {
      frame = 0;

      if (reduceMotion.matches) {
        resetCards();
        return;
      }

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      const deckTop = deck.getBoundingClientRect().top;
      const incomingProgress = cards.map((card) => {
        const plate = card.querySelector<HTMLElement>("[data-deck-plate]");
        if (!plate) return 0;

        const stickyTop = Number.parseFloat(window.getComputedStyle(card).top);
        const plateHeight = plate.getBoundingClientRect().height;
        const naturalCardTop = deckTop + card.offsetTop;

        return clamp01((stickyTop + plateHeight - naturalCardTop) / plateHeight);
      });

      cards.forEach((card, index) => {
        const depth = incomingProgress.slice(index + 1).reduce((sum, progress) => sum + progress, 0);
        const maxDepth = cards.length - 1 - index;
        const scale = 1 - Math.min(depth, maxDepth) * DECK_SCALE_STEP;

        card.style.setProperty("--deck-scale", scale.toFixed(4));
        card.style.setProperty("--deck-scrim-opacity", Math.min(depth, 1).toFixed(4));
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateCards);
    };

    updateCards();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reduceMotion.addEventListener("change", requestUpdate);

    const ro = new ResizeObserver(requestUpdate);
    ro.observe(deck);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reduceMotion.removeEventListener("change", requestUpdate);
    };
  }, []);

  return (
    <section className="relative bg-dmz-soft">
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-20 text-center sm:px-6 sm:pb-8 sm:pt-24 lg:px-8 lg:pb-10 lg:pt-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-dmz-text">What we offer</p>
          <h2 className="font-heading mt-4 text-[44px] sm:text-[48px] lg:text-[52px] font-bold leading-[1.12] tracking-tight text-dmz-dark">
            Medical Transportation For Every Appointment
          </h2>
        </div>
      </div>

      <div ref={deckRef} className="deck-stack deck-stack--exit-lift relative isolate pb-2 md:pb-2 lg:pb-5">
        {SERVICE_BLOCKS.map((block, index) => (
          <div
            key={block.title}
            className={`deck-card relative px-4 sm:px-6 lg:px-8 sticky ${STICKY_TOP_STACKED} ${CARD_SLOT_MIN_HEIGHT}`}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            style={deckCardVars(index)}
          >
            <div className="mx-auto max-w-[70rem]">
              <LayeredServiceCard block={block} priority={index === 0} />
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-3 text-center sm:px-6 sm:pb-14 sm:pt-4 lg:px-8 lg:pb-16 lg:pt-5">
        <p className="mx-auto max-w-3xl text-base leading-relaxed text-dmz-text">
          DMZ Care coordinates dependable non-emergency transportation throughout Louisville and neighboring counties.
          Whether your trip is covered through Medicaid programs, managed-care authorizations, or booked directly as
          private pay, we obsess over departure times and curb details so your attention stays on clinicians, not
          traffic.
        </p>
      </div>
    </section>
  );
}
