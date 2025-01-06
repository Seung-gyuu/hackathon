"use client";

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Companion() {
  const [companionData, setCompanionData] = useState(null); // State for companion data
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedOption, setSelectedOption] = useState(null); // Selected option state
  const [title, setTitle] = useState("Loading...");

  const imgs = [
    "/img/plan/solo-removebg-preview.png",
    "/img/plan/family-removebg-preview.png",
    "/img/plan/friends-removebg-preview.png",
    "/img/plan/partner-removebg-preview.png",
  ];

  // Fetch companion data from Firestore
  useEffect(() => {
    const fetchCompanionData = async () => {
      try {
        const docRef = doc(db, "travel_question", "companion");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCompanionData(docSnap.data());
          const title = docSnap.data().question || "Default Title"; // Set the title from fetched data or use default
          setTitle(title);
        }

        // Load selected option from local storage
        if (typeof window !== "undefined") {
          const storedOption = localStorage.getItem("selectedCompanion");
          if (storedOption) setSelectedOption(storedOption);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompanionData();
  }, []);

  // Handle option selection
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCompanion", option);
    }
  };

  if (loading) {
    return <BasicLoading />;
  }

  if (!companionData) {
    return <p>No data available</p>;
  }

  return (
    <PlanningLayout
      title={`6. ${title}`}
      currentStep={6}
      isNextDisabled={!selectedOption}
    >
      {/* Option selection area */}
      <div className="grid items-center justify-between w-full grid-cols-2 gap-4 md:h-48 md:flex md:flex-row">
        {companionData.options?.map((option, index) => (
          <SelectionItem
            key={index}
            title={option}
            img={imgs[index]}
            isSelected={selectedOption === option}
            onSelect={() => handleSelectOption(option)}
          />
        ))}
      </div>
    </PlanningLayout>
  );
}