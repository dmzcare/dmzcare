import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/forms/BookingForm";
import { PageIntro } from "@/components/PageIntro";
import { pageMetadata } from "@/lib/seo";
import { SERVICE_AREAS, SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Book a Ride",
  description: `Request non-emergency medical transportation with ${SITE.name}. Submit pickup and destination, appointment time, and mobility needs. Dispatch confirms vehicle type and details before ride day.`,
  pathname: "/booking",
  keywords: [
    "book NEMT online",
    "request wheelchair ride Louisville",
    "schedule medical transportation KY",
  ],
});

export default function BookingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Booking"
        title="Tell us your pickup and destination"
        description={`Submit the basics below. Dispatch will confirm vehicle type, timing, and any companion or equipment needs before ride day. ${SITE.hours}`}
        descriptionOnAccent
      />

      <section className="mt-12 bg-dmz-white pb-20 lg:mt-16 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:gap-16 lg:px-8">
          <aside className="lg:col-span-2">
            <div className="sticky top-28 space-y-8 border border-dmz-border bg-dmz-soft p-8">
              <div>
                <h2 className="font-heading text-[24px] font-semibold text-dmz-dark">Before you submit</h2>
                <ul className="mt-4 space-y-4 text-sm leading-relaxed text-dmz-text">
                  <li>
                    <span className="font-semibold text-dmz-dark">Appointment time:</span> include buffer
                    if registration or labs run first.
                  </li>
                  <li>
                    <span className="font-semibold text-dmz-dark">Mobility:</span> chair width, weight
                    class, or transfer preferences help us assign the right crew.
                  </li>
                  <li>
                    <span className="font-semibold text-dmz-dark">Emergencies:</span> dial{" "}
                    <span className="font-semibold text-dmz-dark">911</span>. This form is not monitored
                    as an emergency line.
                  </li>
                </ul>
              </div>
              <div className="border border-dmz-border bg-dmz-white px-4 py-4 text-sm text-dmz-text">
                Prefer voice?{" "}
                <a href={`tel:${SITE.phoneTel}`} className="font-semibold text-dmz-dark underline">
                  Call {SITE.phoneDisplay}
                </a>
              </div>
              <Link
                href="/services"
                className="inline-flex text-sm font-semibold text-dmz-dark underline underline-offset-4"
              >
                Review service types
              </Link>
            </div>
          </aside>
          <div className="lg:col-span-3">
            <div className="border border-dmz-border bg-dmz-soft p-8 sm:p-10">
              <h2 className="font-heading text-[24px] font-bold text-dmz-dark">Request a ride</h2>
              <p className="mt-3 text-sm leading-relaxed text-dmz-text">
                Include pickup and destination addresses, appointment timing, and mobility notes. We will
                confirm vehicle type and crew before ride day.
              </p>
              <div className="mt-8">
                <BookingForm />
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
