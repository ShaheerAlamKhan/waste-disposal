import BrandMark from './BrandMark';

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent text-white">
                <BrandMark className="h-5 w-5" />
              </span>
              <span className="text-base font-bold tracking-tight text-[var(--foreground)]">
                Re<span className="text-brand">Circuit</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
              Recycle your electronics the right way — a simple, no-login guide to
              certified e-waste drop-off around San Diego County.
            </p>
          </div>

          <div className="text-sm">
            <p className="font-semibold text-[var(--foreground)]">Good to know</p>
            <ul className="mt-3 space-y-2 text-[var(--muted-foreground)]">
              <li>Drop-off is almost always free for residents.</li>
              <li>Hours and accepted items change — call ahead.</li>
              <li>Wipe or remove storage from your devices first.</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--muted-foreground)] sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} ReCircuit. A civic-tech project by Shaheer Alam Khan.
          </p>
          <p>
            Location data compiled from public listings. Verify details before you go.
          </p>
        </div>
      </div>
    </footer>
  );
}
