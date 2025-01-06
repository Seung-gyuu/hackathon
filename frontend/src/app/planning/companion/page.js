"use client";

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Companion() {
  const [companionData, setCompanionData] = useState(null); // 동반자 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [selectedOption, setSelectedOption] = useState(null); // 선택된 옵션 상태

  const imgs = [
    "/img/plan/solo-removebg-preview.png",
    "/img/plan/family-removebg-preview.png",
    "/img/plan/friends-removebg-preview.png",
    "/img/plan/partner-removebg-preview.png",
  ];

  /**
   * Firestore에서 동반자 데이터 가져오기
   */
  useEffect(() => {
    const fetchCompanionData = async () => {
      try {
        const docRef = doc(db, "travel_question", "companion");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCompanionData(docSnap.data());
        } else {
          console.error("No such document!");
        }

        // 로컬 스토리지에서 선택된 옵션 불러오기
        if (typeof window !== "undefined") {
          const storedOption = localStorage.getItem("selectedCompanion");
          if (storedOption) setSelectedOption(storedOption);
        }
      } catch (error) {
        console.error("Error fetching Companion data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanionData();
  }, []);


  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCompanion", option);
    }
    console.log(`Selected: ${option}`);
  };


  if (loading) {
    return <BasicLoading />;
  }

 
  if (!companionData) {
    return <p>No data available</p>;
  }


  return (
    <PlanningLayout
      title="6. Who Are You Traveling With?"
      currentStep={6}
      isNextDisabled={!selectedOption}
    >
      {/* 옵션 선택 영역 */}
      <div className="grid items-center justify-between w-full grid-cols-2 gap-4 md:h-48 md:flex md:flex-row">
        {companionData.options?.map((option, index) => (
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
