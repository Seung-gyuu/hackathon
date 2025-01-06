import React from "react";

export default function DestinationCard({
  name,
  duration,
  itinerary,
  activities,
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-12rem)] p-4 border-2 shadow-md cursor-pointer rounded-xl">
      <div className="w-full h-full max-w-xl p-6 mb-6 overflow-y-auto ">
        <h1 className="mb-8 text-3xl font-bold text-center text-primary">
          🌍 Your AI Travel Recommendations
        </h1>
        <h2 className="mb-2 text-2xl font-bold text-primary">{name}</h2>
        <h3 className="mb-4 text-lg font-semibold text-gray-700">
          📅 Duration: {duration}
        </h3>

        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold">🗓️ Itinerary</h3>
          {itinerary &&
            Object.entries(itinerary).map(([day, activities]) => (
              <div key={day} className="mb-4">
                <h3 className="font-semibold">{day.toUpperCase()}</h3>
                <p>🌅 {activities.morning}</p>
                <p>🍽️ {activities.lunch}</p>
                <p>🏞️ {activities.afternoon}</p>
                <p>🌃 {activities.evening}</p>
              </div>
            ))}
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">🎯 Activities</h3>
          <ul className="space-y-1 text-gray-700">
            {activities.map((activity, index) => (
              <li key={index}>- {activity}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
