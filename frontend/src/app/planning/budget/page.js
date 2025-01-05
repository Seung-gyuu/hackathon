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
  const [selectedOption, setSelectedOption] = useState(
    () => localStorage.getItem("selectedBudget") || null
  );

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
        // setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchBudgetData();
  }, []);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    localStorage.setItem("selectedBudget", option);
    console.log(`Selected: ${option}`);
  };

  console.log("budgetData", budgetData);

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
            isSelected={selectedOption === option ? true : false}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>
    </PlanningLayout>
  );
}
