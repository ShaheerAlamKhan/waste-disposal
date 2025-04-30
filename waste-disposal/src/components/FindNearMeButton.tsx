interface FindNearMeButtonProps {
  onClick: () => void;
  loading?: boolean;
}

export default function FindNearMeButton({ onClick, loading = false }: FindNearMeButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
          <span>Finding...</span>
        </div>
      ) : (
        "Find Near Me"
      )}
    </button>
  );
} 