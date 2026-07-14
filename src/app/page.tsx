'use client';

import { useMemo, useState } from 'react';
import UseMyLocationButton from '../components/FindNearMeButton';
import LocationList from '../components/LocationList';
import StatsStrip from '../components/StatsStrip';
import EWasteIntro from '../components/EWasteIntro';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { locations } from '../data/locations';
import { calculateDistance } from '../utils/distance';

interface Coords {
  latitude: number;
  longitude: number;
}

/**
 * Light stemmer so singular/plural queries match either way
 * (e.g. "battery" matches "Batteries", "computers" matches "Computers").
 */
function stem(word: string): string {
  return word.replace(/ies$/, 'y').replace(/e?s$/, '');
}

function matchesQuery(haystack: string, query: string): boolean {
  if (haystack.includes(query)) return true;
  const queryStem = stem(query);
  return haystack
    .split(/[^a-z0-9]+/)
    .some((word) => stem(word).startsWith(queryStem));
}

function geolocationErrorMessage(err: unknown): string {
  if (
    typeof GeolocationPositionError !== 'undefined' &&
    err instanceof GeolocationPositionError
  ) {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        return 'Location access was denied. You can still browse and search every site below.';
      case err.POSITION_UNAVAILABLE:
        return 'Your location could not be determined right now. Try again, or browse the list below.';
      case err.TIMEOUT:
        return 'Finding your location took too long. Try again, or browse the list below.';
    }
  }
  return err instanceof Error
    ? err.message
    : 'Something went wrong while finding your location.';
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [userLocation, setUserLocation] = useState<Coords | null>(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const handleUseMyLocation = async () => {
    setLocating(true);
    setGeoError(null);

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser.');
      }

      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        },
      );

      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (err) {
      setGeoError(geolocationErrorMessage(err));
    } finally {
      setLocating(false);
    }
  };

  const handleClearLocation = () => {
    setUserLocation(null);
    setGeoError(null);
  };

  const visibleLocations = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = locations.map((location) => ({
      ...location,
      distance: userLocation
        ? calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            location.latitude,
            location.longitude,
          )
        : undefined,
    }));

    if (q) {
      list = list.filter((location) =>
        matchesQuery(
          [
            location.name,
            location.address,
            location.city,
            location.zip,
            ...location.acceptedWaste,
          ]
            .join(' ')
            .toLowerCase(),
          q,
        ),
      );
    }

    list.sort((a, b) =>
      a.distance !== undefined && b.distance !== undefined
        ? a.distance - b.distance
        : a.name.localeCompare(b.name),
    );

    return list;
  }, [query, userLocation]);

  return (
    <div id="top" className="min-h-screen flex flex-col bg-background">
      <a
        href="#locations"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to locations
      </a>

      <SiteHeader />

      <main className="flex-grow">
        {/* Hero + search */}
        <section className="relative overflow-hidden border-b border-border-token">
          <div className="hero-aura absolute inset-0" aria-hidden="true" />
          <div className="bg-dotgrid absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-3xl px-4 pb-12 pt-14 text-center sm:px-6 sm:pt-20">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Recycle your electronics the right way in San Diego.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[color:var(--muted-foreground)] sm:text-lg">
              ReCircuit is a curated list of e-waste drop-off sites around San
              Diego County. Search by device or neighborhood, or sort by
              distance from where you are.
            </p>

            <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-grow">
                <label htmlFor="location-search" className="sr-only">
                  Search locations by name, city, or device type
                </label>
                <svg
                  className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[color:var(--muted-foreground)]"
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
                <input
                  id="location-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, city, or device…"
                  className="w-full rounded-xl border border-border-token bg-surface py-3 pl-11 pr-4 text-foreground shadow-sm transition-colors placeholder:text-[color:var(--muted-foreground)] focus:border-brand focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]"
                />
              </div>
              <UseMyLocationButton
                onClick={handleUseMyLocation}
                loading={locating}
              />
            </div>

            {geoError && (
              <p
                role="alert"
                className="mx-auto mt-4 max-w-xl rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm text-amber-900 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-200"
              >
                {geoError}
              </p>
            )}

            {userLocation && !geoError && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-soft)] px-4 py-1.5 text-sm font-medium text-brand-strong">
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
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Sorted by distance from you
                <button
                  onClick={handleClearLocation}
                  className="ml-1 rounded-full font-semibold underline underline-offset-2 hover:opacity-80"
                >
                  Reset
                </button>
              </p>
            )}
          </div>
        </section>

        {/* Location list */}
        <section
          id="locations"
          className="mx-auto max-w-3xl scroll-mt-20 px-4 py-10 sm:px-6"
          aria-label="E-waste drop-off locations"
        >
          <LocationList
            locations={visibleLocations}
            query={query.trim()}
            onClearSearch={() => setQuery('')}
          />
        </section>

        <EWasteIntro />

        <StatsStrip />
      </main>

      <SiteFooter />
    </div>
  );
}
