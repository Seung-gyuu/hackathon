"use client";

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Purpose() {
  const [purposeData, setPurposeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const imgs = [
    "/images/plan-1-1.png",
    "/images/plan-1-2.png",
    "/images/plan-1-3.png",
    "/images/plan-1-4.png",
  ];

  // ✅ SSR-safe localStorage 초기화
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedOption = localStorage.getItem("selectedPurpose");
      if (storedOption) {
        setSelectedOption(storedOption);
      }
    }
  }, []);

  // ✅ Firestore에서 데이터 가져오기
  useEffect(() => {
    const fetchPurposeData = async () => {
      try {
        const docRef = doc(db, "travel_question", "travel_purpose");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPurposeData(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching purpose data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurposeData();
  }, []);

  // ✅ 옵션 선택 핸들러
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedPurpose", option);
    }
  };

  console.log("purposeData", purposeData);
  console.log("selectedOption", selectedOption);

  if (loading) {
    return <BasicLoading />;
  }

  if (!purposeData) {
    return <p>No data available</p>;
  }

  return (
    <PlanningLayout
      title="1. What is the purpose of your trip?"
      currentStep={1}
      isNextDisabled={!selectedOption}
    >
      <div className="grid items-center justify-between w-full grid-cols-2 gap-4 md:h-48 md:flex md:flex-row">
        {purposeData.options?.map((option, index) => (
          <SelectionItem
            key={index}
            title={option}
            img={imgs[index]}
            isSelected={selectedOption === option}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>
    </PlanningLayout>
  );
}
