import type { Metadata } from "next";
import Image from "next/image";

// WhatsApp uses Facebook’s crawler; PNG og:image is more reliable than WebP.
const OG_IMAGE = "/og-dmz-care-banner.png";

const SITE_DESCRIPTION =
  "Non-Emergency Medical Transportation for Residents in Louisville, KY.";

const PAGE_TITLE = `DMZCare.com — ${SITE_DESCRIPTION}`;

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: SITE_DESCRIPTION,
  keywords: [
    "DMZ Care",
    "NEMT",
    "non-emergency medical transportation",
    "Louisville",
    "Kentucky",
    "medical transportation",
    "healthcare rides",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [
      {
        url: OG_IMAGE,
        width: 1500,
        height: 1500,
        alt: "DMZ Care — non-emergency medical transportation in Louisville, Kentucky",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 font-sans">
      <main className="max-w-lg text-center">
        <p className="mb-6 text-base font-semibold uppercase tracking-[0.2em] text-zinc-400">
          LAUNCHING SOON...
        </p>
        <Image
          src="/DMZ%20Care%20Favicon.png"
          alt="DMZ Care"
          width={512}
          height={512}
          priority
          className="mx-auto mb-10 h-[min(36rem,78vh)] w-auto max-w-[min(100%,60rem)] object-contain sm:h-[min(42rem,78vh)] sm:max-w-[min(100%,72rem)]"
        />
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-400">
          Louisville, Kentucky
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50">
          Non-emergency medical transportation
        </h1>
      </main>
    </div>
  );
}
