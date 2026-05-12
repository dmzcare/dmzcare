import type { Metadata } from "next";
import { SERVICES_HERO_IMAGE } from "@/lib/card-images";
import { SITE } from "@/lib/site";

/** Resolved site origin for canonical URLs, OG/Twitter, JSON-LD, and sitemap. */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

/** Optional Search Console verification (public meta tags). */
export function siteVerification(): Metadata["verification"] | undefined {
  const google =
    process.env.GOOGLE_SITE_VERIFICATION || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing = process.env.BING_SITE_VERIFICATION;
  if (!google && !bing) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}

/**
 * Default social preview image: matches homepage hero (`/public/hero 2.webp`).
 */
export const DEFAULT_OG_IMAGE = {
  url: "/hero%202.webp",
  width: 1442,
  height: 1091,
  alt: "Non-emergency medical transportation vehicle and care-focused service in Louisville, Kentucky",
} as const;

/** Open Graph / Twitter image for `/services` (matches {@link SERVICES_HERO_IMAGE}). */
export const SERVICES_PAGE_OG_IMAGE = {
  url: SERVICES_HERO_IMAGE,
  width: 1448,
  height: 1086,
  alt: "Non-emergency medical transportation vehicle and care-focused service in Louisville, Kentucky",
} as const;

/** About page: scroll hero still from `/public` for a distinct preview when shared. */
export const ABOUT_OG_IMAGE = {
  url: "/17306.jpg",
  width: 2000,
  height: 1121,
  alt: "Inclusive community mobility and caring transportation support",
} as const;

export const SEO_BASE_KEYWORDS = [
  SITE.name,
  "non-emergency medical transportation",
  "NEMT",
  "NEMT Louisville",
  "medical transportation Louisville KY",
  "wheelchair accessible transportation Kentucky",
  "ambulatory medical rides",
  "dialysis transportation",
  "senior medical rides",
  "hospital discharge transportation",
  "Medicaid transportation Kentucky",
  "Jefferson County NEMT",
  "Oldham County medical transport",
  "Bullitt County wheelchair van",
] as const;

export type PageSeoInput = {
  /** Segment title (root layout applies `%s | ${SITE.name}`). */
  title: string;
  description: string;
  /** Path including leading slash, e.g. `/about` */
  pathname: string;
  /** Extra phrases beyond {@link SEO_BASE_KEYWORDS}. */
  keywords?: string[];
  /** Open Graph / Twitter image; defaults to {@link DEFAULT_OG_IMAGE}. */
  ogImage?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

/** Full page-level metadata: canonical, keywords, Open Graph, Twitter Card. */
export function pageMetadata(input: PageSeoInput): Metadata {
  const { title, description, pathname, keywords = [], ogImage = DEFAULT_OG_IMAGE } = input;
  const ogTitle = `${title} | ${SITE.name}`;

  return {
    title,
    description,
    keywords: [...SEO_BASE_KEYWORDS, ...keywords],
    alternates: { canonical: pathname },
    openGraph: {
      title: ogTitle,
      description,
      url: pathname,
      type: "website",
      images: [
        {
          url: ogImage.url,
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [{ url: ogImage.url, alt: ogImage.alt }],
    },
  };
}
