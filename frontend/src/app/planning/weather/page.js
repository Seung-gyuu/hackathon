"use client";
import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(
    () => localStorage.getItem("selectedWeather ") || null
  );

  const icons = [
    "/img/plan/spring-removebg-preview.png",
    "/img/plan/summer-removebg-preview.png",
    "/img/plan/winter-removebg-preview.png",
  ];

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
        // setTimeout(() => setLoading(false), 1000);
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
    return <BasicLoading />;
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
      <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
        {weatherData.options?.map((option, index) => (
          <SelectionItem
            key={index}
            icon={icons[index]}
            title={option}
            isSelected={selectedOption === option ? true : false}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>
    </PlanningLayout>
  );
}
