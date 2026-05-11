const quotes = [
  {
    quote:
      "Mom’s dialysis schedule finally feels manageable. Drivers show up when they say they will, and they treat her like family, not a number.",
    name: "Rachel M.",
    role: "Family caregiver · Louisville",
  },
  {
    quote:
      "Discharge planning is chaotic enough. DMZ Care picks up on time, communicates with our bay desk, and reduces readmission stress for patients.",
    name: "Marcus T.",
    role: "Care coordinator · Jefferson County",
  },
  {
    quote:
      "I use a power chair and need a lift. Every ride has felt respectful and safe, with no rushing and no awkward lifting.",
    name: "Denise L.",
    role: "Patient · Oldham County",
  },
];

export function Testimonials() {
  return (
    <section className="bg-dmz-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dmz-text">
            Voices from our community
          </p>
          <h2 className="font-heading mt-4 text-[52px] font-bold leading-[1.12] tracking-tight text-dmz-dark">
            Trusted Transportation For Families And Care Teams
          </h2>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {quotes.map((q) => (
            <blockquote
              key={q.name}
              className="flex flex-col border border-dmz-border bg-dmz-soft/50 p-8"
            >
              <p className="flex-1 text-sm leading-relaxed text-dmz-dark">&ldquo;{q.quote}&rdquo;</p>
              <footer className="mt-8 border-t border-dmz-border pt-6">
                <cite className="font-heading not-italic text-base font-semibold text-dmz-dark">
                  {q.name}
                </cite>
                <p className="mt-1 text-xs text-dmz-text">{q.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
