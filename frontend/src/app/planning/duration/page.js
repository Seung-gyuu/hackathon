"use client";

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Duration() {
  const [durationData, setDurationData] = useState(null); // State for duration data
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedOption, setSelectedOption] = useState(null); // Selected option state
  const [title, setTitle] = useState("Loading..."); // Page title state

  const icons = [
    "/img/plan/short-removebg-preview.png",
    "/img/plan/medium-removebg-preview.png",
    "/img/plan/long-removebg-preview.png",
  ];

  // Fetch duration data from Firestore
  useEffect(() => {
    const fetchDurationData = async () => {
      try {
        const docRef = doc(db, "travel_question", "travel_duration");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDurationData(docSnap.data());
          const title = docSnap.data().question || "Default Title"; // Set title from data or use default
          setTitle(title);
        }

        // Load selected option from local storage
        if (typeof window !== "undefined") {
          const storedOption = localStorage.getItem("selectedDuration");
          if (storedOption) setSelectedOption(storedOption);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDurationData();
  }, []);

  // Handle option selection
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedDuration", option);
    }
  };

  if (loading) {
    return <BasicLoading />;
  }

  if (!durationData) {
    return <p>No data available</p>;
  }

  // Render the page
  return (
    <PlanningLayout
      title={`5. ${title}`}
      currentStep={5}
      isNextDisabled={!selectedOption}
    >
      {/* Option selection area */}
      <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
        {durationData.options?.map((option, index) => (
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
