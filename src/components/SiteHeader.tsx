"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { NAV_LINKS, SITE, SITE_LOGO } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  StaggeredMenu,
  type StaggeredMenuHandle,
  type StaggeredMenuItem,
} from "@/components/ui/StaggeredMenu";

/** Desktop center nav omits FAQs & Book a ride (CTA covers booking). */
const DESKTOP_NAV_LINKS = NAV_LINKS.filter(
  (link) => link.href !== "/faqs" && link.href !== "/booking",
);

export function SiteHeader() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const staggeredMenuRef = useRef<StaggeredMenuHandle>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  const staggeredMenuItems = useMemo((): StaggeredMenuItem[] => {
    const links = NAV_LINKS.map((l) => ({ label: l.label, href: l.href }));
    return [
      ...links,
      { label: `Call ${SITE.phoneDisplay}`, href: `tel:${SITE.phoneTel}` },
    ];
  }, []);

  const staggeredSocialItems = useMemo((): StaggeredMenuItem[] => {
    return [
      { label: "Instagram", href: SITE.social.instagram },
      { label: "Facebook", href: SITE.social.facebook },
      { label: "LinkedIn", href: SITE.social.linkedin },
    ];
  }, []);

  const updateIndicator = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const link = linkRefs.current.get(pathname);
    if (!link) {
      setIndicator(null);
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setIndicator({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    });
  }, [pathname]);

  useLayoutEffect(() => {
    updateIndicator();
    const nav = navRef.current;
    if (!nav) return;

    const ro = new ResizeObserver(() => updateIndicator());
    ro.observe(nav);
    window.addEventListener("resize", updateIndicator);

    let cancelled = false;
    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        if (!cancelled) updateIndicator();
      });
    }

    return () => {
      cancelled = true;
      ro.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const mq = window.matchMedia("(max-width: 1023px)");
    if (!mq.matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  return (
    <header
      className={`sticky top-0 z-50 overflow-visible border-b border-white/10 transition-[background-color] duration-300 ease-out motion-reduce:transition-none ${
        scrolled ? "bg-dmz-dark/72 backdrop-blur-xl" : "bg-dmz-dark"
      }`}
    >
      {drawerOpen ? (
        <div
          className="pointer-events-auto fixed inset-0 z-[44] bg-dmz-dark/50 lg:hidden"
          aria-hidden
          onClick={() => staggeredMenuRef.current?.close()}
        />
      ) : null}

      <div className="flex w-full items-stretch justify-between gap-4 px-5 sm:px-8 lg:px-12 xl:px-16">
        <Link
          href="/"
          className="flex shrink-0 items-center py-3 lg:py-4"
        >
          <Image
            src={SITE_LOGO.src}
            alt={`${SITE.name} - home`}
            width={SITE_LOGO.width}
            height={SITE_LOGO.height}
            unoptimized
            className="h-9 w-auto max-h-10 object-contain object-left sm:h-10 sm:max-h-11"
            priority
          />
        </Link>

        <nav
          ref={navRef}
          className="relative hidden items-stretch gap-8 overflow-visible lg:flex xl:gap-12"
          aria-label="Main"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-[-3px] left-0 z-[55] h-1 bg-dmz-accent transition-[left,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{
              left: indicator?.left ?? 0,
              width: indicator?.width ?? 0,
              opacity: indicator && indicator.width > 0 ? 1 : 0,
            }}
          />
          {DESKTOP_NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => {
                  if (el) linkRefs.current.set(link.href, el);
                  else linkRefs.current.delete(link.href);
                }}
                className={`relative z-10 flex items-center px-1 py-4 text-xs font-semibold uppercase tracking-[0.22em] transition-colors ${
                  active ? "text-dmz-accent" : "text-white/65 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 py-3 sm:gap-3 lg:py-4">
          <a
            href={`tel:${SITE.phoneTel}`}
            className="hidden text-sm font-semibold leading-none text-white underline-offset-4 hover:text-dmz-accent hover:underline sm:inline sm:max-lg:py-0.5"
          >
            {SITE.phoneDisplay}
          </a>
          <ButtonLink
            href="/booking"
            className="hidden !h-9 !min-h-0 !py-0 !px-3 !text-xs leading-none sm:inline-flex sm:!h-10 lg:!h-auto lg:!min-h-0 lg:!px-6 lg:!py-3 lg:!text-sm lg:!leading-normal"
          >
            Book a ride
          </ButtonLink>

          <button
            ref={menuToggleRef}
            id="nav-menu-toggle"
            type="button"
            className={`relative z-[60] inline-flex size-9 shrink-0 items-center justify-center border p-0 sm:size-10 lg:hidden ${
              drawerOpen
                ? "border-dmz-dark/20 bg-white text-dmz-dark hover:bg-white"
                : "border-white/25 text-white hover:bg-white/10"
            }`}
            aria-expanded={drawerOpen}
            aria-controls="staggered-menu-panel"
            onClick={() => staggeredMenuRef.current?.toggle()}
          >
            <span className="sr-only">{drawerOpen ? "Close menu" : "Open menu"}</span>
            {drawerOpen ? (
              <svg className="size-[18px] sm:size-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M6.4 19L5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.6 12 19 17.6 17.6 19 12 13.4 6.4 19z"
                />
              </svg>
            ) : (
              <svg className="size-[18px] sm:size-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <StaggeredMenu
        ref={staggeredMenuRef}
        externalToggleRef={menuToggleRef}
        position="right"
        items={staggeredMenuItems}
        socialItems={staggeredSocialItems}
        displaySocials
        displayItemNumbering
        colors={["#caf402", "#1a1a1a"]}
        onMenuOpen={() => setDrawerOpen(true)}
        onMenuClose={() => setDrawerOpen(false)}
      />
    </header>
  );
}
