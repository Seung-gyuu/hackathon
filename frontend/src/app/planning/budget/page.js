"use client";

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Budget() {
  const [budgetData, setBudgetData] = useState(null); // State to hold budget data
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedOption, setSelectedOption] = useState(null); // State for selected option
  const [title, setTitle] = useState("Loading...");

  const icons = [
    "/img/plan/money1-removebg-preview.png",
    "/img/plan/money2-removebg-preview.png",
    "/img/plan/money3-removebg-preview.png",
  ];

  // Fetch budget data from Firestore
  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const docRef = doc(db, "travel_question", "budget");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBudgetData(docSnap.data());
          const title = docSnap.data().question || "Default Title"; // Set the title from fetched data or use default
          setTitle(title);
        }

        // Load selected option from local storage
        if (typeof window !== "undefined") {
          const storedOption = localStorage.getItem("selectedBudget");
          if (storedOption) setSelectedOption(storedOption);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetData();
  }, []);

  // Handler for selecting an option
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedBudget", option);
    }
  };

  // Show loading spinner
  if (loading) {
    return <BasicLoading />;
  }

  // Show message if no data is available
  if (!budgetData) {
    return <p>No data available</p>;
  }

  // Render the page
  return (
    <PlanningLayout
      title={`4. ${title}`}
      currentStep={4}
      isNextDisabled={!selectedOption}
    >
      {/* Options selection area */}
      <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
        {budgetData.options?.map((option, index) => (
          <SelectionItem
            key={index}
            title={option}
            icon={icons[index]}
            isSelected={selectedOption === option}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>
    </PlanningLayout>
  );
}
