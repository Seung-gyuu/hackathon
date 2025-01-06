export default function HomeButton() {
  return (
    <button
      onClick={() => (window.location.href = "/")}
      className="w-28 h-28 p-3 transition-transform transform hover:scale-105 bg-white rounded-lg shadow-md flex flex-col items-center justify-center gap-2"
    >
      <div className="text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </div>
      <span className="text-sm font-medium text-gray-600">HOME</span>
    </button>
  );
}
