"use client";

import { useEffect, useRef } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Initial image geometry; the image element itself expands to fullscreen. */
const START_W_VW = 78;
const START_H_SVH = 54;
const START_MARGIN_SVH = 18;
/** Bottom spacing so marginTop + height + marginBottom = 100svh at every progress (edges align together). */
const START_MARGIN_BOTTOM_SVH = 100 - START_MARGIN_SVH - START_H_SVH;
/** Larger = slower zoom through the hero scroll range. */
const HERO_SCROLL_RANGE = 1.92;
const SMOOTHING = 0.13;

export function AboutImageReveal({
  src,
  heroSectionId = "about-hero",
}: {
  src: string;
  /** Element whose scroll drives the zoom (typically the hero `<section>` above this block). */
  heroSectionId?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const applyProgress = (progress: number) => {
      const marginTop = START_MARGIN_SVH * (1 - progress);
      const marginBottom = START_MARGIN_BOTTOM_SVH * (1 - progress);
      const width = START_W_VW + (100 - START_W_VW) * progress;
      const height = START_H_SVH + (100 - START_H_SVH) * progress;

      image.style.marginTop = `${marginTop}svh`;
      image.style.marginBottom = `${marginBottom}svh`;
      image.style.marginLeft = "auto";
      image.style.marginRight = "auto";
      image.style.width = `${width}vw`;
      image.style.height = `${height}svh`;
    };

    const measureTargetProgress = () => {
      const heroEl = document.getElementById(heroSectionId);

      if (heroEl) {
        const heroH = Math.max(heroEl.offsetHeight, 1);
        const rawHero = clamp(window.scrollY / (heroH * HERO_SCROLL_RANGE), 0, 1);
        return rawHero >= 0.985 ? 1 : rawHero ** 0.92;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = Math.max(window.innerHeight, 1);
      const scrollableDistance = Math.max(section.offsetHeight - viewportHeight, 1);
      const rawProgress = clamp(-rect.top / (scrollableDistance * 0.9), 0, 1);
      return rawProgress >= 0.985 ? 1 : rawProgress ** 0.92;
    };

    const animate = () => {
      if (reducedMotion.matches) {
        currentProgressRef.current = 1;
        targetProgressRef.current = 1;
        applyProgress(1);
        raf = 0;
        return;
      }

      const current = currentProgressRef.current;
      const target = targetProgressRef.current;
      if (target === 1 && current > 0.965) {
        currentProgressRef.current = 1;
        applyProgress(1);
        raf = 0;
        return;
      }

      const next = current + (target - current) * SMOOTHING;

      currentProgressRef.current = Math.abs(target - next) < 0.001 ? target : next;
      applyProgress(currentProgressRef.current);

      if (currentProgressRef.current !== targetProgressRef.current) {
        raf = window.requestAnimationFrame(animate);
      } else {
        raf = 0;
      }
    };

    const scheduleUpdate = () => {
      targetProgressRef.current = reducedMotion.matches ? 1 : measureTargetProgress();
      if (!raf) raf = window.requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);

    currentProgressRef.current = reducedMotion.matches ? 1 : measureTargetProgress();
    targetProgressRef.current = currentProgressRef.current;
    applyProgress(currentProgressRef.current);

    requestAnimationFrame(() => {
      scheduleUpdate();
    });

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
    };
  }, [heroSectionId]);

  return (
    <section
      ref={sectionRef}
      id="about-visual"
      className="about-visual-scroll relative -mt-[28vh] h-[115vh] bg-dmz-white"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Scroll-driven geometry must target a real <img>; next/image wraps extra layout. */}
      <img
        ref={imageRef}
        src={src}
        alt="Healthcare professionals collaborating with focus and empathy"
        className="about-visual-image sticky top-0 block max-w-none object-cover"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        style={{
          marginTop: `${START_MARGIN_SVH}svh`,
          marginBottom: `${START_MARGIN_BOTTOM_SVH}svh`,
          marginLeft: "auto",
          marginRight: "auto",
          width: `${START_W_VW}vw`,
          height: `${START_H_SVH}svh`,
        }}
      />
    </section>
  );
}
