"use client";

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null); // 날씨 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [selectedOption, setSelectedOption] = useState(null); // 선택된 옵션 상태

  const icons = [
    "/img/plan/spring-removebg-preview.png",
    "/img/plan/summer-removebg-preview.png",
    "/img/plan/winter-removebg-preview.png",
  ];

  /**
   * Firestore에서 날씨 데이터 가져오기
   */
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

        // 로컬 스토리지에서 선택된 옵션 불러오기
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
   * 옵션 선택 핸들러
   */
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedWeather", option);
    }
    console.log(`Selected: ${option}`);
  };

  /**
   * 로딩 상태
   */
  if (loading) {
    return <BasicLoading />;
  }

  /**
   * 데이터가 없을 경우
   */
  if (!weatherData) {
    return <p>No data available</p>;
  }

  /**
   * 화면 렌더링
   */
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
            isSelected={selectedOption === option}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>
    </PlanningLayout>
  );
}
