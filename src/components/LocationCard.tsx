import { useState } from 'react';
import { EWasteLocation } from '../data/locations';
import ImpactCalculator from './ImpactCalculator';

interface LocationCardProps {
  location: EWasteLocation & { distance?: number };
}

const VISIBLE_CHIPS = 4;

export default function LocationCard({ location }: LocationCardProps) {
  const [showAllChips, setShowAllChips] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showImpactCalculator, setShowImpactCalculator] = useState(false);

  const fullAddress = `${location.address}, ${location.city}, ${location.state} ${location.zip}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.name}, ${fullAddress}`,
  )}`;

  const chips = showAllChips
    ? location.acceptedWaste
    : location.acceptedWaste.slice(0, VISIBLE_CHIPS);
  const hiddenChipCount = location.acceptedWaste.length - VISIBLE_CHIPS;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${location.name}\n${fullAddress}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — silently ignore.
    }
  };

  const secondaryAction =
    'inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-border-token px-4 py-2 text-sm font-semibold text-[color:var(--muted-foreground)] transition-colors hover:border-brand hover:text-brand';
  const ghostAction =
    'inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-muted';

  return (
    <article className="rounded-2xl border border-border-token bg-surface p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-snug text-foreground">
          {location.name}
        </h3>
        {location.distance !== undefined && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-sm font-semibold text-brand-strong">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {location.distance.toFixed(1)} mi
          </span>
        )}
      </div>

      <div className="mt-2 space-y-1.5 text-sm text-[color:var(--muted-foreground)]">
        <p className="flex items-start gap-2">
          <svg
            className="mt-0.5 h-4 w-4 shrink-0 opacity-70"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {fullAddress}
        </p>
        {location.hours && (
          <p className="flex items-start gap-2">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 opacity-70"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {location.hours}
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {chips.map((type) => (
          <span
            key={type}
            className="rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-xs font-medium text-brand-strong"
          >
            {type}
          </span>
        ))}
        {hiddenChipCount > 0 && (
          <button
            onClick={() => setShowAllChips(!showAllChips)}
            className="rounded-full px-3 py-1 text-xs font-medium text-[color:var(--muted-foreground)] ring-1 ring-inset ring-[color:var(--border)] transition-colors hover:bg-surface-muted hover:text-foreground"
            aria-expanded={showAllChips}
          >
            {showAllChips ? 'Show less' : `+${hiddenChipCount} more`}
          </button>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border-token pt-4">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 dark:text-emerald-950"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          Directions
        </a>

        {location.phone && (
          <a
            href={`tel:${location.phone.replace(/[^0-9+]/g, '')}`}
            className={secondaryAction}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {location.phone}
          </a>
        )}

        {location.website && (
          <a
            href={location.website}
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryAction}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Website
          </a>
        )}

        <button
          onClick={copyAddress}
          className={`${ghostAction} text-[color:var(--muted-foreground)] hover:text-foreground`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <span aria-live="polite">{copied ? 'Copied!' : 'Copy address'}</span>
        </button>

        <button
          onClick={() => setShowImpactCalculator(true)}
          className={`${ghostAction} text-brand hover:text-brand-strong`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Estimate impact
        </button>
      </div>

      {showImpactCalculator && (
        <ImpactCalculator onClose={() => setShowImpactCalculator(false)} />
      )}
    </article>
  );
}
