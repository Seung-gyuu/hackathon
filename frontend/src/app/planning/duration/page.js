"use client";
import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Duration() {
  const [durationData, setDurationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(
    () => localStorage.getItem("selectedDuration") || null
  );

  const icons = [
    "/img/plan/short-removebg-preview.png",
    "/img/plan/medium-removebg-preview.png",
    "/img/plan/long-removebg-preview.png",
  ];

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
        // setTimeout(() => setLoading(false), 1000);
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
    return <BasicLoading />;
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
      <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
        {durationData.options?.map((option, index) => (
          <SelectionItem
            key={index}
            title={option}
            icon={icons[index]}
            isSelected={selectedOption === option ? true : false}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>
    </PlanningLayout>
  );
}
