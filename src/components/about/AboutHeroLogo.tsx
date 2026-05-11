import type { CSSProperties } from "react";
import { SITE, SITE_LOGO } from "@/lib/site";

type AboutHeroLogoProps = {
  photoSrc: string;
};

/**
 * Photo fills the DMZ wordmark via CSS mask (logo alpha), with grayscale + layered overlays.
 */
export function AboutHeroLogo({ photoSrc }: AboutHeroLogoProps) {
  const maskValue = `url("${SITE_LOGO.src}")`;

  return (
    <div
      className="relative size-[4.25rem] overflow-hidden sm:size-32 md:size-52 lg:size-60 xl:size-[17rem]"
      role="img"
      aria-label={`${SITE.name} logo`}
    >
      <div
        aria-hidden
        className="absolute inset-0 grayscale contrast-[1.08] brightness-[0.97]"
        style={
          {
            backgroundImage: `url(${photoSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitMaskImage: maskValue,
            maskImage: maskValue,
            WebkitMaskSize: "auto 100%",
            maskSize: "auto 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "left center",
            maskPosition: "left center",
          } satisfies CSSProperties
        }
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/50 via-dmz-dark/15 to-black/55 mix-blend-multiply"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(202,244,2,0.12)_0%,transparent_45%,rgba(0,0,0,0.25)_100%)]"
      />
    </div>
  );
}
