import type { Metadata, Viewport } from "next";
import { Sansation } from "next/font/google";
import "./globals.css";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteUrl, SEO_BASE_KEYWORDS, siteVerification } from "@/lib/seo";
import { SITE, SITE_LOGO_ICON } from "@/lib/site";

const siteUrl = getSiteUrl();

/** Google Fonts: Sansation — https://fonts.google.com/specimen/Sansation */
const sansation = Sansation({
  variable: "--font-sansation",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} | Non-Emergency Medical Transportation in Louisville, KY`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.tagline,
  applicationName: SITE.name,
  keywords: [...SEO_BASE_KEYWORDS],
  authors: [{ name: SITE.name, url: siteUrl }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: siteVerification(),
  icons: {
    icon: [{ url: SITE_LOGO_ICON.src, type: "image/webp" }],
    apple: [{ url: SITE_LOGO_ICON.src, type: "image/webp" }],
  },
  appleWebApp: {
    capable: true,
    title: SITE.name,
    statusBarStyle: "black-translucent",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE.name,
    title: `${SITE.name} | Non-Emergency Medical Transportation in Louisville, KY`,
    description: SITE.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Louisville, KY NEMT`,
    description: SITE.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sansation.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="text-dmz-foreground flex min-h-full flex-col bg-dmz-white">
        <SiteJsonLd />
        <a
          href="#main-content"
          className="focus:bg-dmz-accent focus:text-dmz-dark sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:px-4 focus:py-2"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <div id="main-content" className="flex flex-1 flex-col">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
