"use client";

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Purpose() {
  const [purposeData, setPurposeData] = useState(null); // 여행 목적 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [selectedOption, setSelectedOption] = useState(null); // 선택된 옵션 상태

  const imgs = [
    "/images/plan-1-1.png",
    "/images/plan-1-2.png",
    "/images/plan-1-3.png",
    "/images/plan-1-4.png",
  ];

  /**
   * Firestore에서 여행 목적 데이터 가져오기
   */
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

        // 로컬 스토리지에서 선택된 옵션 불러오기
        if (typeof window !== "undefined") {
          const storedOption = localStorage.getItem("selectedPurpose");
          if (storedOption) setSelectedOption(storedOption);
        }
      } catch (error) {
        console.error("Error fetching purpose data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurposeData();
  }, []);

  /**
   * 옵션 선택 핸들러
   */
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedPurpose", option);
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
  if (!purposeData) {
    return <p>No data available</p>;
  }

  /**
   * 화면 렌더링
   */
  return (
    <PlanningLayout
      title="1. What is the purpose of your trip?"
      currentStep={1}
      isNextDisabled={!selectedOption}
    >
      {/* 옵션 선택 영역 */}
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
