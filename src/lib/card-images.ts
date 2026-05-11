/**
 * Full-bleed hover backgrounds for service cards and the About “What guides us” slider.
 * Files live in `/public`; indices rotate when there are more slots than assets.
 */
export const CARD_BACKGROUND_IMAGES = [
  "/17306.jpg",
  "/1675.jpg",
  "/55888-1024x574.jpg",
  "/full-shot-friends-taking-selfie-together-681x1024.jpg",
] as const;

export function cardBackgroundAt(index: number): string {
  return CARD_BACKGROUND_IMAGES[index % CARD_BACKGROUND_IMAGES.length]!;
}

/** Services page hero full-bleed background (`/services`). */
export const SERVICES_HERO_IMAGE = "/55888-1024x574.jpg";

/** About page “Our Mission” column image (`/about`). */
export const ABOUT_MISSION_IMAGE =
  "/full-shot-friends-taking-selfie-together-681x1024.jpg";
