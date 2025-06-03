interface FindNearMeButtonProps {
  onClick: () => void;
  loading?: boolean;
}

export default function FindNearMeButton({ onClick, loading = false }: FindNearMeButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      aria-label="Find nearby e-waste disposal locations"
      className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-6 px-12 rounded-2xl text-xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation border border-emerald-500"
    >
      {loading ? (
        <div className="flex items-center justify-center gap-4">
          <div className="animate-spin h-6 w-6 border-t-2 border-b-2 border-white rounded-full"></div>
          <span className="tracking-wide">Locating Facilities...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="tracking-wide">Find Disposal Centers</span>
        </div>
      )}
    </button>
  );
} 