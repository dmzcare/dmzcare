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
import { SITE } from "@/lib/site";

const DESCRIPTION =
  "Premium non-emergency medical transportation in Louisville, KY. Wheelchair-accessible rides, facility coordination, and compassionate drivers.";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} - Medical Transportation in Louisville, KY` },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} - Medical Transportation in Louisville, KY`,
    description: DESCRIPTION,
    url: "/",
    images: [
      {
        url: "https://images.unsplash.com/photo-1576769268137-b41debf75195?auto=format&fit=crop&w=1200&h=630&q=100",
        width: 1200,
        height: 630,
        alt: "Compassionate healthcare transportation support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} - Medical Transportation in Louisville, KY`,
    description: DESCRIPTION,
    images: ["https://images.unsplash.com/photo-1576769268137-b41debf75195?auto=format&fit=crop&w=1200&h=630&q=100"],
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
