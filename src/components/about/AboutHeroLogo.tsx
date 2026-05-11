import Image from "next/image";
import { SITE, SITE_LOGO_ICON } from "@/lib/site";

/** About hero — square DMZ mark (`SITE_LOGO_ICON`), full color, no filters. */
export function AboutHeroLogo() {
  return (
    <div className="relative size-[4.25rem] shrink-0 sm:size-32 md:size-52 lg:size-60 xl:size-[17rem]">
      <Image
        src={SITE_LOGO_ICON.src}
        alt={`${SITE.name} logo`}
        width={SITE_LOGO_ICON.width}
        height={SITE_LOGO_ICON.height}
        unoptimized
        priority
        className="h-full w-full object-contain object-center md:object-right"
      />
    </div>
  );
}
