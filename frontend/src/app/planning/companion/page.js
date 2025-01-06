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
  const [selectedOption, setSelectedOption] = useState(
    () => localStorage.getItem("selectedCompanion") || null
  );

  const imgs = [
    "/img/plan/solo-removebg-preview.png",
    "/img/plan/family-removebg-preview.png",
    "/img/plan/friends-removebg-preview.png",
    "/img/plan/partner-removebg-preview.png",
  ];

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
        // setTimeout(() => setLoading(false), 1000);
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
            img={imgs[index]}
            isSelected={selectedOption === option ? true : false}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>
    </PlanningLayout>
  );
}
