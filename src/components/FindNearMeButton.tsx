interface UseMyLocationButtonProps {
  onClick: () => void;
  loading?: boolean;
}

export default function UseMyLocationButton({
  onClick,
  loading = false,
}: UseMyLocationButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-brand to-accent px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-900/20 ring-1 ring-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-900/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? (
        <>
          <span
            className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
            aria-hidden="true"
          />
          <span>Locating…</span>
        </>
      ) : (
        <>
          <svg
            className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
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
          <span className="whitespace-nowrap">Use my location</span>
        </>
      )}
    </button>
  );
}
