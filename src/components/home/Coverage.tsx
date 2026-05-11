import { SERVICE_AREAS } from "@/lib/site";

export function Coverage() {
  return (
    <section className="bg-dmz-soft">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dmz-text">
              Coverage area
            </p>
            <h2 className="font-heading mt-4 text-[52px] font-bold leading-[1.12] tracking-tight text-dmz-dark">
              Louisville-Based Transportation For The Wider Region
            </h2>
            <p className="mt-6 text-base leading-relaxed text-dmz-text">
              We regularly serve patients traveling between homes, hospitals, outpatient centers, and
              senior living communities. Expanding or complex routes may require extra lead time. Ask
              when you book.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {SERVICE_AREAS.map((a) => (
                <li
                  key={a}
                  className="border border-dmz-border bg-dmz-white px-4 py-2 text-sm font-medium text-dmz-dark"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden border border-dmz-border bg-dmz-white">
            <iframe
              title="DMZ Care service area - Louisville, Kentucky"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12523.5!2d-85.7585!3d38.2527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88690c599246899f%3A0x3f5e50bce603fa8e!2sLouisville%2C%20KY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[320px] w-full grayscale-[20%] contrast-[1.05]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
