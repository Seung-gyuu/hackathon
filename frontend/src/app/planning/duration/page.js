"use client";

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Duration() {
  const [durationData, setDurationData] = useState(null); // 여행 기간 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [selectedOption, setSelectedOption] = useState(null); // 선택된 옵션 상태

  const icons = [
    "/img/plan/short-removebg-preview.png",
    "/img/plan/medium-removebg-preview.png",
    "/img/plan/long-removebg-preview.png",
  ];

  /**
   * Firestore에서 여행 기간 데이터 가져오기
   */
  useEffect(() => {
    const fetchDurationData = async () => {
      try {
        const docRef = doc(db, "travel_question", "travel_duration");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDurationData(docSnap.data());
        } else {
          console.error("No such document!");
        }

        // 로컬 스토리지에서 선택된 옵션 불러오기
        if (typeof window !== "undefined") {
          const storedOption = localStorage.getItem("selectedDuration");
          if (storedOption) setSelectedOption(storedOption);
        }
      } catch (error) {
        console.error("Error fetching Duration data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDurationData();
  }, []);

  /**
   * 옵션 선택 핸들러
   */
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedDuration", option);
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
  if (!durationData) {
    return <p>No data available</p>;
  }

  /**
   * 화면 렌더링
   */
  return (
    <PlanningLayout
      title="5. How Long is Your Trip?"
      currentStep={5}
      isNextDisabled={!selectedOption}
    >
      {/* 옵션 선택 영역 */}
      <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
        {durationData.options?.map((option, index) => (
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
