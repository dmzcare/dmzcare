export function PageIntro({
  eyebrow,
  title,
  description,
  dark = false,
  descriptionOnAccent = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
  /** Full intro (eyebrow, title, description) on neon accent background */
  descriptionOnAccent?: boolean;
}) {
  const splitAccent = Boolean(descriptionOnAccent && description);

  const eyebrowClass = splitAccent
    ? "text-dmz-dark/65"
    : dark
      ? "text-white/50"
      : "text-dmz-text";

  const titleBlock = (
    <>
      {eyebrow ? (
        <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${eyebrowClass}`}>
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={`font-heading mt-4 max-w-4xl text-[52px] font-bold leading-[1.12] tracking-tight ${splitAccent ? "text-dmz-dark" : ""}`}
      >
        {title}
      </h1>
    </>
  );

  const descriptionEl = description ? (
    <p
      className={`max-w-2xl text-lg leading-relaxed ${
        splitAccent
          ? "mt-6 text-dmz-dark"
          : dark
            ? "mt-6 text-white/75"
            : "mt-6 text-dmz-text"
      }`}
    >
      {description}
    </p>
  ) : null;

  if (splitAccent) {
    return (
      <section className="bg-dmz-accent text-dmz-dark">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          {titleBlock}
          {descriptionEl}
        </div>
      </section>
    );
  }

  return (
    <section className={dark ? "bg-dmz-dark text-white" : "bg-dmz-soft"}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {titleBlock}
        {descriptionEl}
      </div>
    </section>
  );
}
