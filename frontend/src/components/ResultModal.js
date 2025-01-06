export default function ResultModal({ isOpen, onClose, result, type }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full overflow-y-auto max-h-[80vh]">
        <h2 className="mb-4 text-xl font-bold">{result.name}</h2>

        <p>
          <strong>Duration:</strong> {result.duration}
        </p>

        {Object.entries(result.itinerary).map(([day, activities]) => (
          <div key={day} className="mb-4">
            <h3 className="font-semibold">{day.toUpperCase()}</h3>
            <p>🌅 {activities.morning}</p>
            <p>🍽️ {activities.lunch}</p>
            <p>🏞️ {activities.afternoon}</p>
            <p>🌃 {activities.evening}</p>
          </div>
        ))}

        <button
          onClick={onClose}
          className="w-full py-2 mt-4 text-white rounded-md bg-primary"
        >
          Close
        </button>
      </div>
    </div>
  );
}
