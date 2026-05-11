import type { MetadataRoute } from "next";
import { SITE, SITE_LOGO_ICON } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.tagline,
    start_url: "/",
    display: "browser",
    orientation: "natural",
    lang: "en-US",
    categories: ["medical", "transportation", "health"],
    theme_color: "#1a1a1a",
    background_color: "#ffffff",
    icons: [
      {
        src: SITE_LOGO_ICON.src,
        type: "image/webp",
        sizes: `${SITE_LOGO_ICON.width}x${SITE_LOGO_ICON.height}`,
        purpose: "any",
      },
    ],
  };
}
