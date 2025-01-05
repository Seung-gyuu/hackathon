"use client";
import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Purpose() {
  const [purposeData, setPurposeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(
    () => localStorage.getItem("selectedPurpose") || null
  );

  const imgs = [
    "/images/plan-1-1.png",
    "/images/plan-1-2.png",
    "/images/plan-1-3.png",
    "/images/plan-1-4.png",
  ];

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
      } catch (error) {
        console.error("Error fetching purpose data:", error);
      } finally {
        setLoading(false);
        // setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchPurposeData();
  }, []);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    localStorage.setItem("selectedPurpose", option);
    // console.log(`Selected: ${option}`);
  };

  console.log("purposeData", purposeData);
  console.log("selectedOption", selectedOption);

  if (loading) {
    return <BasicLoading />;
  }

  if (!purposeData) {
    return <p>No data available</p>;
  }
  return (
    // <div className="flex items-center justify-center h-screen">
    <PlanningLayout
      title="1. What is the purpose of your trip?"
      currentStep={1}
      isNextDisabled={!selectedOption}
    >
      <div className="grid items-center justify-between w-full grid-cols-2 gap-4 md:h-48 md:flex md:flex-row">
        {purposeData.options?.map((option, index) => (
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
    // </div>
  );
}
