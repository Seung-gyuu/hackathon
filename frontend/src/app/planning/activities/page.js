"use client";

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import BasicLoading from "@/components/basicLoading";

export default function Activities() {
  const [activityData, setActivityData] = useState(null); // 활동 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [selectedOption, setSelectedOption] = useState(null); // 선택된 옵션 상태

  const imgs = [
    "/img/plan/activity1.png",
    "/img/plan/activity2.png",
    "/img/plan/activity3.png",
    "/img/plan/activity4.png",
  ];

  const router = useRouter();

  /**
   * Firestore에서 활동 데이터 가져오기
   */
  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const docRef = doc(db, "travel_question", "activities");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setActivityData(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching Activity data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityData();
  }, []);

  /**
   * 옵션 선택 핸들러
   */
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedActivity", option);
    }
  };

  /**
   * Firestore에 데이터 저장 및 페이지 이동
   */
  const handleSaveToFirestore = async () => {
    try {
      const userSelections = {
        travel_purpose: localStorage.getItem("selectedPurpose") || null,
        travel_style: localStorage.getItem("selectedStyle") || null,
        activities: localStorage.getItem("selectedActivity") || null,
        budget: localStorage.getItem("selectedBudget") || null,
        climate: localStorage.getItem("selectedWeather") || null,
        companion: localStorage.getItem("selectedCompanion") || null,
        travel_duration: localStorage.getItem("selectedDuration") || null,
        createdAt: new Date().toISOString(),
      };

      // null 값 제거
      const filteredSelections = Object.fromEntries(
        Object.entries(userSelections).filter(([_, value]) => value !== null)
      );

      const docRef = await addDoc(
        collection(db, "user_selections"),
        filteredSelections
      );

      console.log("Document written with ID: ", docRef.id);

      // localStorage 초기화
      [
        "selectedPurpose",
        "selectedStyle",
        "selectedActivity",
        "selectedBudget",
        "selectedWeather",
        "selectedCompanion",
        "selectedDuration",
      ].forEach((key) => localStorage.removeItem(key));

      console.log("Local storage cleared after successful save.");

      router.push(`/planResult?id=${docRef.id}`);
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
      alert("Failed to save data. Please try again.");
    }
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
  if (!activityData) {
    return <p>No data available</p>;
  }

  /**
   * 화면 렌더링
   */
  return (
    <PlanningLayout
      title="7. Select Your Activities"
      currentStep={7}
      isFinal={true}
    >
      {/* 옵션 선택 영역 */}
      <div className="grid items-center justify-between w-full grid-cols-2 gap-4 md:h-48 md:flex md:flex-row">
        {activityData?.options?.map((option, index) => (
          <SelectionItem
            key={index}
            title={option}
            img={imgs[index]}
            isSelected={selectedOption === option}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-between w-full gap-4 mt-8">
        <div className="flex items-center justify-between w-full gap-4 font-semibold">
          {/* 이전 버튼 */}
          <button
            className="px-8 py-2 border-2 rounded-full cursor-pointer text-neutralDarkLight border-neutralDarkLight hover:border-neutralDark hover:text-neutralDark"
            onClick={() => router.push("/planning/companion")}
          >
            Back
          </button>

          {/* 결과 보기 버튼 */}
          <button
            className="px-8 py-2 border-2 rounded-full cursor-pointer hover:bg-third border-third/80 bg-third/80 text-neutralLight"
            onClick={handleSaveToFirestore}
            disabled={!selectedOption}
          >
            View Results
          </button>
        </div>
      </div>
    </PlanningLayout>
  );
}
