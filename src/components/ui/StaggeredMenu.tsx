"use client";

import gsap from "gsap";
import Link from "next/link";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./StaggeredMenu.css";

export type StaggeredMenuHandle = {
  toggle: () => void;
  close: () => void;
};

export type StaggeredMenuItem = {
  label: string;
  href: string;
};

function isInternalPath(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

type StaggeredMenuProps = {
  items: StaggeredMenuItem[];
  socialItems?: StaggeredMenuItem[];
  /** Pre-layer stripe colors (right → left visual order) */
  colors: string[];
  position?: "right" | "left";
  externalToggleRef: React.RefObject<HTMLElement | null>;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  closeOnClickAway?: boolean;
};

const IN_X = 100;
const EASE_OUT = "power4.out";
const EASE_IN = "power3.in";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

export const StaggeredMenu = forwardRef<StaggeredMenuHandle, StaggeredMenuProps>(function StaggeredMenu(
  {
    items,
    socialItems = [],
    colors,
    position = "right",
    externalToggleRef,
    onMenuOpen,
    onMenuClose,
    displaySocials = true,
    displayItemNumbering = true,
    closeOnClickAway = true,
  },
  ref,
) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const prelayerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const openTl = useRef<gsap.core.Timeline | null>(null);
  const isOpenRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  const xPercentClosed = position === "right" ? IN_X : -IN_X;

  const setNumOpacity = useCallback((value: number, stagger = 0.06) => {
    const nums = panelRef.current?.querySelectorAll(".sm-panel-num");
    if (!nums?.length) return;
    nums.forEach((el, i) => {
      gsap.to(el, {
        opacity: value,
        duration: reducedMotion ? 0 : 0.25,
        delay: reducedMotion ? 0 : i * stagger,
        ease: "power2.out",
      });
    });
  }, [reducedMotion]);

  const killOpenTimeline = useCallback(() => {
    openTl.current?.kill();
    openTl.current = null;
  }, []);

  const resetLabelDom = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.querySelectorAll(".sm-panel-itemLabel").forEach((el) => {
      gsap.set(el, { clearProps: "all" });
      gsap.set(el, { yPercent: 140, rotate: 10, opacity: 0 });
    });
    panel.querySelectorAll(".sm-panel-num").forEach((el) => {
      gsap.set(el, { opacity: 0 });
    });
    const title = panel.querySelector(".sm-social-title");
    if (title) gsap.set(title, { opacity: 0 });
    panel.querySelectorAll(".sm-social-link").forEach((el) => {
      gsap.set(el, { y: 25, opacity: 0 });
    });
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      prelayerRefs.current.forEach((el) => {
        if (el) gsap.set(el, { xPercent: xPercentClosed });
      });
      if (panelRef.current) gsap.set(panelRef.current, { xPercent: xPercentClosed });
      resetLabelDom();
    });
    return () => ctx.revert();
  }, [xPercentClosed, resetLabelDom]);

  const playClose = useCallback(() => {
    killOpenTimeline();
    const panel = panelRef.current;
    const layers = prelayerRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!panel || layers.length === 0) {
      isOpenRef.current = false;
      setOpen(false);
      onMenuClose?.();
      return;
    }

    if (reducedMotion) {
      gsap.set([...layers, panel], { xPercent: xPercentClosed });
      panel.querySelectorAll(".sm-panel-itemLabel").forEach((el) => gsap.set(el, { clearProps: "all" }));
      setNumOpacity(0, 0);
      isOpenRef.current = false;
      setOpen(false);
      onMenuClose?.();
      return;
    }

    gsap.to([...layers, panel], {
      xPercent: xPercentClosed,
      duration: 0.32,
      ease: EASE_IN,
      stagger: 0.03,
      overwrite: true,
      onComplete: () => {
        resetLabelDom();
        isOpenRef.current = false;
        setOpen(false);
        onMenuClose?.();
      },
    });
  }, [
    killOpenTimeline,
    onMenuClose,
    prelayerRefs,
    reducedMotion,
    resetLabelDom,
    setNumOpacity,
    xPercentClosed,
  ]);

  const playOpen = useCallback(() => {
    killOpenTimeline();
    const panel = panelRef.current;
    const layers = prelayerRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!panel || layers.length === 0) return;

    isOpenRef.current = true;
    setOpen(true);
    onMenuOpen?.();

    if (reducedMotion) {
      gsap.set(layers, { xPercent: 0 });
      gsap.set(panel, { xPercent: 0 });
      panel.querySelectorAll(".sm-panel-itemLabel").forEach((el) =>
        gsap.set(el, { yPercent: 0, rotate: 0, opacity: 1 }),
      );
      setNumOpacity(1, 0);
      const st = panel.querySelector(".sm-social-title");
      if (st) gsap.set(st, { opacity: 1 });
      panel.querySelectorAll(".sm-social-link").forEach((el) => gsap.set(el, { y: 0, opacity: 1 }));
      return;
    }

    resetLabelDom();

    const labelEls = panel.querySelectorAll(".sm-panel-itemLabel");

    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
    openTl.current = tl;

    tl.to(layers, {
      xPercent: 0,
      duration: 0.48,
      stagger: 0.07,
      ease: EASE_OUT,
    })
      .to(
        panel,
        {
          xPercent: 0,
          duration: 0.62,
          ease: EASE_OUT,
        },
        "-=0.28",
      )
      .to(
        labelEls,
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.52,
          stagger: 0.09,
          ease: "power3.out",
        },
        "-=0.35",
      );

    if (displayItemNumbering) {
      tl.add(() => setNumOpacity(1, 0.06), "<+=0.05");
    }

    if (displaySocials && socialItems.length > 0) {
      const socialTitle = panel.querySelector(".sm-social-title");
      const socialLinks = panel.querySelectorAll(".sm-social-link");
      if (socialTitle && socialLinks.length) {
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.28, ease: "power2.out" },
          "-=0.2",
        ).to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.07,
            ease: "power2.out",
          },
          "-=0.15",
        );
      }
    }
  }, [
    displayItemNumbering,
    displaySocials,
    killOpenTimeline,
    onMenuOpen,
    reducedMotion,
    resetLabelDom,
    setNumOpacity,
    socialItems.length,
  ]);

  useImperativeHandle(
    ref,
    () => ({
      toggle: () => {
        if (isOpenRef.current) playClose();
        else playOpen();
      },
      close: () => {
        if (isOpenRef.current) playClose();
      },
    }),
    [playClose, playOpen],
  );

  useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      if (externalToggleRef.current?.contains(t)) return;
      playClose();
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [closeOnClickAway, externalToggleRef, open, playClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") playClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, playClose]);

  const processedColors =
    colors.length >= 3 ? Array.from(new Set(colors)) : colors;

  return (
    <div
      id="staggered-mobile-nav"
      data-side={position}
      className="staggered-menu-root pointer-events-none fixed inset-0 z-[45] overflow-hidden lg:hidden"
      aria-hidden={!open}
    >
      <div className="sm-prelayers" aria-hidden>
        {processedColors.map((color, i) => (
          <div
            key={`${color}-${i}`}
            ref={(el) => {
              prelayerRefs.current[i] = el;
            }}
            className="sm-prelayer"
            style={{ backgroundColor: color, zIndex: i }}
          />
        ))}
      </div>

      <div
        ref={panelRef}
        id="staggered-menu-panel"
        className="staggered-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="sm-panel-inner">
          <nav aria-label="Primary">
            {items.map((item, i) => {
              const num = String(i + 1).padStart(2, "0");
              const content = (
                <>
                  {displayItemNumbering && (
                    <span className="sm-panel-num" aria-hidden>
                      {num}
                    </span>
                  )}
                  <span className="sm-panel-itemLabel">{item.label}</span>
                </>
              );
              const internal = isInternalPath(item.href);
              return (
                <div key={`${item.href}-${item.label}`} className="sm-panel-item">
                  {internal ? (
                    <Link href={item.href} className="sm-panel-link" onClick={() => playClose()}>
                      {content}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="sm-panel-link"
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      onClick={() => playClose()}
                    >
                      {content}
                    </a>
                  )}
                </div>
              );
            })}
          </nav>

          {displaySocials && socialItems.length > 0 && (
            <div className="sm-panel-connect">
              <p className="sm-social-title">Connect</p>
              <div className="sm-social-row">
                {socialItems.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    className="sm-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClose()}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
