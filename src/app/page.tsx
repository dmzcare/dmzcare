import type { Metadata } from "next";
import { AboutSummary } from "@/components/home/AboutSummary";
import { BookingSteps } from "@/components/home/BookingSteps";
import { Coverage } from "@/components/home/Coverage";
import { FaqPreview } from "@/components/home/FaqPreview";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyChoose } from "@/components/home/WhyChoose";
import { DEFAULT_OG_IMAGE, SEO_BASE_KEYWORDS, SEO_HOME_TITLE } from "@/lib/seo";

const HOME_DESCRIPTION =
  "Premium non-emergency medical transportation in Louisville, KY. Wheelchair-accessible rides, facility coordination, and compassionate drivers.";

export const metadata: Metadata = {
  title: { absolute: SEO_HOME_TITLE },
  description: HOME_DESCRIPTION,
  keywords: [
    ...SEO_BASE_KEYWORDS,
    "book medical ride Louisville",
    "wheelchair van Louisville KY",
    "clinic transportation Kentucky",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: SEO_HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    images: [
      {
        url: DEFAULT_OG_IMAGE.url,
        width: DEFAULT_OG_IMAGE.width,
        height: DEFAULT_OG_IMAGE.height,
        alt: DEFAULT_OG_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE.url, alt: DEFAULT_OG_IMAGE.alt }],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSummary />
      <ServicesPreview />
      <WhyChoose />
      <BookingSteps />
      <Coverage />
      <Testimonials />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
