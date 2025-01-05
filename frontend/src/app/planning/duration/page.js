"use client";
import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Duration() {
  const [durationData, setDurationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(
    () => localStorage.getItem("selectedDuration") || null
  );

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
      } catch (error) {
        console.error("Error fetching Duration data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDurationData();
  }, []);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    localStorage.setItem("selectedDuration", option);
    console.log(`Selected: ${option}`);
  };

  console.log("durationData", durationData);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!durationData) {
    return <p>No data available</p>;
  }

  return (
    <PlanningLayout
      title="5. How Long is Your Trip?"
      currentStep={5}
      isNextDisabled={!selectedOption}
    >
      <div className="grid grid-cols-2 gap-4">
        {durationData.options?.map((option, index) => (
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
