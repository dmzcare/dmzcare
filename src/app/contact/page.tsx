import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageIntro } from "@/components/PageIntro";
import { pageMetadata } from "@/lib/seo";
import { SERVICE_AREAS, SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Reach ${SITE.name} by phone or email for NEMT scheduling, coverage questions, and ride coordination. Serving Louisville, KY, Jefferson County, and nearby counties.`,
  pathname: "/contact",
  keywords: [
    "DMZ Care phone number",
    "schedule NEMT Louisville",
    "medical transport contact Kentucky",
  ],
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Plan your next ride with us"
        description={`Call for urgent scheduling questions, or send a message; we reply during posted hours. ${SITE.hours}`}
        descriptionOnAccent
      />

      <section className="mt-12 bg-dmz-white pb-20 lg:mt-16 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:items-stretch lg:gap-16 lg:px-8">
          <div className="flex flex-col lg:col-span-2 lg:min-h-0 lg:h-full">
            <div className="sticky top-28 flex min-h-0 flex-col space-y-8 border border-dmz-border bg-dmz-soft p-8 lg:h-full">
              <div>
                <h2 className="font-heading text-[24px] font-semibold text-dmz-dark">Phone</h2>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="mt-2 inline-flex text-2xl font-bold tracking-tight text-dmz-dark underline-offset-4 hover:underline"
                >
                  {SITE.phoneDisplay}
                </a>
                <p className="mt-3 text-sm text-dmz-text">Click-to-call friendly on mobile devices.</p>
              </div>
              <div>
                <h2 className="font-heading text-[24px] font-semibold text-dmz-dark">Email</h2>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-2 inline-flex font-semibold text-dmz-dark underline-offset-4 hover:underline"
                >
                  {SITE.email}
                </a>
              </div>
              <div>
                <h2 className="font-heading text-[24px] font-semibold text-dmz-dark">Office</h2>
                <p className="mt-2 text-sm leading-relaxed text-dmz-text">{SITE.fullAddress}</p>
              </div>
              <div className="overflow-hidden border border-dmz-border">
                <iframe
                  suppressHydrationWarning
                  title="Louisville, Kentucky map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12523.5!2d-85.7585!3d38.2527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88690c599246899f%3A0x3f5e50bce603fa8e!2sLouisville%2C%20KY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:col-span-3 lg:min-h-0 lg:h-full">
            <div className="flex flex-col border border-dmz-border bg-dmz-soft p-8 sm:p-10 lg:h-full lg:min-h-0">
              <h2 className="font-heading text-[24px] font-bold text-dmz-dark">Send a message</h2>
              <p className="mt-3 text-sm leading-relaxed text-dmz-text">
                Include appointment timing, addresses, and mobility notes. We will respond with next
                steps.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-7xl border-t border-dmz-border px-4 pt-16 sm:px-6 lg:mt-24 lg:px-8 lg:pt-20">
          <h3 className="font-heading text-lg font-semibold text-dmz-dark">Service area</h3>
          <p className="mt-2 text-sm leading-relaxed text-dmz-text">
            Counties and regions we regularly serve:
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SERVICE_AREAS.map((area) => (
              <li
                key={area}
                className="border border-dmz-border bg-dmz-soft px-4 py-2 text-sm font-medium text-dmz-dark"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
