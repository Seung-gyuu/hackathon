"use client";

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Budget() {
  const [budgetData, setBudgetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  // ✅ SSR-safe localStorage 초기화
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedOption = localStorage.getItem("selectedBudget");
      if (storedOption) {
        setSelectedOption(storedOption);
      }
    }
  }, []);

  // ✅ Firestore에서 데이터 가져오기
  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const docRef = doc(db, "travel_question", "budget");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBudgetData(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching Budget data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetData();
  }, []);

  // ✅ 옵션 선택 핸들러
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedBudget", option);
    }
  };

  console.log("budgetData", budgetData);
  console.log("selectedOption", selectedOption);

  if (loading) {
    return <BasicLoading />;
  }

  if (!budgetData) {
    return <p>No data available</p>;
  }

  return (
    <PlanningLayout
      title="4. Select Your Budget Range"
      currentStep={4}
      isNextDisabled={!selectedOption}
    >
      <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
        {budgetData.options?.map((option, index) => (
          <SelectionItem
            key={index}
            title={option}
            isSelected={selectedOption === option}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>
    </PlanningLayout>
  );
}
