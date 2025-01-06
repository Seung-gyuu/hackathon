"use client"; // 클라이언트 컴포넌트임을 명시

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import BasicLoading from "@/components/basicLoading";

export default function Activities() {
  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const savedActivity = typeof window !== "undefined" 
      ? localStorage.getItem("selectedActivity") 
      : null;
    setSelectedOption(savedActivity);
  }, []);

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

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedActivity", option);
    }
  };

  const handleSaveToFirestore = async () => {
    try {
      const userSelections = {
        travel_purpose: typeof window !== "undefined" ? localStorage.getItem("selectedPurpose") : null,
        travel_style: typeof window !== "undefined" ? localStorage.getItem("selectedStyle") : null,
        activities: typeof window !== "undefined" ? localStorage.getItem("selectedActivity") : null,
        budget: typeof window !== "undefined" ? localStorage.getItem("selectedBudget") : null,
        climate: typeof window !== "undefined" ? localStorage.getItem("selectedWeather") : null,
        companion: typeof window !== "undefined" ? localStorage.getItem("selectedCompanion") : null,
        travel_duration: typeof window !== "undefined" ? localStorage.getItem("selectedDuration") : null,
        createdAt: new Date().toISOString(),
      };

      const filteredSelections = Object.fromEntries(
        Object.entries(userSelections).filter(([_, value]) => value !== null)
      );

      const docRef = await addDoc(
        collection(db, "user_selections"),
        filteredSelections
      );

      console.log("Document written with ID: ", docRef.id);

      if (typeof window !== "undefined") {
        [
          "selectedPurpose",
          "selectedStyle",
          "selectedActivity",
          "selectedBudget",
          "selectedWeather",
          "selectedCompanion",
          "selectedDuration",
        ].forEach((key) => localStorage.removeItem(key));
      }

      console.log("Local storage cleared after successful save.");

      router.push(`/planResult?id=${docRef.id}`);
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  if (loading) {
    return <BasicLoading />;
  }

  if (!activityData) {
    return <p>No data available</p>;
  }

  return (
    <PlanningLayout
      title="Select Your Activities"
      currentStep={7}
      isFinal={true}
    >
      <div className="grid items-center justify-between w-full grid-cols-2 gap-4 md:h-48 md:flex md:flex-row">
        {activityData?.options?.map((option, index) => (
          <SelectionItem
            key={index}
            title={option}
            isSelected={selectedOption === option}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>

      <div className="flex justify-between w-full gap-4 mt-8">
        <div className="flex items-center justify-between w-full gap-4 font-semibold">
          <button
            className="px-8 py-2 border-2 rounded-full cursor-pointer text-neutralDarkLight border-neutralDarkLight hover:border-neutralDark hover:text-neutralDark"
            onClick={() => router.push("/planning/companion")}
          >
            Back
          </button>

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
