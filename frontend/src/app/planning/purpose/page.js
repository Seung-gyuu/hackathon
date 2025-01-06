"use client";

import PlanningLayout from "@/components/PlanningLayout";
import SelectionItem from "@/components/SelectionItem";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BasicLoading from "@/components/basicLoading";

export default function Purpose() {
  const [purposeData, setPurposeData] = useState(null); // State for travel purpose data
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedOption, setSelectedOption] = useState(null); // State for selected option
  const [title, setTitle] = useState("Loading..."); // State to store the page title

  const imgs = [
    "/images/plan-1-1.png",
    "/images/plan-1-2.png",
    "/images/plan-1-3.png",
    "/images/plan-1-4.png",
  ];

  /**
   * Fetch travel purpose data from Firestore
   */
  useEffect(() => {
    const fetchPurposeData = async () => {
      try {
        const docRef = doc(db, "travel_question", "travel_purpose");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPurposeData(docSnap.data());
          const title = docSnap.data().question || "Default Title"; // Set the title from fetched data or use default
          setTitle(title);
        } 

        // Retrieve selected option from localStorage
        if (typeof window !== "undefined") {
          const storedOption = localStorage.getItem("selectedPurpose");
          if (storedOption) setSelectedOption(storedOption);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPurposeData();
  }, []);

  /**
   * Option select handler
   */
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedPurpose", option);
    }
  };

  /**
   * Loading state
   */
  if (loading) {
    return <BasicLoading />;
  }

  /**
   * If no data is available
   */
  if (!purposeData) {
    return <p>No data available</p>;
  }

  /**
   * Render the page
   */
  return (
    <PlanningLayout
      title={`1. ${title}`}
      currentStep={1}
      isNextDisabled={!selectedOption}
    >
      {/* Option selection area */}
      <div className="grid items-center justify-between w-full grid-cols-2 gap-4 md:h-48 md:flex md:flex-row">
        {purposeData.options?.map((option, index) => (
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
