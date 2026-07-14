interface Benefit {
  title: string;
  body: string;
  icon: React.ReactNode;
}

const benefits: Benefit[] = [
  {
    title: 'Keeps toxins out of the ground',
    body: 'Old electronics leak lead, mercury, and cadmium into soil and groundwater when they hit a landfill. Certified recyclers contain and neutralize them.',
    icon: (
      <path d="M12 3.5 5 6.5v4.7c0 4.3 2.9 8.3 7 9.3 4.1-1 7-5 7-9.3V6.5l-7-3ZM9.5 12l1.8 1.8L15 10" />
    ),
  },
  {
    title: 'Recovers real materials',
    body: 'A ton of circuit boards holds more gold than a ton of ore. Recycling reclaims copper, aluminium, and rare earths instead of mining them again.',
    icon: (
      <path d="M12 3 4 8v8l8 5 8-5V8l-8-5Zm0 0v18M4 8l8 5 8-5" />
    ),
  },
  {
    title: 'Protects your data',
    body: 'Drives and phones carry personal data long after you stop using them. Certified sites wipe and shred storage so nothing walks out the door.',
    icon: (
      <path d="M12 3.5 5 6.5v4.7c0 4.3 2.9 8.3 7 9.3 4.1-1 7-5 7-9.3V6.5l-7-3ZM12 9v3m0 3h.01" />
    ),
  },
  {
    title: "It's the law in California",
    body: 'California bans e-waste from the trash. Dropping it at a certified site keeps you compliant — and it is almost always free.',
    icon: (
      <path d="M12 3v3m0 0-6 3m6-3 6 3M4 9l2 6h-4l2-6Zm14 0 2 6h-4l2-6ZM8 21h8m-4 0V9" />
    ),
  },
];

export default function EWasteIntro() {
  return (
    <section id="learn" className="scroll-mt-20 border-t border-[var(--border)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Why it matters
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            E-waste is the fastest-growing waste stream on earth
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--muted-foreground)]">
            Phones, laptops, cables, and chargers pile up faster than any other kind of
            trash — and barely a fifth is recycled properly. Dropping yours at a certified
            site is a five-minute habit with an outsized payoff.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lg hover:shadow-emerald-900/5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {b.icon}
                </svg>
              </span>
              <h3 className="mt-4 text-base font-semibold text-[var(--foreground)]">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
