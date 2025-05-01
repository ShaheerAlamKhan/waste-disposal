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
      className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-4 sm:py-5 px-8 sm:px-10 rounded-full text-lg sm:text-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
    >
      {loading ? (
        <div className="flex items-center justify-center gap-3">
          <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
          <span>Finding...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Find Near Me</span>
        </div>
      )}
    </button>
  );
} 