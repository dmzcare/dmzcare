"use client";

import { useEffect, useRef } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const START_SCALE = 0.86;
const HERO_SCROLL_RANGE = 1.92;
const SMOOTHING = 0.13;

/**
 * Scroll-zoom image below About hero.
 * Keeps the full photo visible (no crop) while scaling from 86% -> 100%.
 */
export function AboutImageReveal({
  src,
  heroSectionId = "about-hero",
  alt = "Healthcare professionals collaborating with focus and empathy",
}: {
  src: string;
  heroSectionId?: string;
  alt?: string;
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
      const scale = START_SCALE + (1 - START_SCALE) * progress;
      image.style.transform = `scale(${scale})`;
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
      className="relative z-0 -mt-[18vh] h-[115vh] bg-dmz-white"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- Scroll animation targets a raw img transform. */}
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className="about-visual-image block h-auto max-h-svh w-auto max-w-full object-contain"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
