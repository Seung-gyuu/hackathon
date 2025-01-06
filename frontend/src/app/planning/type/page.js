"use client";

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Type() {
  const [travelStyleData, setTravelStyleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const icons = [
    "/images/plan-2-1.png",
    "/images/plan-2-2.png",
    "/images/plan-2-3.png",
  ];

  // ✅ SSR-safe localStorage 초기화
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedOption = localStorage.getItem("selectedStyle");
      if (storedOption) {
        setSelectedOption(storedOption);
      }
    }
  }, []);

  // ✅ Firestore에서 데이터 가져오기
  useEffect(() => {
    const fetchTravelStyleData = async () => {
      try {
        const docRef = doc(db, "travel_question", "travel_style");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTravelStyleData(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching travel style data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelStyleData();
  }, []);

  // ✅ 옵션 선택 핸들러
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedStyle", option);
    }
  };

  console.log("travelStyleData", travelStyleData);
  console.log("selectedOption", selectedOption);

  if (loading) {
    return <BasicLoading />;
  }

  if (!travelStyleData) {
    return <p>No data available</p>;
  }

  return (
    <PlanningLayout
      title="2. What travel style do you prefer?"
      currentStep={2}
      isNextDisabled={!selectedOption}
    >
      <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
        {travelStyleData.options?.map((option, index) => (
          <SelectionItem
            key={index}
            title={option}
            icon={icons[index]}
            isSelected={selectedOption === option}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>
    </PlanningLayout>
  );
}
