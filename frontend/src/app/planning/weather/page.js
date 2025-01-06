"use client";

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null); // State for weather data
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedOption, setSelectedOption] = useState(null); // State for selected option
  const [title, setTitle] = useState("Loading..."); // State to store the page title

  const icons = [
    "/img/plan/spring-removebg-preview.png",
    "/img/plan/summer-removebg-preview.png",
    "/img/plan/winter-removebg-preview.png",
  ];

  /**
   * Fetch weather data from Firestore
   */
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const docRef = doc(db, "travel_question", "climate");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setWeatherData(docSnap.data());
          const title = docSnap.data().question || "Default Title"; // Set the title from fetched data or use default
          setTitle(title);
        } 

        // Retrieve selected option from localStorage
        if (typeof window !== "undefined") {
          const storedOption = localStorage.getItem("selectedWeather");
          if (storedOption) setSelectedOption(storedOption);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  /**
   * Option select handler
   */
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedWeather", option);
    }
  };

  /**
   * Loading state
   */
  if (loading) {
    return <BasicLoading />;
  }

  /**
   * If no data is available
   */
  if (!weatherData) {
    return <p>No data available</p>;
  }

  /**
   * Render the page
   */
  return (
    <PlanningLayout
      title={`3. ${title}`}
      currentStep={3}
      isNextDisabled={!selectedOption}
    >
      <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
        {weatherData.options?.map((option, index) => (
          <SelectionItem
            key={index}
            icon={icons[index]}
            title={option}
            isSelected={selectedOption === option}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>
    </PlanningLayout>
  );
}
