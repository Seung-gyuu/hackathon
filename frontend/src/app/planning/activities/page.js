"use client";
import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Activities() {
  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(
    () => localStorage.getItem("selectedActivity") || null
  );

  const router = useRouter();

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
    localStorage.setItem("selectedActivity", option);
    console.log(`Selected: ${option}`);
  };

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

      const filteredSelections = Object.fromEntries(
        Object.entries(userSelections).filter(([_, value]) => value !== null)
      );

      const docRef = await addDoc(
        collection(db, "user_selections"),
        filteredSelections
      );
      console.log("Document written with ID: ", docRef.id);

      Object.keys(userSelections).forEach((key) =>
        localStorage.removeItem(key)
      );

      const router = useRouter();
      router.push("/result");
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!activityData) {
    return <p>No data available</p>;
  }

  return (
    <PlanningLayout
      title="7. Select Your Activities"
      currentStep={7}
      isFinal={true}
      onResults={handleSaveToFirestore}
      isNextDisabled={!selectedOption}
    >
      <div className="grid grid-cols-2 gap-4">
        {activityData.options?.map((option, index) => (
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
