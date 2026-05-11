import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SERVICE_OFFERINGS, SITE, SITE_LOGO } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";

function QuickLinkArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
      className="h-5 w-5 shrink-0 translate-x-0 translate-y-0 text-white/55 transition-[color,transform] duration-300 ease-out will-change-transform motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-dmz-accent"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.5 13.5L19 6M19 6H12.5M19 6v6.5" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-dmz-dark text-dmz-soft">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-4 [&>div]:min-w-0">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src={SITE_LOGO.src}
                alt={`${SITE.name} - home`}
                width={SITE_LOGO.width}
                height={SITE_LOGO.height}
                unoptimized
                className="h-10 w-auto max-w-[min(100%,14rem)] object-contain object-left sm:h-11"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{SITE.tagline}</p>
            <ButtonLink
              href="/booking"
              variant="primary"
              className="mt-6"
            >
              Schedule transportation
            </ButtonLink>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </p>
            <ul className="mt-4 space-y-2">
              {SERVICE_OFFERINGS.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services#${item.slug}`}
                    className="text-sm text-white/75 transition-colors hover:text-dmz-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:pl-8 lg:pl-12 xl:pl-14">
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Quick links
            </p>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.filter((l) => l.href !== "/booking").map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 leading-snug font-sans text-[0.9375rem] font-medium text-white/85 transition-colors hover:text-dmz-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dmz-accent"
                  >
                    <QuickLinkArrow />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>
                <a href={`tel:${SITE.phoneTel}`} className="hover:text-dmz-accent">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-dmz-accent">
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.fullAddress}</li>
              <li className="text-white/60">{SITE.hours}</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.social.instagram}
                className="border border-white/20 p-2 text-white transition-colors hover:border-dmz-accent hover:text-dmz-accent"
                aria-label="Instagram (@dmzcare)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </a>
              <a
                href={SITE.social.facebook}
                className="border border-white/20 p-2 text-white transition-colors hover:border-dmz-accent hover:text-dmz-accent"
                aria-label="Facebook (@dmzcare)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M22 12a10 10 0 1 0-11.5 9.9v-7H7.9V12h2.6V9.8c0-2.6 1.6-4 3.9-4 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"
                  />
                </svg>
              </a>
              <a
                href={SITE.social.linkedin}
                className="border border-white/20 p-2 text-white transition-colors hover:border-dmz-accent hover:text-dmz-accent"
                aria-label="LinkedIn (@dmzcare)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6.94 6.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-1.75 3.5h3.5V20h-3.5V10zm6.5 0h3.35v1.36h.05c.47-.9 1.6-1.85 3.3-1.85 3.53 0 4.18 2.32 4.18 5.34V20h-3.5v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V20h-3.5V10z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8">
          <div className="grid grid-cols-1 gap-6 text-xs sm:grid-cols-3 sm:items-center sm:gap-x-10 sm:gap-y-0">
            <p className="text-white/50 sm:text-left">
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
            <p className="text-center text-white/50">
              Non-emergency medical transportation. For emergencies, dial{" "}
              <span className="text-white/70">911</span>.
            </p>
            <p className="text-white/40 sm:text-right">
              Design & Dev By:{" "}
              <a
                href="https://expresscreo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-white/55 underline-offset-2 transition-colors hover:text-dmz-accent hover:underline"
              >
                Express
                <strong className="font-bold text-white/70 transition-colors group-hover:text-dmz-accent">
                  Creo
                </strong>
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
