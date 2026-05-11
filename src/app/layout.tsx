import type { Metadata } from "next";
import { Sansation } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE } from "@/lib/site";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

/** Google Fonts: Sansation — https://fonts.google.com/specimen/Sansation */
const sansation = Sansation({
  variable: "--font-sansation",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} - Medical Transportation in Louisville, KY`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.tagline,
  keywords: [
    "DMZ Care",
    "NEMT",
    "non-emergency medical transportation",
    "Louisville",
    "Kentucky",
    "wheelchair transportation",
    "medical rides",
    "senior transportation",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
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
