"use client";
import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(
    () => localStorage.getItem("selectedWeather ") || null
  );

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const docRef = doc(db, "travel_question", "climate");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setWeatherData(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    localStorage.setItem("selectedWeather", option);
    console.log(`Selected: ${option}`);
  };

  console.log("weatherData", weatherData);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!weatherData) {
    return <p>No data available</p>;
  }
  return (
    <PlanningLayout
      title="3. Select Your Preferred Weather"
      currentStep={3}
      isNextDisabled={!selectedOption}
    >
      <div className="grid grid-cols-2 gap-4">
        {weatherData.options?.map((option, index) => (
          <SelectionItem
            key={index}
            title={option}
            isSelected={selectedOption === option ? true : false}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>
    </PlanningLayout>
  );
}
