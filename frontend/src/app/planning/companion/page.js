"use client";
import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Companion() {
  const [companionData, setCompanionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(
    () => localStorage.getItem("selectedCompanion") || null
  );

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
  }, []);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    localStorage.setItem("selectedCompanion", option);
    console.log(`Selected: ${option}`);
  };

  console.log("companionData", companionData);

  if (loading) {
    return <p>Loading...</p>;
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
      <div className="grid grid-cols-2 gap-4">
        {companionData.options?.map((option, index) => (
          <SelectionItem
            key={index}
            title={option}
            isSelected={selectedOption === option ? true : false}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>
    </PlanningLayout>
  );
}
