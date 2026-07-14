import { EWasteLocation } from '../data/locations';
import LocationCard from './LocationCard';

interface LocationListProps {
  locations: (EWasteLocation & { distance?: number })[];
  query: string;
  onClearSearch: () => void;
}

export default function LocationList({
  locations,
  query,
  onClearSearch,
}: LocationListProps) {
  if (locations.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border-token bg-surface px-6 py-14 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface-muted">
          <svg
            className="h-7 w-7 text-[color:var(--muted-foreground)]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-semibold text-foreground">
          No matches{query ? ` for “${query}”` : ''}
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-[color:var(--muted-foreground)]">
          Try a broader term like “TV”, “battery”, or a city name — or clear
          the search to see every drop-off site.
        </p>
        <button
          onClick={onClearSearch}
          className="mt-6 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 dark:text-emerald-950"
        >
          Clear search
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Drop-off locations
        </h2>
        <p
          className="text-sm text-[color:var(--muted-foreground)]"
          aria-live="polite"
        >
          {locations.length} site{locations.length !== 1 ? 's' : ''}
          {query ? ` matching “${query}”` : ''}
        </p>
      </div>

      <ul className="space-y-4">
        {locations.map((location, index) => (
          <li
            key={location.id}
            className="animate-fade-in"
            style={{ animationDelay: `${Math.min(index, 6) * 0.06}s` }}
          >
            <LocationCard location={location} />
          </li>
        ))}
      </ul>
    </div>
  );
}
