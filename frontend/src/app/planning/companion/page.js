"use client";

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Companion() {
  const [companionData, setCompanionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

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
      } catch (error) {
        console.error("Error fetching Companion data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanionData();

    // localStorage 값 읽기
    if (typeof window !== "undefined") {
      const storedOption = localStorage.getItem("selectedCompanion");
      setSelectedOption(storedOption || null);
    }
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
      <div className="grid items-center justify-between w-full grid-cols-2 gap-4 md:h-48 md:flex md:flex-row">
        {companionData.options?.map((option, index) => (
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
